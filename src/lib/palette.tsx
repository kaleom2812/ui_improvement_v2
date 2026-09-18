"use client";

// Palette context — grey/pink default + `.theme-blue` class on <html>.
// Independent of (and composes with) the light/dark toggle in src/lib/theme.tsx:
// see src/app/globals.css for how `.dark` and `.theme-blue` combine.
//
// The persisted value is also read by a tiny pre-paint script in
// src/app/layout.tsx so the correct class is on <html> before first paint.

import { createContext, useContext, useEffect } from "react";
import { usePersistentState } from "@/lib/hooks";

export type Palette = "pink" | "blue";

export const PALETTE_STORAGE_KEY = "phazeai:palette";

interface PaletteValue {
  palette: Palette;
  setPalette: (p: Palette) => void;
  toggle: () => void;
}

const PaletteContext = createContext<PaletteValue | null>(null);

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPalette] = usePersistentState<Palette>(PALETTE_STORAGE_KEY, "pink");

  useEffect(() => {
    document.documentElement.classList.toggle("theme-blue", palette === "blue");
  }, [palette]);

  const value: PaletteValue = {
    palette,
    setPalette,
    toggle: () => setPalette((prev: Palette) => (prev === "pink" ? "blue" : "pink")),
  };

  return <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>;
}

export function usePalette(): PaletteValue {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error("usePalette must be used within a PaletteProvider");
  return ctx;
}
