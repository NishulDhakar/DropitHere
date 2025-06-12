import React from 'react';

export interface ButtonProps {
  onClick: () => void;
  startIcon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  text: string;
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
}

const variantStyles = {
    primary: `
        bg-gradient-to-r from-[#7164c0] to-[#5b5fda] text-white
        shadow-xl
        border-2 border-transparent
        hover:shadow-2xl
        hover:scale-[1.03]
        hover:border-[#a5b4fc]
        focus:ring-[#7164c0]
        transition-all
    `,
    secondary: `
        bg-white/70 backdrop-blur-md text-[#7164c0]
        border-2 border-[#e0e7ff]
        shadow
        hover:bg-white/90
        hover:shadow-lg
        hover:scale-[1.03]
        hover:border-[#7164c0]
        focus:ring-[#7164c0]
        transition-all
    `
};

const sizeStyles = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-5 py-2.5",
    lg: "text-lg px-7 py-3"
};

const defaultStyles = `
    rounded-2xl font-semibold flex items-center gap-2
    focus:outline-none focus:ring-2 focus:ring-offset-2
    active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed
    transition-all duration-200
`;

export function Button({
  onClick,
  startIcon,
  size = "md",
  variant = "primary",
  text,
  loading = false,
  fullWidth = false,
  disabled = false,
}: ButtonProps) {
  const spinnerColor = variant === "primary" ? "text-white" : "text-[#7164c0]";
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${defaultStyles}
        ${fullWidth ? "w-full justify-center" : ""}
        ${loading ? "pointer-events-none" : ""}
        relative overflow-hidden
      `}
    >
      <span className="absolute inset-0 rounded-2xl pointer-events-none z-0" aria-hidden
        style={{
          boxShadow: variant === "primary"
            ? "0 0 0 2px #a5b4fc, 0 4px 24px 0 #7164c033"
            : "0 0 0 2px #e0e7ff"
        }}
      />
      <span className="relative z-10 flex items-center">
        {loading && (
          <svg className={`animate-spin h-5 w-5 mr-2 ${spinnerColor}`} viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
          </svg>
        )}
        {startIcon && <span className="mr-2 flex items-center">{startIcon}</span>}
        <span>{text}</span>
      </span>
    </button>
  );
}