export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-mark ${className}`} aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11.25" />
        <path d="M8 21.5V10.5H10.25C13.15 10.5 14.6 12.15 14.6 16C14.6 19.85 13.15 21.5 10.25 21.5H8Z" />
        <path d="M17.65 10.5V21.5M17.65 16H23.8M23.8 10.5V21.5" />
      </svg>
    </span>
  );
}
