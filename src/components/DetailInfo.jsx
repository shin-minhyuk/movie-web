import heart_translate from "../assets/heart_translate.svg";
import heart_red from "../assets/heart_red.svg";
import { useState } from "react";
import { client } from "../client/client";
import { useDispatch, useSelector } from "react-redux";
import { favoritesSlice } from "../RTK/uesrSlice";

export default function DetailInfo({ filteredData }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { favorites } = useSelector((state) => state.favorites);

  // id 값 정의
  const userId = userData.id;
  console.log(userId);
  const itemId = filteredData.id;
  console.log(itemId);

  // 서버에서 즐겨찾기 목록을 가져오는 함수

  // 즐겨찾기 추가/삭제 함수
  const handleToggleFavorite = async (movie) => {
    // 토글 조건, 얘가 favorite 상태인지 아닌지 확인해야함
    const isFavorite = favorites.some((el) => el.item_id === movie.id);

    // favorite인 경우에, removeFavorite
    if (isFavorite) {
      try {
        await client.delete("/favorites", {
          // delete를 사용할 때, url에 직접 파라미터를 작성하거나,
          // 데이터가 많다면 body에 data 객체로 전달
          params: {
            user_id: `eq.${userId}`,
            item_id: `eq.${itemId}`,
          },
        });
      } catch (err) {
        console.error(err);
      }
      // favorite이 아니라면, addFavorite
    } else {
      const addFavorite = async (userId, itemId) => {
        try {
          const res = await client.post("/rest/v1/favorites", {
            user_id: userId,
            item_id: itemId,
          });
          console.log(res);
          dispatch(favoritesSlice.actions.addFavorite(res.data.results));
        } catch (err) {
          console.error(err);
        }
      };
    }
  };

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
