import React from "react";
import { Link } from "react-router-dom";
import FavButton from "../components/FavButton";
import "./Games.css";

export default function Favorites({ games, isFav, toggleFav }) {
  if (!games.length) {
    return <p style={{margin:"16px 0"}}>즐겨찾기가 비어 있어요. Games에서 ⭐를 눌러 추가해 보세요.</p>;
  }
  return (
    <section className="grid">
      {games.map((g) => (
        <article key={g.id} className="card">
          <img
            className="card__img"
            src={`/games/${g.id}.jpg`}
            alt={g.title}
            loading="lazy"
            onError={(e)=>{ e.currentTarget.src="/games/placeholder.jpg"; }}
          />
          <div className="card__row">
            <Link className="card__title" to={`/games/${g.id}`}>{g.title}</Link>
            <FavButton active={isFav(g.id)} onClick={() => toggleFav(g.id)} />
          </div>
          <p className="card__genre">{g.genre}</p>
          <a className="card__btn" href={g.url} target="_blank" rel="noopener noreferrer">실행하기</a>
        </article>
      ))}
    </section>
  );
}
