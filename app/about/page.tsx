export default function AboutPage() {
  return (
    <div className="max-w-md mx-auto px-4 pt-6">
      <header className="mb-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-dust-200/70">About</p>
        <h1 className="text-2xl font-serif-d text-dharma-400 mt-1">A companion, not a substitute</h1>
      </header>

      <div className="space-y-4 text-[14px] leading-relaxed text-dust-100">
        <p>
          The Bhagavad Gita is a 700-verse dialogue between Arjuna, a warrior-prince in crisis, and
          Krishna, his charioteer and friend who is — gradually — revealed as something far larger.
          The conversation happens on a battlefield, just before a war that will end an age. Arjuna
          freezes; Krishna teaches; Arjuna acts. The whole book takes place inside that pause.
        </p>

        <p>
          This app is a companion. It is not the book. It is not <em>As It Is</em>, it is not
          Easwaran, it is not Prabhupada. The text deserves to be read — eventually, in whatever
          translation suits you. This app is for the in-between: when you have ten minutes, when
          you can't sleep, when something in your day shook the chariot and you want to remember
          what Krishna said about that.
        </p>

        <div className="rounded-2xl p-4" style={{ background: "rgba(217,164,65,0.06)", border: "0.5px solid rgba(217,164,65,0.3)" }}>
          <p className="text-[11px] uppercase tracking-wider text-dharma-400 font-medium mb-2">
            How to use this
          </p>
          <ul className="space-y-2 text-[13px]">
            <li>
              <strong className="text-dust-50">Storyboard tab</strong> — read one chapter at a time.
              Tap a character at the top to see who they are. The "Modern Mirror" appears on the
              last scene of each chapter — that's where the story meets your life.
            </li>
            <li>
              <strong className="text-dust-50">Graph tab</strong> — explore the connections. Tap any
              node for a fact sheet. Use the "Related" buttons to walk through ideas the way the
              book itself does — sideways, recursively.
            </li>
            <li>
              <strong className="text-dust-50">Pair this with audio</strong> — the Easwaran
              audiobook on Audible is about seven hours, narrated by Paul Bazely. Listen on a
              drive. Then use this app to anchor what you heard.
            </li>
          </ul>
        </div>

        <p className="text-[12px] text-dust-200/60 italic">
          Translations and summaries are paraphrased for the modern reader. Sanskrit terms
          (dharma, karma yoga, atman) are kept where they're more accurate than any English
          equivalent. When you're ready for the verses themselves, go to the source.
        </p>
      </div>
    </div>
  );
}
