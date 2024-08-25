import heart_translate from "../assets/heart_translate.svg";
import heart_red from "../assets/heart_red.svg";
import { useState } from "react";

export default function DetailInfo({ filteredData }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="detail_main_info">
      <h1 className="detail_sec_title">
        {filteredData.title} {filteredData.release_date.slice(0, 4)}
      </h1>
      <div className="detail_sec_position">
        <div className="card_more_average">
          <span>{filteredData.vote_average.toString().slice(0, 4)}</span>
        </div>
        {filteredData.genres.map((el) => (
          <div key={el.id} className="detail_sec_position_list">
            {el.name}
          </div>
        ))}
      </div>
      <div className="detail_sec_des">{filteredData.overview}</div>
      <button onClick={() => setIsFavorite((prev) => !prev)}>
        <img src={isFavorite ? heart_red : heart_translate} alt="찜하기" />
      </button>
    </div>
  );
}
