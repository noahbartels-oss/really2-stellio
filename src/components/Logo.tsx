import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  white?: boolean;
}

function LogoIcon({ size = "md", white = false }: { size?: string; white?: boolean }) {
  const sizeClasses = {
    sm: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={sizeClasses[size as keyof typeof sizeClasses]}
    >
      {/* Background */}
      <rect width="40" height="40" rx="8" fill={white ? "rgba(255,255,255,0.1)" : "transparent"} />

      {/* White left chevron */}
      <g>
        <path
          d="M8 20L16 12L18 14L12 20L18 26L16 28L8 20Z"
          fill={white ? "rgba(255,255,255,0.9)" : "white"}
        />
      </g>

      {/* Blue right chevron with gradient */}
      <defs>
        <linearGradient id="chevron-gradient" x1="20" y1="10" x2="32" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#60a5fa" />
          <stop offset="1" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <g>
        <path
          d="M22 20L30 12L32 14L26 20L32 26L30 28L22 20Z"
          fill={white ? "rgba(255,255,255,0.8)" : "url(#chevron-gradient)"}
        />
      </g>
    </svg>
  );
}

export default function Logo({ href = "/", size = "md", className, white = false }: LogoProps) {
  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const content = (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoIcon size={size} white={white} />
      <span className={cn(
        "font-bold tracking-tight",
        textSizes[size],
        white ? "text-white" : "text-slate-900"
      )}>
        Stellio
      </span>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

export { LogoIcon };
