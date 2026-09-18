"use client";

// Color-theme dropdown — sits next to ThemeToggle. Click opens a panel
// listing every palette in src/lib/palette.tsx; picking one persists via
// PaletteProvider and re-themes the whole site immediately.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Swatches, Check } from "@phosphor-icons/react";
import { usePalette, PALETTES } from "@/lib/palette";

export function PaletteToggle({ className = "" }: { className?: string }) {
  const { palette, setPalette } = usePalette();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = PALETTES.find((p) => p.id === palette) ?? PALETTES[0];

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Choose color theme"
        title="Color theme"
        className="grid h-9 w-9 shrink-0 place-items-center border-2 border-line-2 text-ink-2 transition-colors hover:border-brand hover:text-brand"
      >
        <Swatches size={16} weight="bold" style={mounted ? { color: current.swatch } : undefined} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="Color themes"
            className="absolute right-0 top-full z-50 mt-2 w-52 border border-line bg-surface p-1.5 shadow-pop"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {PALETTES.map((p) => {
              const active = p.id === palette;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => {
                    setPalette(p.id);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2.5 px-2.5 py-2 text-left text-sm font-medium transition-colors ${
                    active ? "bg-subtle text-ink" : "text-ink-2 hover:bg-subtle hover:text-ink"
                  }`}
                >
                  <span className="h-3 w-3 shrink-0" style={{ background: p.swatch }} aria-hidden="true" />
                  <span className="flex-1">{p.name}</span>
                  {active && <Check size={14} weight="bold" className="text-brand" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
