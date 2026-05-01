"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
}

export default function ApiKeyModal({ open, onClose, onSave }: Props) {
  const [key, setKey] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setError(null);
      const existing = typeof window !== "undefined"
        ? localStorage.getItem("gita_or_key") || ""
        : "";
      setKey(existing);
    }
  }, [open]);

  const handleSave = () => {
    const trimmed = key.trim();
    if (!trimmed) {
      setError("Paste your OpenRouter key.");
      return;
    }
    if (!trimmed.startsWith("sk-or-")) {
      setError("That doesn't look like an OpenRouter key. Keys start with 'sk-or-'.");
      return;
    }
    onSave(trimmed);
    onClose();
  };

  const handleClear = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("gita_or_key");
    }
    setKey("");
    setError(null);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.7)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="rounded-2xl w-full max-w-md p-6"
              style={{
                background: "#15110D",
                border: "0.5px solid rgba(217, 164, 65, 0.3)",
              }}
            >
              <p className="text-[10px] uppercase tracking-[0.18em] text-dharma-400 mb-2">
                Connect to OpenRouter
              </p>
              <h3 className="font-serif-d text-[20px] text-dust-50 leading-tight mb-3">
                Bring your own key
              </h3>
              <p className="text-[13px] text-dust-200/80 leading-relaxed mb-4">
                Get a key at{" "}
                <a
                  href="https://openrouter.ai/keys"
                  target="_blank"
                  rel="noreferrer"
                  className="text-dharma-400 underline"
                >
                  openrouter.ai/keys
                </a>
                . It stays on your device — stored in localStorage, never sent to any server other
                than OpenRouter itself. You'll see your usage at openrouter.ai.
              </p>

              <input
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="sk-or-v1-..."
                className="w-full px-3 py-2.5 rounded-lg bg-dust-900/60 border border-dust-600/40 text-dust-50 text-[13px] font-mono outline-none focus:border-dharma-400/60 mb-2"
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                autoFocus
              />

              {error && (
                <p className="text-[12px] text-arjuna-400 mb-2">{error}</p>
              )}

              <p className="text-[11px] text-dust-200/50 leading-relaxed mb-4">
                Recommended: load $5 of credits at openrouter.ai/credits. Claude Haiku 4.5 is
                cheap (~$0.001 per response). The key never expires unless you revoke it.
              </p>

              <div className="flex gap-2 justify-end items-center">
                {key && (
                  <button
                    onClick={handleClear}
                    className="text-[12px] text-dust-200/60 hover:text-arjuna-400 mr-auto"
                  >
                    Clear saved key
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-full text-[13px] font-medium border border-dust-600/40 text-dust-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-full text-[13px] font-medium bg-dharma-400 text-dust-900"
                >
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
