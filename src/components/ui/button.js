import React from "react";

export function Button({ children, onClick, className }) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}