"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PERSONAS } from "@/lib/ask-personas";
import { KrishnaPortrait } from "./Portraits";
import ApiKeyModal from "./ApiKeyModal";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const MODELS = [
  { id: "anthropic/claude-haiku-4.5", label: "Claude Haiku 4.5", subtitle: "fast, cheap, good" },
  { id: "anthropic/claude-sonnet-4", label: "Claude Sonnet 4", subtitle: "best for nuance" },
  { id: "openai/gpt-4o-mini", label: "GPT-4o mini", subtitle: "alternative" },
  { id: "google/gemini-2.0-flash-exp", label: "Gemini 2.0 Flash", subtitle: "alternative" },
];

const STORAGE_KEY = "gita_or_key";
const PERSONA_KEY = "gita_persona_id";
const CUSTOM_KEY = "gita_persona_custom";
const MODEL_KEY = "gita_model";

export default function AskChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState<string | null>(null); // current streaming text
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>("");
  const [keyModalOpen, setKeyModalOpen] = useState(false);
  const [personaId, setPersonaId] = useState<string>("warrior-direct");
  const [customPersona, setCustomPersona] = useState<string>("");
  const [model, setModel] = useState<string>(MODELS[0].id);
  const [showSettings, setShowSettings] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load saved settings
  useEffect(() => {
    const k = localStorage.getItem(STORAGE_KEY) || "";
    const p = localStorage.getItem(PERSONA_KEY) || "warrior-direct";
    const c = localStorage.getItem(CUSTOM_KEY) || "";
    const m = localStorage.getItem(MODEL_KEY) || MODELS[0].id;
    setApiKey(k);
    setPersonaId(p);
    setCustomPersona(c);
    setModel(m);
    if (!k) setKeyModalOpen(true);
  }, []);

  // Auto-scroll to bottom on new content
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streaming]);

  // Persist persona / model choices
  useEffect(() => {
    localStorage.setItem(PERSONA_KEY, personaId);
  }, [personaId]);
  useEffect(() => {
    localStorage.setItem(CUSTOM_KEY, customPersona);
  }, [customPersona]);
  useEffect(() => {
    localStorage.setItem(MODEL_KEY, model);
  }, [model]);

  const saveKey = (k: string) => {
    localStorage.setItem(STORAGE_KEY, k);
    setApiKey(k);
  };

  const send = async () => {
    const text = input.trim();
    if (!text || streaming !== null) return;
    if (!apiKey) {
      setKeyModalOpen(true);
      return;
    }

    setError(null);
    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setStreaming("");

    const abort = new AbortController();
    abortRef.current = abort;

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey,
          model,
          personaId,
          customPersona,
          messages: newMessages,
        }),
        signal: abort.signal,
      });

      if (!res.ok) {
        const errText = await res.text();
        let parsed = errText;
        try {
          parsed = JSON.parse(errText).error || errText;
        } catch {}
        setError(parsed);
        setStreaming(null);
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setStreaming(acc);
      }

      setMessages([...newMessages, { role: "assistant", content: acc }]);
      setStreaming(null);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setError(err.message || "Network error");
      }
      setStreaming(null);
    }
  };

  const stop = () => {
    abortRef.current?.abort();
    if (streaming !== null) {
      setMessages((prev) => [...prev, { role: "assistant", content: streaming + " [stopped]" }]);
    }
    setStreaming(null);
  };

  const reset = () => {
    if (streaming !== null) stop();
    setMessages([]);
    setError(null);
  };

  const currentPersona = PERSONAS.find((p) => p.id === personaId);

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Top control strip */}
      <div className="mb-3 flex flex-wrap gap-2 items-center">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="px-3 py-1.5 rounded-full text-[12px] font-medium border border-dust-600/40 text-dust-100 hover:border-dharma-400/60 transition-colors"
        >
          {currentPersona?.name ?? "Pick voice"} · {model.split("/")[1]?.split("-")[0] ?? "model"}
        </button>
        {messages.length > 0 && (
          <button
            onClick={reset}
            className="text-[12px] text-dust-200/60 hover:text-dharma-400 px-2"
          >
            New conversation
          </button>
        )}
        <button
          onClick={() => setKeyModalOpen(true)}
          className="ml-auto text-[11px] text-dust-200/50 hover:text-dharma-400"
        >
          {apiKey ? "Change key" : "Add API key"}
        </button>
      </div>

      {/* Settings panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-3"
          >
            <div className="rounded-xl p-4 bg-dust-900/40 border border-dust-600/30 space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-dust-200/60 mb-2">
                  Krishna's voice
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                  {PERSONAS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPersonaId(p.id)}
                      className={`text-left px-3 py-2 rounded-lg transition-colors ${
                        personaId === p.id
                          ? "bg-dharma-400/15 border border-dharma-400/50"
                          : "bg-dust-800/40 border border-dust-600/30 hover:border-dust-600/60"
                      }`}
                    >
                      <p className="text-[13px] text-dust-50 font-medium leading-tight">
                        {p.name}
                      </p>
                      <p className="text-[11px] text-dust-200/60 mt-0.5">{p.oneliner}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-dust-200/60 mb-2">
                  Custom voice instruction (optional)
                </p>
                <textarea
                  value={customPersona}
                  onChange={(e) => setCustomPersona(e.target.value)}
                  placeholder="e.g. 'Answer as if speaking to a software engineer in Silicon Valley'"
                  className="w-full px-3 py-2 rounded-lg bg-dust-900/60 border border-dust-600/40 text-dust-50 text-[12px] outline-none focus:border-dharma-400/60 resize-none"
                  rows={2}
                />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-dust-200/60 mb-2">
                  Model
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {MODELS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setModel(m.id)}
                      className={`text-left px-3 py-2 rounded-lg text-[12px] transition-colors ${
                        model === m.id
                          ? "bg-dharma-400/15 border border-dharma-400/50"
                          : "bg-dust-800/40 border border-dust-600/30"
                      }`}
                    >
                      <p className="text-dust-50 font-medium">{m.label}</p>
                      <p className="text-[10px] text-dust-200/60 mt-0.5">{m.subtitle}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat scroll area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto pr-1 space-y-4 pb-4">
        {messages.length === 0 && streaming === null && (
          <div className="text-center pt-8 pb-4 px-4">
            <div className="inline-block mb-3">
              <KrishnaPortrait size={72} />
            </div>
            <p className="font-serif-d text-[20px] text-dust-50 leading-snug mb-2">
              Speak. I am listening.
            </p>
            <p className="text-[14px] text-dust-200/70 leading-relaxed max-w-md mx-auto">
              Ask anything. The conversation is yours. Try: &ldquo;Why did you ask Arjuna to drive
              into the middle of the battlefield?&rdquo; or something from your own life.
            </p>
          </div>
        )}

        {messages.map((m, i) => (
          <MessageBubble key={i} message={m} />
        ))}

        {streaming !== null && (
          <MessageBubble message={{ role: "assistant", content: streaming || "..." }} streaming />
        )}

        {error && (
          <div className="rounded-xl px-3 py-2.5 bg-arjuna-600/20 border border-arjuna-400/40">
            <p className="text-[10px] uppercase tracking-[0.16em] text-arjuna-400 font-medium mb-1">
              Error
            </p>
            <p className="text-[12px] text-dust-50 leading-relaxed">{error}</p>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="flex gap-2 items-end pt-2 border-t border-dust-600/20">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              send();
            }
          }}
          placeholder={apiKey ? "Ask Krishna anything…" : "Add your OpenRouter key to begin"}
          disabled={!apiKey || streaming !== null}
          className="flex-1 px-3 py-2.5 rounded-xl bg-dust-900/60 border border-dust-600/40 text-dust-50 text-[15px] outline-none focus:border-dharma-400/60 resize-none disabled:opacity-50"
          rows={2}
        />
        {streaming !== null ? (
          <button
            onClick={stop}
            className="px-4 py-2.5 rounded-xl text-[13px] font-medium bg-arjuna-600/30 border border-arjuna-400/50 text-dust-50"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={send}
            disabled={!input.trim() || !apiKey}
            className="px-4 py-2.5 rounded-xl text-[13px] font-medium bg-dharma-400 text-dust-900 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Ask
          </button>
        )}
      </div>
      <p className="text-[10px] text-dust-200/40 mt-1.5 px-1">
        ⌘+Enter to send · Conversation is private to your browser
      </p>

      <ApiKeyModal
        open={keyModalOpen}
        onClose={() => setKeyModalOpen(false)}
        onSave={saveKey}
      />
    </div>
  );
}

function MessageBubble({
  message,
  streaming,
}: {
  message: Message;
  streaming?: boolean;
}) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div
          className="rounded-2xl rounded-tr-sm px-3.5 py-2.5 max-w-[85%]"
          style={{
            background: "rgba(197, 106, 62, 0.18)",
            border: "0.5px solid rgba(197, 106, 62, 0.35)",
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.12em] font-medium text-arjuna-400 mb-1">
            You · Arjuna
          </p>
          <p className="text-[15px] text-dust-50 leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2.5 items-start">
      <div className="flex-shrink-0 mt-1">
        <div
          className="rounded-lg overflow-hidden border border-dust-600/30"
          style={{ width: 40 }}
        >
          <KrishnaPortrait size={40} />
        </div>
      </div>
      <div
        className="rounded-2xl rounded-tl-sm px-3.5 py-2.5 flex-1 min-w-0"
        style={{
          background: "rgba(74, 125, 184, 0.14)",
          border: "0.5px solid rgba(74, 125, 184, 0.35)",
        }}
      >
        <p className="text-[10px] uppercase tracking-[0.12em] font-medium text-krishna-400 mb-1">
          Krishna {streaming && "· typing"}
        </p>
        <p className="font-serif-d text-[17px] text-dust-50 leading-relaxed whitespace-pre-wrap">
          {message.content}
          {streaming && <span className="inline-block w-1.5 h-4 bg-dharma-400 ml-0.5 animate-pulse" />}
        </p>
      </div>
    </div>
  );
}
