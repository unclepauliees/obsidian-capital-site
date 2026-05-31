import { cn } from "@/lib/utils";

interface ClassificationStampProps {
  text?: string;
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "inline";
}

export function ClassificationStamp({
  text = "CONFIDENTIAL · DEAL TEAM MATERIALS",
  className,
  position = "top-right",
}: ClassificationStampProps) {
  const posMap = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    inline: "",
  };

  const isAbsolute = position !== "inline";

  return (
    <span
      className={cn(
        "font-mono text-[10px] tracking-[0.15em] text-steel uppercase select-none",
        isAbsolute ? `absolute ${posMap[position]} z-20` : "",
        className
      )}
      aria-label={text}
    >
      {text}
    </span>
  );
}
