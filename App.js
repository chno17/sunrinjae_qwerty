import React, { useMemo, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Games from "./pages/Games";
import GameDetail from "./pages/GameDetail";
import Favorites from "./pages/Favorites";

const GAMES = [
  { id: 1,  title: "잭 스미스 (Jacksmith)",                     url: "https://vidkidz.tistory.com/9323",  genre: "시뮬레이션" },
  { id: 2,  title: "전쟁시대 1 (Age of War)",                   url: "https://vidkidz.tistory.com/51",    genre: "전략" },
  { id: 3,  title: "전쟁시대 2 (Age of War 2)",                 url: "https://vidkidz.tistory.com/5224",  genre: "전략" },
  { id: 4,  title: "한국전쟁",                                   url: "https://vidkidz.tistory.com/115",   genre: "전략" },
  { id: 5,  title: "슈의 라면가게",                              url: "https://vidkidz.tistory.com/36",    genre: "시뮬레이션" },
  { id: 6,  title: "바운스어택 X (Bounce AttacK X)",            url: "https://vidkidz.tistory.com/7930",  genre: "액션" },
  { id: 7,  title: "고군분투",                                   url: "https://vidkidz.tistory.com/85",    genre: "아케이드" },
  { id: 8,  title: "버블 슈터 (Bubble Shooter)",                 url: "https://vidkidz.tistory.com/1514",  genre: "퍼즐" },
  { id: 9,  title: "배틀 스네이크 (Battle Snake)",              url: "https://vidkidz.tistory.com/6161",  genre: "아케이드" },
  { id: 10, title: "뱀이나와 (Daum)",                            url: "https://vidkidz.tistory.com/1348",  genre: "아케이드" },
  { id: 11, title: "버블 스피너 (Bubble Spinner)",               url: "https://vidkidz.tistory.com/1814",  genre: "퍼즐" },
  { id: 12, title: "카라이 스네이크 (Caray Snake)",              url: "https://vidkidz.tistory.com/14273", genre: "아케이드" },
  { id: 13, title: "버블 파퍼 (Bubble Popper)",                   url: "https://vidkidz.tistory.com/3112",  genre: "퍼즐" },
  { id: 14, title: "카라이 스네이크 2 (Caray Snake 2)",          url: "https://vidkidz.tistory.com/14274", genre: "아케이드" },
  { id: 15, title: "버블 히트 (Bubble Hit)",                     url: "https://vidkidz.tistory.com/12764", genre: "퍼즐" },
  { id: 16, title: "검 강화하기", url: "https://vidkidz.tistory.com/5291", genre: "아케이드"},
  { id: 17, title: "고향 만두",                 url: "https://vidkidz.tistory.com/42", genre: "퍼즐" },
  { id: 18, title: "스핀버블샷 (Daum)",                          url: "https://vidkidz.tistory.com/1032",  genre: "퍼즐" },
  { id: 19, title: "세상에서 가장 어려운 게임 1",                 url: "https://vidkidz.tistory.com/12",    genre: "퍼즐" },
  { id: 20, title: "영토전쟁 (Territory War)",                    url: "https://vidkidz.tistory.com/352",   genre: "전략" },
  { id: 21, title: "월드워즈 2 (World Wars 2)",                  url: "https://vidkidz.tistory.com/4897",  genre: "전략" },
  { id: 22, title: "끝없는 전쟁 3 (Endless War 3)",               url: "https://vidkidz.tistory.com/2017",  genre: "슈팅" },
  { id: 23, title: "세계전쟁 (원작)",                              url: "https://vidkidz.tistory.com/526",   genre: "전략" },
  { id: 24, title: "눈빛 보내기 3",            url: "https://vidkidz.tistory.com/1133",   genre: "아케이드" },
  { id: 25, title: "스타크래프트 남북전쟁 (2차 창작)",            url: "https://vidkidz.tistory.com/4995",  genre: "전략" },
  { id: 26, title: "스타크래프트 영토전쟁 (2차 창작)",            url: "https://vidkidz.tistory.com/4994",  genre: "전략" },
  { id: 27, title: "테트리스",                            url: "https://vidkidz.tistory.com/4015", genre: "퍼즐" },
  { id: 28, title: "바운스 어택 3",                              url: "https://vidkidz.tistory.com/2837",  genre: "아케이드" },
  { id: 29, title: "감옥탈출",                      url: "https://vidkidz.tistory.com/155",  genre: "아케이드" },
  { id: 30, title: "굴착소년 쿵",                     url: "https://vidkidz.tistory.com/221",  genre: "전략" },
];

export default function App() {
  /** 상단 검색어 (NavBar) */
  const [q, setQ] = useState("");

  /** 즐겨찾기: localStorage에 id 배열로 저장 */
  const [favs, setFavs] = useState(() => {
    try {
      const raw = localStorage.getItem("jrqwerty:favs");
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });
  useEffect(() => {
    localStorage.setItem("jrqwerty:favs", JSON.stringify(favs));
  }, [favs]);

  const toggleFav = (id) =>
    setFavs((prev) => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  const isFav = (id) => favs.includes(id);

  /** 검색 필터 (제목 + 장르) — 장르 필터는 /games 페이지에서 처리 */
  const filteredByQuery = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return GAMES;
    return GAMES.filter(g =>
      g.title.toLowerCase().includes(query) || g.genre.toLowerCase().includes(query)
    );
  }, [q]);

  return (
    <BrowserRouter>
      <NavBar q={q} setQ={setQ} />
      <div className="page">
        <Routes>
          <Route path="/" element={<Home games={GAMES} />} />
          <Route
            path="/games"
            element={<Games games={filteredByQuery} isFav={isFav} toggleFav={toggleFav} />}
          />
          <Route
            path="/games/:id"
            element={<GameDetail games={GAMES} isFav={isFav} toggleFav={toggleFav} />}
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                games={GAMES.filter(g => favs.includes(g.id))}
                isFav={isFav}
                toggleFav={toggleFav}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
