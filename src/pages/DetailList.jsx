import { useSelector } from "react-redux";
import "../styles/home.scss";
import "../styles/detail.scss";

import SwiperMainSection from "../components/SwiperMainSection";
import { useEffect, useState } from "react";
import Card from "../components/Card";

function DetailList() {
  // 메인 페이지 데이터
  const { now_playing } = useSelector((state) => state.movieMain);
  const [page, setPage] = useState(1);

  return (
    <main className="home_container">
      <div>
        <SwiperMainSection filteredData={now_playing} />
      </div>
      <div className="search_movie_container">
        {now_playing?.map((el) => (
          <Card key={el.id} movie={el} />
        ))}
      </div>
    </main>
  );
}

export default DetailList;
