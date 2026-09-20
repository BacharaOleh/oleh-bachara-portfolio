export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-mark ${className}`} aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11.25" />
        <path d="M9 10.5V21.5M9 10.5H13.2C15 10.5 15.8 11.5 15.8 13C15.8 14.5 15 15.5 13.2 15.5H9M12.5 15.5L15.8 21.5" />
        <path d="M18.5 10.5V21.5M18.5 10.5H21C23.8 10.5 24.8 12.5 24.8 16C24.8 19.5 23.8 21.5 21 21.5H18.5" />
      </svg>
    </span>
  );
}
