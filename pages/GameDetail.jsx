import React from "react";
import { useParams, Link } from "react-router-dom";
import FavButton from "../components/FavButton";
import "./GameDetail.css";

export default function GameDetail({ games, isFav, toggleFav }) {
  const { id } = useParams();
  const game = games.find(g => String(g.id) === String(id));
  if (!game) return <p>게임을 찾을 수 없어요. <Link to="/games">목록으로</Link></p>;

  return (
    <section className="detail">
      <div
        className="detail__bg"
        style={{ backgroundImage: `url(/games/${game.id}.jpg)` }}
        aria-hidden="true"
      />
      <div className="detail__panel">
        <div className="detail__top">
          <h1 className="detail__title">{game.title}</h1>
          <FavButton active={isFav(game.id)} onClick={() => toggleFav(game.id)} />
        </div>
        <p className="detail__genre">장르: {game.genre}</p>

        {/* 필요시 설명 추가 */}
        <p className="detail__desc">
          와플래시에서 실행되는 추억의 플래시 게임입니다. 아래 버튼으로 바로 플레이하세요.
        </p>

        <div className="detail__actions">
          <a className="play" href={game.url} target="_blank" rel="noopener noreferrer">▶ 게임 실행</a>
          <Link className="back" to="/games">← 목록으로</Link>
        </div>
      </div>
    </section>
  );
}
