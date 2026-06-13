import { HeartPulse } from "lucide-react";

interface BrandLogoProps {
  size?: number;
  className?: string;
}

export function BrandLogo({ size = 36, className }: BrandLogoProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 shadow-md shadow-purple-500/30 ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      <HeartPulse
        className="text-white"
        style={{ width: size * 0.58, height: size * 0.58 }}
        strokeWidth={2.25}
      />
    </div>
  );
}