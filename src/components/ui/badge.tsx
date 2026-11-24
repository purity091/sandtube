import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-zinc-900 text-white shadow-xs hover:bg-zinc-800",
        secondary:
          "border-zinc-200 bg-zinc-100 text-zinc-800 hover:bg-zinc-200/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
        outline: "text-zinc-800 border-zinc-200 bg-white",
        success:
          "border-emerald-200 bg-emerald-50 text-emerald-700",
        youtube:
          "border-red-200 bg-red-50 text-[#FF0000] font-bold",
        warning:
          "border-zinc-200 bg-zinc-100 text-zinc-700",
        cyan:
          "border-zinc-200 bg-zinc-100 text-zinc-700",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
