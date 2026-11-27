import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "icon";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spotify-accent disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

  const variants = {
    primary:
      "bg-spotify-accent text-black hover:bg-spotify-accent-hover hover:scale-105 shadow-md",
    secondary:
      "bg-spotify-highlight text-content-primary hover:brightness-125 border border-border-subtle",
    ghost:
      "bg-transparent text-content-secondary hover:text-content-primary hover:bg-spotify-highlight/50",
    icon:
      "bg-spotify-accent text-black hover:bg-spotify-accent-hover hover:scale-105 shadow-lg",
  };

  const sizes = {
    sm: variant === "icon" ? "w-9 h-9" : "text-xs px-4 py-2",
    md: variant === "icon" ? "w-11 h-11" : "text-sm px-6 py-2.5",
    lg: variant === "icon" ? "w-14 h-14" : "text-base px-8 py-3.5",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}