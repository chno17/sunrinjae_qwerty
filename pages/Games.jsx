import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import GenreBar from "../components/GenreBar";
import FavButton from "../components/FavButton";
import "./Games.css";

export default function Games({ games, isFav, toggleFav }) {
  const genres = useMemo(
    () => Array.from(new Set(games.map(g => g.genre))).sort(),
    [games]
  );
  const [genre, setGenre] = useState("전체");

  const filtered = useMemo(() => {
    return games.filter(g => genre === "전체" ? true : g.genre === genre);
  }, [games, genre]);

  return (
    <>
      <GenreBar genres={genres} value={genre} onChange={setGenre} />
      <section className="grid">
        {filtered.map((g) => (
          <article key={g.id} className="card">
            <div className="card__media">
              <img
                className="card__img"
                src={`/games/${g.id}.jpg`}
                alt={g.title}
                loading="lazy"
                onError={(e)=>{ e.currentTarget.src = "/games/placeholder.jpg"; }}
              />
            </div>

            <div className="card__row">
              <Link className="card__title" to={`/games/${g.id}`}>{g.title}</Link>
              <FavButton active={isFav(g.id)} onClick={() => toggleFav(g.id)} />
            </div>

            <p className="card__genre">{g.genre}</p>
            <a className="card__btn" href={g.url} target="_blank" rel="noopener noreferrer">실행하기</a>
          </article>
        ))}
      </section>
    </>
  );
}
