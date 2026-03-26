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
      <rect width="40" height="40" rx="10" fill={white ? "rgba(255,255,255,0.15)" : "url(#logo-gradient)"} />
      {/* Star / compass shape representing guidance */}
      <path
        d="M20 8L23.5 16.5L32 20L23.5 23.5L20 32L16.5 23.5L8 20L16.5 16.5L20 8Z"
        fill={white ? "white" : "white"}
        fillOpacity={white ? "1" : "0.95"}
      />
      {/* Inner diamond for depth */}
      <path
        d="M20 14L22.5 17.5L26 20L22.5 22.5L20 26L17.5 22.5L14 20L17.5 17.5L20 14Z"
        fill={white ? "rgba(255,255,255,0.15)" : "url(#logo-gradient)"}
      />
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563eb" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
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
