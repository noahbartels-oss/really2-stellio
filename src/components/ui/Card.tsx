import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export default function Card({ className, hover = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-slate-100 shadow-sm",
        hover && "transition-all duration-300 hover:shadow-lg hover:border-slate-200 hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
