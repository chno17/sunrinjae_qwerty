import React from "react";
import "./GenreBar.css";

export default function GenreBar({ genres, value, onChange }) {
  return (
    <div className="genres">
      {["전체", ...genres].map((g) => (
        <button
          key={g}
          className={`chip ${value === g ? "active" : ""}`}
          onClick={() => onChange(g)}
        >
          {g}
        </button>
      ))}
    </div>
  );
}
