"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/lib/hooks";
import { SectionHeading, Pill } from "@/components/primitives";
import { VisibilityAreaChart } from "@/components/marketing/charts/VisibilityAreaChart";
import { MentionsBarChart } from "@/components/marketing/charts/MentionsBarChart";
import { ScoreTrendLineChart } from "@/components/marketing/charts/ScoreTrendLineChart";
import { EngineShareChart } from "@/components/marketing/charts/EngineShareChart";
import { GeoDimensionsRadarChart } from "@/components/marketing/charts/GeoDimensionsRadarChart";
import { OverallScoreRadialChart } from "@/components/marketing/charts/OverallScoreRadialChart";

const TABS = [
  { id: "visibility", label: "Visibility", Component: VisibilityAreaChart },
  { id: "mentions", label: "Mentions", Component: MentionsBarChart },
  { id: "score", label: "Score trend", Component: ScoreTrendLineChart },
  { id: "share", label: "Share of voice", Component: EngineShareChart },
  { id: "dimensions", label: "GEO dimensions", Component: GeoDimensionsRadarChart },
  { id: "overall", label: "Overall score", Component: OverallScoreRadialChart },
] as const;

/**
 * One chart at a time, switched by tab — the deliberate alternative to a
 * grid of every chart at once. Each tab is a self-contained <Card/> already
 * (see src/components/marketing/charts), so the switcher just mounts the
 * active one inside a crossfade.
 */
export function AnalyticsShowcase() {
  const [activeId, setActiveId] = React.useState<(typeof TABS)[number]["id"]>("visibility");
  const reduced = useReducedMotion();
  const active = TABS.find((t) => t.id === activeId) ?? TABS[0];
  const Active = active.Component;

  return (
    <section className="relative overflow-hidden py-32 sm:py-40">
      {/* Soft brand-colored glow the glass chart cards blur against. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-[6%] top-[8%] h-80 w-80 bg-brand/25 blur-[110px]" />
        <div className="absolute right-[8%] top-[35%] h-96 w-96 bg-brand-dark/20 blur-[130px]" />
        <div className="absolute bottom-[-6rem] left-[38%] h-72 w-72 bg-brand-dim/25 blur-[110px]" />
      </div>
      <div className="site-container relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Live analytics"
            title="How teams use phazeAi for AI search"
            lede="One dashboard, every metric that moves your GEO score — switch between the views your team checks daily."
          />
          <div className="flex flex-wrap gap-2 lg:justify-end" role="tablist" aria-label="Analytics view">
            {TABS.map((t) => (
              <Pill
                key={t.id}
                role="tab"
                aria-selected={t.id === activeId}
                active={t.id === activeId}
                onClick={() => setActiveId(t.id)}
              >
                {t.label}
              </Pill>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <Active />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
