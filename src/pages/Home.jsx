import { useSelector } from "react-redux";
import "../styles/home.scss";

function Home() {
  const { data, loading } = useSelector((state) => state.movie);

  console.log();

  return (
    <div className="home_container">
      <div className="home_inner">
        <div>
          <h1>평점순 TOP 20</h1>
        </div>
        <div>
          <h1>인기순</h1>
          <div className="home_movie_popular">
            {data.map((el) => (
              <div>
                <img src={el.front} alt="" />
                <h1>{el.title}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
