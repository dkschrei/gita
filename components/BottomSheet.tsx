"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BottomSheet({ open, onClose, children }: BottomSheetProps) {
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.55)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed left-0 right-0 bottom-0 z-50 max-w-md mx-auto md:hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 500) onClose();
            }}
          >
            <div
              className="rounded-t-3xl overflow-hidden"
              style={{
                background: "#15110D",
                borderTop: "0.5px solid rgba(217, 164, 65, 0.3)",
                maxHeight: "85vh",
                paddingBottom: "env(safe-area-inset-bottom, 0px)",
              }}
            >
              <div className="flex justify-center pt-2.5 pb-1">
                <div className="w-10 h-1 rounded-full bg-dust-400/60" />
              </div>
              <div className="overflow-y-auto px-5 pb-6" style={{ maxHeight: "calc(85vh - 28px)" }}>
                {children}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="fixed inset-0 z-50 hidden md:flex items-center justify-center p-6"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="rounded-2xl overflow-hidden w-full max-w-lg shadow-2xl relative"
              style={{
                background: "#15110D",
                border: "0.5px solid rgba(217, 164, 65, 0.3)",
                maxHeight: "85vh",
              }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-dust-100 hover:text-dharma-400 hover:bg-dust-800/60 transition-colors"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </svg>
              </button>
              <div className="overflow-y-auto px-6 py-6" style={{ maxHeight: "85vh" }}>
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
