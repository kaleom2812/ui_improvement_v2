import { socialProof } from "@/data/site";
import { Reveal } from "@/components/primitives";

/**
 * Full-width logo wall for the marketing homepage — a denser, framed
 * replacement for the old single-row text strip. Faint vertical hairlines +
 * a soft brand-tinted vignette sit behind a centered heading and a
 * responsive logo grid.
 */
export function LogoWall() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-subtle/40 py-32 sm:py-40">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgb(var(--c-line)) 0, rgb(var(--c-line)) 1px, transparent 1px, transparent 88px)",
          maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "radial-gradient(60% 60% at 50% 50%, rgb(var(--c-brand) / 0.06), transparent 70%)" }}
      />
      <div className="site-container relative z-10">
        <p className="text-center text-sm font-semibold text-ink-2">
          Trusted by marketing teams tracking AI visibility at
        </p>
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {socialProof.logos.map((l, i) => (
            <Reveal key={l} delay={i * 0.03} className="flex items-center justify-center">
              <span className="text-center text-lg font-bold tracking-tight text-ink-3 transition-colors hover:text-ink">
                {l}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
