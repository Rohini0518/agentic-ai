export function RobotAvatar({ className }: { className?: string }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 shadow-sm ${className ?? "size-8"}`}
    >
      <svg viewBox="0 0 40 40" className="h-5 w-5" role="img" aria-label="AI">
        <line x1="20" y1="4" x2="20" y2="9" stroke="#fde68a" strokeWidth="2" />
        <circle cx="20" cy="4" r="2" fill="#fde68a" />
        <rect x="6" y="9" width="28" height="21" rx="9" fill="#ffffff" />
        <rect x="12" y="15" width="16" height="9" rx="4.5" fill="#1e293b" />
        <circle cx="17" cy="19.5" r="2" fill="#7dd3fc" />
        <circle cx="23" cy="19.5" r="2" fill="#7dd3fc" />
      </svg>
    </div>
  );
}
