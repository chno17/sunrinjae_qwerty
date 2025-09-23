import React from "react";
import "./FavButton.css";

export default function FavButton({ active, onClick }) {
  return (
    <button className={`fav ${active ? "on" : ""}`} onClick={onClick} aria-label="즐겨찾기">
      {active ? "★" : "☆"}
    </button>
  );
}
