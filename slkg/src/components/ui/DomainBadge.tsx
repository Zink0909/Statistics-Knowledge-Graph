import type { Domain } from "../../types";
import { DOMAIN_COLOR, DOMAIN_BG, DOMAIN_SHORT } from "../../lib/constants";

interface Props {
  domain: Domain;
  short?: boolean;
  className?: string;
}

export default function DomainBadge({ domain, short = false, className = "" }: Props) {
  const color = (DOMAIN_COLOR as Record<string, string>)[domain] ?? "#888";
  const bg    = (DOMAIN_BG   as Record<string, string>)[domain] ?? "#f5f5f5";
  const label = short ? (DOMAIN_SHORT as Record<string, string>)[domain] : domain;
  return (
    <span
      className={`badge text-[10px] font-medium ${className}`}
      style={{ background: bg, color }}
    >
      {label}
    </span>
  );
}
