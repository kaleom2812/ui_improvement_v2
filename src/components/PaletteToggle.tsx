"use client";

// Pink / blue palette toggle — sits next to ThemeToggle. Mirrors its pattern
// (src/components/ThemeToggle.tsx) but drives src/lib/palette.tsx instead.

import { useEffect, useState } from "react";
import { Swatches } from "@phosphor-icons/react";
import { usePalette } from "@/lib/palette";

export function PaletteToggle({ className = "" }: { className?: string }) {
  const { palette, setPalette } = usePalette();
  // Avoid a hydration mismatch: the server renders with the default ("pink"),
  // the client may resolve to "blue" from localStorage. Render a stable icon
  // until mounted.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isBlue = mounted && palette === "blue";

  return (
    <button
      type="button"
      onClick={() => setPalette(isBlue ? "pink" : "blue")}
      aria-label={isBlue ? "Switch to pink theme" : "Switch to off-white/blue theme"}
      title={isBlue ? "Blue theme" : "Pink theme"}
      className={`grid h-9 w-9 shrink-0 place-items-center border-2 border-line-2 text-ink-2 transition-colors hover:border-brand hover:text-brand ${className}`}
    >
      <Swatches size={16} weight="bold" />
    </button>
  );
}
