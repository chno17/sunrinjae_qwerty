import React, { useEffect, useState } from "react";
import "./Home.css";

function pickRandomFive(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(5, arr.length));
}

export default function Home({ games }) {
  const [slides, setSlides] = useState([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => { setSlides(pickRandomFive(games)); }, [games]);
  useEffect(() => {
    if (!slides.length) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [slides]);

  if (!slides.length) return null;
  const cur = slides[idx];

  return (
    <section className="banner">
      {/* 배경 이미지 (투명도 적용) */}
      <div
        className="banner__bg"
        style={{ backgroundImage: `url(/games/${cur.id}.jpg)` }}
        aria-hidden="true"
      />

      {/* 중앙 텍스트/버튼 */}
      <div className="banner__panel">
        <h2 className="banner__title">{cur.title}</h2>
        <a className="banner__btn" href={cur.url} target="_blank" rel="noopener noreferrer">
          ▶ 게임 실행
        </a>
      </div>

      {/* 도트 */}
      <div className="banner__dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === idx ? "active" : ""}`}
            onClick={() => setIdx(i)}
          />
        ))}
      </div>
    </section>
  );
}
