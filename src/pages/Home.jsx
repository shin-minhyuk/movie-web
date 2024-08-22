import { useDispatch, useSelector } from "react-redux";
import "../styles/home.scss";
import Card from "../components/Card";
import { useState } from "react";
import { globalLoadingSlice } from "../RTK/globalLoadingSlice";
import GlobalLoading from "../components/GlobalLoading";

function Home() {
  const { data, loading } = useSelector((state) => state.movie);
  const { globalLoading } = useSelector((state) => state.globalLoading);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const PER_ITEMS = 4;
  const MAX_ITEMS = 20;
  const MAX_PAGES = Math.ceil(MAX_ITEMS / PER_ITEMS);
  const startPageNumber = (page - 1) * PER_ITEMS;

  const onClick = () => {
    setPage((prev) => {
      const newPage = prev + 1;
      if (newPage > MAX_PAGES) {
        return 1;
      }

      return newPage;
    });
  };

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
