import { cn } from "@/lib/utils";

interface RedactionBarProps {
  label?: string;
  className?: string;
  width?: string;
}

export function RedactionBar({
  label = "[CLASSIFIED]",
  className,
  width = "100%",
}: RedactionBarProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center bg-black h-5 px-2",
        className
      )}
      style={{ width }}
      aria-label="Redacted"
    >
      <span className="font-mono font-bold text-[10px] tracking-widest text-threat">
        {label}
      </span>
    </span>
  );
}
