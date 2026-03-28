"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SearchSelectProps {
  id: string;
  label?: string;
  placeholder?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  allowCustom?: boolean;
  error?: string;
}

export default function SearchSelect({
  id,
  label,
  placeholder = "Suchen...",
  options,
  value,
  onChange,
  required,
  allowCustom = true,
  error,
}: SearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = search
    ? options.filter((opt) =>
        opt.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 30)
    : options.slice(0, 30);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        if (search && allowCustom) {
          onChange(search);
        }
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [search, allowCustom, onChange]);

  const handleSelect = (opt: string) => {
    onChange(opt);
    setSearch("");
    setOpen(false);
  };

  const handleInputChange = (val: string) => {
    setSearch(val);
    setOpen(true);
    if (allowCustom) {
      onChange(val);
    }
  };

  const handleFocus = () => {
    setOpen(true);
    setSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      setSearch("");
      inputRef.current?.blur();
    }
    if (e.key === "Enter" && filtered.length > 0) {
      e.preventDefault();
      handleSelect(filtered[0]);
    }
  };

  return (
    <div className="w-full" ref={containerRef}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            id={id}
            type="text"
            className={cn(
              "w-full px-4 py-3 pr-10 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              error && "border-red-500 focus:ring-red-500"
            )}
            placeholder={placeholder}
            value={open ? search : value}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            onClick={() => {
              if (open) {
                setOpen(false);
                setSearch("");
              } else {
                inputRef.current?.focus();
                handleFocus();
              }
            }}
            tabIndex={-1}
          >
            <svg className={cn("w-4 h-4 transition-transform duration-200", open && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {open && filtered.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
            {filtered.map((opt) => (
              <button
                key={opt}
                type="button"
                className={cn(
                  "w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors cursor-pointer first:rounded-t-xl last:rounded-b-xl",
                  opt === value ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-700"
                )}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(opt);
                }}
              >
                {opt}
              </button>
            ))}
            {search && filtered.length === 0 && allowCustom && (
              <div className="px-4 py-3 text-sm text-slate-500">
                Keine Treffer. Dein Eintrag wird übernommen.
              </div>
            )}
          </div>
        )}
        {open && filtered.length === 0 && search && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg">
            <div className="px-4 py-3 text-sm text-slate-500">
              {allowCustom ? 'Keine Vorschläge. Dein Eintrag wird übernommen.' : 'Keine Treffer gefunden.'}
            </div>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
