import React from "react";

interface InputProps {
  reference?: React.Ref<HTMLInputElement>;
  placeholder: string;
  type?: "text" | "password";
}

export function Input({ placeholder, reference, type = "text" }: InputProps) {
  return (
    <input
      ref={reference}
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
    />
  );
}
