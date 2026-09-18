"use client";

// Palette context — which color theme is active, via a `data-palette`
// attribute on <html> (absent = the default pink/grey theme). Independent of
// (and composes with) the light/dark toggle in src/lib/theme.tsx: see
// src/app/globals.css for how `.dark` and `[data-palette]` combine.
//
// The persisted value is also read by a tiny pre-paint script in
// src/app/layout.tsx so the correct attribute is on <html> before first paint.

import { createContext, useContext, useEffect } from "react";
import { usePersistentState } from "@/lib/hooks";

export type Palette = "pink" | "blue" | "modern-minimal" | "indigo-mono" | "claude-azure";

export const PALETTE_STORAGE_KEY = "phazeai:palette";

export const PALETTES: Array<{ id: Palette; name: string; swatch: string }> = [
  { id: "pink", name: "Grey Pink", swatch: "#DB2777" },
  { id: "blue", name: "Off-white Blue", swatch: "#2563EB" },
  { id: "modern-minimal", name: "Modern Minimal", swatch: "#3B82F6" },
  { id: "indigo-mono", name: "Indigo Mono", swatch: "#3F5EC2" },
  { id: "claude-azure", name: "Claude Azure", swatch: "#4288C9" },
];

interface PaletteValue {
  palette: Palette;
  setPalette: (p: Palette) => void;
}

const PaletteContext = createContext<PaletteValue | null>(null);

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPalette] = usePersistentState<Palette>(PALETTE_STORAGE_KEY, "pink");

  useEffect(() => {
    if (palette === "pink") {
      document.documentElement.removeAttribute("data-palette");
    } else {
      document.documentElement.setAttribute("data-palette", palette);
    }
  }, [palette]);

  return <PaletteContext.Provider value={{ palette, setPalette }}>{children}</PaletteContext.Provider>;
}

export function usePalette(): PaletteValue {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error("usePalette must be used within a PaletteProvider");
  return ctx;
}
