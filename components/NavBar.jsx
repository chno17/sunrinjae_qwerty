import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";

export default function NavBar({ q, setQ }) {
  const navigate = useNavigate();

  return (
    <header className="nav">
      <div className="nav__inner">
        <div className="nav__brand" onClick={() => navigate("/")}>
          Jr.QWERTY
        </div>

        <nav className="nav__links">
          <NavLink to="/" className={({isActive}) => isActive ? "link active" : "link"}>
            Home
          </NavLink>
          <NavLink to="/games" className={({isActive}) => isActive ? "link active" : "link"}>
            Games
          </NavLink>
          <NavLink to="/favorites" className={({isActive}) => isActive ? "link active" : "link"}>
            Favorites
          </NavLink>
        </nav>

        <div className="nav__search">
          <input
            className="nav__input"
            placeholder="게임 제목 검색"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") navigate("/games"); }}
          />
          <button className="nav__go" onClick={() => navigate("/games")}>검색</button>
        </div>
      </div>
    </header>
  );
}
