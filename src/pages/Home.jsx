import { useSelector } from "react-redux";
import "../styles/home.scss";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { clientMovie } from "../client/clientMovie";

function Home() {
  const { data } = useSelector((state) => state.movie);
  const [page, setPage] = useState(1);

  const PER_ITEMS = 4;
  const MAX_ITEMS = 20;
  const MAX_PAGES = Math.ceil(MAX_ITEMS / PER_ITEMS);
  const startPageNumber = (page - 1) * PER_ITEMS;

  // add more movielists
  const onClick = () => {
    setPage((prev) => {
      const newPage = prev + 1;
      if (newPage > MAX_PAGES) {
        return 1;
      }

      return newPage;
    });
  };

  // popular movie state
  const [allMovies, setAllMovies] = useState([]);

  // movie data fetch func
  const fetchNowPlaying = async () =>
    await clientMovie.get("/movie/now_playing");
  const fetchPopular = async () => await clientMovie.get("/movie/popular");
  const fetchTopRated = async () => await clientMovie.get("/movie/top_rated");
  const fetchUpComing = async () => await clientMovie.get("/movie/upcoming");

  // allmovies data fetch func
  const fetchAllMovies = async () => {
    try {
      const response = await Promise.all([
        fetchPopular(),
        fetchNowPlaying(),
        fetchTopRated(),
        fetchUpComing(),
      ]);

      // 모든 영화 데이터 저장
      setAllMovies(response);
      console.log("모든영화 데이터: ", response);
    } catch (err) {
      console.error("패치 에러: ", err);
    }
  };

  // 화면 로드시 실행
  useEffect(() => {
    fetchAllMovies();
  }, []);

  return (
    <div className="home_container">
      <div className="home_inner">
        <div className="flex flex-col items-center relative">
          <div className="card_container">
            <div>
              <h1 className="text-[24px]">평점순 TOP 20</h1>
              <div className="bg-[red] w-[100px] h-[5px]"></div>
            </div>
            <div className="home_movie_average">
              {data.slice(startPageNumber, PER_ITEMS * page).map((el) => (
                <Card key={el.id} movie={el} />
              ))}
            </div>
          </div>
          <button onClick={onClick} className="next_button">
            다음
          </button>
        </div>
        <div className="card_container">
          <div>
            <h1 className="text-[24px] ">인기순</h1>
            <div className="bg-[red] w-[100px] h-[5px]"></div>
          </div>
          <div className="home_movie_popular">
            {data.slice(PER_ITEMS, 20).map((el) => (
              <Card key={el.id} movie={el} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
