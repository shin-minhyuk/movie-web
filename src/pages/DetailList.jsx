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

  // 첫페이지 로딩
  useEffect(() => {
    const fetchFirstPage = async () => {
      setIsLoading(true);
      try {
        // 1페이지 데이터 패치
        const response = await clientMovie.get(`/movie/now_playing?page=1`);
        // response 저장
        setMovies(response.data.results);
        // 초기 데이터 패칭 이후 다음 페이지 설정
        setPage(2);
        // 데이터가 전달되었는지 확인 (추가 데이터 확인)
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
    <>
      <div>
        <SwiperMainSection filteredData={now_playing} />
      </div>
      <div className="search_container">
        <div className="home_inner">
          <div className="card_container">
            <div className="search_movie_container">
              {movies?.map((el, index) => (
                <div
                  key={el.id}
                  // ref를 사용해서 div 돔 노드에 접근
                  // 현재 항목의 인덱스가 항목 배열의 마지막 인덱스와 같은지를 확인합니다.
                  // 이는 index가 배열의 마지막 항목일 때 true가 됩니다.
                  ref={index === movies.length - 1 ? lastItemRef : null}
                >
                  <Card movie={el} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailList;
