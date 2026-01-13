"use client";

import clsx from "clsx";
import { useId, useState, useRef, useEffect } from "react";

export type UiSelectOption = {
  value: string;
  label: string;
};

export type UiSelectFieldProps = {
  className?: string;
  label?: string;
  error?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options?: UiSelectOption[];
  disabled?: boolean;
};

// Chevron Icon Component
type ChevronIconProps = {
  isOpen: boolean;
};

function ChevronIcon({ isOpen }: ChevronIconProps) {
  return (
    <svg
      className={clsx(
        "h-5 w-5 text-slate-400 transition-transform duration-200",
        isOpen && "rotate-180"
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// Select Button Component
type SelectButtonProps = {
  id: string;
  disabled: boolean;
  isOpen: boolean;
  error?: string;
  label?: string;
  placeholder: string;
  selectedOption?: UiSelectOption;
  onClick: () => void;
};

function SelectButton({
  id,
  disabled,
  isOpen,
  error,
  label,
  placeholder,
  selectedOption,
  onClick,
}: SelectButtonProps) {
  return (
    <button
      id={id}
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-labelledby={label ? `${id}-label` : undefined}
      aria-label={!label ? placeholder : undefined}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={clsx(
        "w-full min-w-53 rounded border px-2 h-10 outline-none appearance-none bg-white text-left flex items-center justify-between",
        isOpen
          ? "border-teal-600 ring-1 ring-teal-600"
          : "border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600",
        disabled && "bg-gray-50 cursor-not-allowed opacity-60",
        error && "border-rose-400"
      )}
    >
      <span className={clsx(!selectedOption && "text-gray-400")}>
        {selectedOption ? selectedOption.label : placeholder}
      </span>
      <ChevronIcon isOpen={isOpen} />
    </button>
  );
}

// Dropdown Menu Component
type DropdownMenuProps = {
  id: string;
  label?: string;
  options: UiSelectOption[];
  value: string;
  onSelect: (value: string) => void;
};

function DropdownMenu({
  id,
  label,
  options,
  value,
  onSelect,
}: DropdownMenuProps) {
  return (
    <div
      role="listbox"
      aria-labelledby={label ? `${id}-label` : undefined}
      className="absolute z-10 mt-1 w-full bg-white border border-slate-300 rounded-md shadow-lg max-h-60 overflow-auto"
    >
      {!options.length ? (
        <div className="px-3 py-2 text-sm text-gray-500">
          No options available
        </div>
      ) : (
        <ul className="py-1">
          {options.map((option) => (
            <li key={option.value} role="option" aria-selected={option.value === value}>
              <button
                type="button"
                onClick={() => onSelect(option.value)}
                className={clsx(
                  "w-full text-left px-3 py-2 text-sm hover:bg-teal-50 focus:bg-teal-50 outline-none transition-colors",
                  option.value === value &&
                    "bg-teal-100 text-teal-900 font-medium"
                )}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function UISelectField({
  className,
  error,
  label,
  placeholder = "Select an option",
  value: controlledValue,
  defaultValue,
  onChange,
  options = [],
  disabled = false,
}: UiSelectFieldProps) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const containerRef = useRef<HTMLDivElement>(null);

  // Support both controlled and uncontrolled mode
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    // Update internal state if uncontrolled
    if (!isControlled) {
      setInternalValue(optionValue);
    }
    // Always call onChange if provided
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={clsx(className, "flex flex-col gap-1")}>
      {label && (
        <label id={`${id}-label`} htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div ref={containerRef} className="relative">
        <SelectButton
          id={id}
          disabled={disabled}
          isOpen={isOpen}
          error={error}
          label={label}
          placeholder={placeholder}
          selectedOption={selectedOption}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        />

        {isOpen && (
          <DropdownMenu
            id={id}
            label={label}
            options={options}
            value={value}
            onSelect={handleSelect}
          />
        )}
      </div>

      {error && (
        <div id={`${id}-error`} className="text-rose-400 text-sm" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}