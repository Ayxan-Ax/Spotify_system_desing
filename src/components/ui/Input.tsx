import React from "react";
import { Search, AlertCircle, CheckCircle2 } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  isSearch?: boolean;
}

export function Input({
  label,
  error,
  success,
  isSearch = false,
  className = "",
  ...props
}: InputProps) {
  const stateStyles = error
    ? "border-red-500 focus:ring-red-500"
    : success
    ? "border-spotify-accent focus:ring-spotify-accent"
    : "border-border-subtle focus:ring-spotify-accent";

  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {isSearch && (
          <Search className="w-4 h-4 text-content-muted absolute left-3.5 pointer-events-none" />
        )}

        <input
          className={`w-full bg-spotify-highlight text-content-primary placeholder:text-content-muted rounded-full py-2.5 ${
            isSearch ? "pl-10 pr-4" : "px-4"
          } text-sm border ${stateStyles} focus:outline-none focus:ring-2 transition ${className}`}
          {...props}
        />
      </div>

      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-400 mt-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}

      {success && !error && (
        <p className="flex items-center gap-1.5 text-xs text-spotify-accent mt-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>{success}</span>
        </p>
      )}
    </div>
  );
}