import { useSelector } from "react-redux";
import "../styles/home.scss";
import "../styles/detail.scss";

import SwiperSection from "../components/SwiperSection";
import SwiperMainSection from "../components/SwiperMainSection";

function Home() {
  // 메인 페이지 데이터
  const { now_playing, popular, top_rated, upcoming, loading } = useSelector(
    (state) => state.movieMain
  );
  console.log("메인: ", {
    now_playing,
    popular,
    top_rated,
    upcoming,
    loading,
  });

  return (
    <main className="home_container">
      <div>
        <SwiperMainSection filteredData={now_playing} />
      </div>
      <div className="home_inner">
        <SwiperSection movies={now_playing} />
        <SwiperSection movies={top_rated} />
        <SwiperSection movies={upcoming} />
        <SwiperSection movies={popular} />
      </div>
    </main>
  );
}

export default Home;
