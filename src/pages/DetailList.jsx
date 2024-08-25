import { useSelector } from "react-redux";
import "../styles/home.scss";
import "../styles/detail.scss";

import SwiperMainSection from "../components/SwiperMainSection";
import { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import { clientMovie } from "../client/clientMovie";

function DetailList() {
  // 메인 페이지 데이터
  const { now_playing } = useSelector((state) => state.movieMain);

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const lastItemRef = useRef();
  const observer = useRef();

  useEffect(() => {
    const fetchFirstPage = async () => {
      setIsLoading(true);
      try {
        const response = await clientMovie.get(`/movie/now_playing?page=1`);
        setMovies(response.data.results);
        setPage(2); // 초기 데이터 패칭 이후 다음 페이지 설정
        setHasMore(response.data.results.length > 0);
      } catch (err) {
        console.error("초기 데이터 패칭 에러: ", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFirstPage();
  }, []);

  useEffect(() => {
    if (page === 1) return;

    const loadMovies = async () => {
      setIsLoading(true);
      try {
        const response = await clientMovie.get(
          `/movie/now_playing?page=${page}`
        );
        setMovies((prev) => [...prev, ...response.data.results]);
        setHasMore(response.data.results.length > 0);
      } catch (err) {
        console.error("스크롤 패치 에러: ", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadMovies();
  }, [page]);

  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    // 마지막 항목일 때, observer.current.observe(lastItemRef.current)
    if (lastItemRef.current) {
      observer.current.observe(lastItemRef.current);
    }

    return () => observer.current.disconnect();
  }, [isLoading, hasMore]);

  return (
    <main className="home_container">
      <div>
        <SwiperMainSection filteredData={now_playing} />
      </div>
      <div className="search_movie_container">
        {movies?.map((el, index) => (
          // 현재 항목의 인덱스가 항목 배열의 마지막 인덱스와 같은지를 확인합니다.
          // 이는 index가 배열의 마지막 항목일 때 true가 됩니다.
          <div
            key={`${el.id}-${index}`}
            ref={index === movies.length - 1 ? lastItemRef : null}
          >
            <Card movie={el} />
          </div>
        ))}
      </div>
    </main>
  );
}

export default DetailList;
