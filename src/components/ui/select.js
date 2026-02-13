import React from "react";

export function Select({ children, value, onValueChange }) {
  return (
    <select
      className="w-full border rounded-md p-2"
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
    >
      {children}
    </select>
  );
}

// لا نرجع أي div حتى لا يدخل داخل select
export function SelectTrigger({ children }) {
  return <>{children}</>;
}

export function SelectValue({ children }) {
  return <>{children}</>;
}

export function SelectContent({ children }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}