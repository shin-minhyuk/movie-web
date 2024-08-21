import { useNavigate } from "react-router-dom";
import MovieAverage from "./movieAverage";

export default function Card({ movie }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/detail/${movie.id.toString()}`)}
      key={movie.id}
      className="card"
    >
      <img src={movie.front} alt={movie.title} />
      <div className="card_backdrop "></div>
      <div className="card_more">
        <MovieAverage movie={movie} />
        <div>{movie.release_date.slice(0, 4)}</div>
        <div>{movie.title}</div>
      </div>
    </div>
  );
}
