import { useNavigate } from 'react-router-dom'
import { CardWrapper } from './style'

export default function Card({ movie }) {
  const navigate = useNavigate()
  const { VITE_IMG_URL } = import.meta.env

  return (
    <CardWrapper
      onClick={() => navigate(`/detail/${movie.id.toString()}`)}
      key={movie.id}
    >
      <img src={VITE_IMG_URL + movie.poster_path} alt={movie.title} />
      <div className="card_backdrop "></div>
      <div className="card_more">
        <div className="card_more_average">
          <span>{movie?.vote_average?.toString().slice(0, 4)}</span>
        </div>
        <div>{movie?.release_date?.slice(0, 4)}</div>
        <div>{movie.title}</div>
      </div>
    </CardWrapper>
  )
}
