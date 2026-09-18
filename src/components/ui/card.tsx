import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Liquid-glass chart card: a translucent, blurred surface with a pink tint
 * and a soft pink-glow shadow — designed to sit over the blurred brand blobs
 * in AnalyticsShowcase's background so the backdrop-blur reads as glass.
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "border border-brand/20 bg-gradient-to-br from-surface/75 via-surface/55 to-brand-soft/35 text-ink shadow-glass backdrop-blur-xl transition-[box-shadow,border-color] duration-300 hover:border-brand/35 hover:shadow-pop",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5 p-5 sm:p-6", className)} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 className={cn("text-base font-bold tracking-tight text-ink sm:text-lg", className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-sm leading-relaxed text-ink-2", className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("p-5 pt-0 sm:p-6 sm:pt-0", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex items-center gap-2 p-5 pt-0 sm:p-6 sm:pt-0", className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
