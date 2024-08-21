export default function MovieAverage({ movie }) {
  return (
    <div className="card_more_average">
      <span>{movie.vote_average.toString().slice(0, 4)}</span>
    </div>
  );
}
