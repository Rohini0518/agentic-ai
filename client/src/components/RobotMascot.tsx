export function RobotMascot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 220"
      className={className}
      role="img"
      aria-label="Friendly robot mascot"
    >
      <defs>
        <linearGradient id="robotBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e8ebf0" />
        </linearGradient>
        <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="chestGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
      </defs>

      <ellipse cx="100" cy="208" rx="55" ry="8" fill="#000000" opacity="0.1" />

      <line x1="100" y1="8" x2="100" y2="30" stroke="#cbd5e1" strokeWidth="3" />
      <circle cx="100" cy="8" r="9" fill="#fde68a" />
      <circle cx="100" cy="8" r="5" fill="#f59e0b" />

      <rect x="20" y="118" width="18" height="48" rx="9" fill="url(#robotBody)" stroke="#dbe1e8" strokeWidth="2" />
      <rect x="162" y="118" width="18" height="48" rx="9" fill="url(#robotBody)" stroke="#dbe1e8" strokeWidth="2" />

      <rect x="42" y="100" width="116" height="92" rx="30" fill="url(#robotBody)" stroke="#dbe1e8" strokeWidth="2" />
      <circle cx="100" cy="142" r="20" fill="url(#chestGlow)" opacity="0.35" />
      <circle cx="100" cy="142" r="12" fill="url(#chestGlow)" />

      <rect x="55" y="30" width="90" height="70" rx="28" fill="url(#robotBody)" stroke="#dbe1e8" strokeWidth="2" />
      <rect x="68" y="53" width="64" height="30" rx="15" fill="#1e293b" />

      <circle cx="90" cy="68" r="13" fill="url(#eyeGlow)" />
      <circle cx="110" cy="68" r="13" fill="url(#eyeGlow)" />
      <circle cx="90" cy="68" r="6" fill="#e0f2fe" />
      <circle cx="110" cy="68" r="6" fill="#e0f2fe" />
    </svg>
  );
}
