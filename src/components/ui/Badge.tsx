import { cn } from "@/lib/utils";

type BadgeVariant = "blue" | "purple" | "green" | "orange" | "red" | "gray" | "teal";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  blue: "bg-sky-100 text-sky-700",
  purple: "bg-violet-100 text-violet-700",
  green: "bg-emerald-100 text-emerald-700",
  orange: "bg-orange-100 text-orange-700",
  red: "bg-red-100 text-red-700",
  gray: "bg-slate-100 text-slate-600",
  teal: "bg-teal-100 text-teal-700",
};

export function Badge({ children, variant = "gray", className }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold", variants[variant], className)}>
      {children}
    </span>
  );
}
