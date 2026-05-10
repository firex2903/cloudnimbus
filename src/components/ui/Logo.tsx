import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
}

export function Logo({ className, size = "md", variant = "full" }: LogoProps) {
  const iconSizes = { sm: 28, md: 36, lg: 48 };
  const s = iconSizes[size];
  const textSizes = { sm: "text-lg", md: "text-xl", lg: "text-3xl" };

  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="nimbus-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0c8ee7" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        {/* Cloud shape */}
        <path
          d="M38 30a7 7 0 000-14 1 1 0 01-1-1 11 11 0 00-21.8 2.2A8 8 0 1010 34h28z"
          fill="url(#nimbus-gradient)"
          opacity="0.9"
        />
        {/* Small detail cloud */}
        <path
          d="M14 38a5 5 0 000-10 1 1 0 01-.7-.3A7 7 0 006 34a4 4 0 000 8h8z"
          fill="url(#nimbus-gradient)"
          opacity="0.4"
        />
        {/* Sparkle */}
        <circle cx="36" cy="16" r="2" fill="white" opacity="0.8" />
        <circle cx="32" cy="12" r="1.2" fill="white" opacity="0.5" />
      </svg>
      {variant === "full" && (
        <span className={cn("font-bold tracking-tight bg-gradient-to-r from-sky-500 to-violet-600 bg-clip-text text-transparent", textSizes[size])}>
          CloudNimbus
        </span>
      )}
    </div>
  );
}
