import React from "react";

export default function AIIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Central processor core */}
      <rect x="9" y="9" width="6" height="6" rx="1" />
      
      {/* Outer nodes / network grid connections */}
      <path d="M12 1v3" />
      <path d="M12 20v3" />
      <path d="M20 12h3" />
      <path d="M1 12h3" />
      
      {/* Diagonal bus lines */}
      <path d="M18.36 5.64l-2.12 2.12" />
      <path d="M7.76 16.24l-2.12 2.12" />
      <path d="M18.36 18.36l-2.12-2.12" />
      <path d="M7.76 7.76L5.64 5.64" />
    </svg>
  );
}