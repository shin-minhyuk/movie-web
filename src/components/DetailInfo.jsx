import heart_translate from "../assets/heart_translate.svg";
import heart_red from "../assets/heart_red.svg";
import { useEffect, useState } from "react";
import { client, clientProxy } from "../client/client";
import { useDispatch, useSelector } from "react-redux";
import { favoritesSlice } from "../RTK/uesrSlice";

export default function DetailInfo({ filteredData }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { favorites } = useSelector((state) => state.favorites);

  // id 값 정의
  const userId = userData.id;

  // // 서버에서 즐겨찾기 목록을 가져오는 함수
  // useEffect(() => {
  //   const fetchAPI = async () => {
  //     const { data } = await client.get("/rest/v1/favorites", {
  //       params: {
  //         user_id: `eq.${userId}`,
  //       },
  //     });

  //     if (data)
  //       dispatch(
  //         favoritesSlice.actions.setFavorites(data.map((el) => el.item_id))
  //       );
  //   };
  //   fetchAPI();
  // }, []);

  useEffect(() => {
    const isTrue = favorites.some((el) => el === filteredData.id.toString());

    setIsFavorite(isTrue);
  }, [favorites]);

  // 즐겨찾기 추가/삭제 함수
  const handleToggleFavorite = async (movie) => {
    // 토글 조건, 얘가 favorite 상태인지 아닌지 확인해야함
    const isTrue = favorites.some((el) => el === movie.id.toString());
    console.log(isTrue, movie.id.toString());

    if (isTrue) {
      // 서버에서 제거
      try {
        const res = await clientProxy.delete("/rest/v1/favorites", {
          // delete를 사용할 때, url에 직접 파라미터를 작성하거나,
          // 데이터가 많다면 body에 data 객체로 전달
          params: {
            user_id: `eq.${userId}`,
            item_id: `eq.${movie.id}`,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          },
        });
        console.log(res);
        dispatch(favoritesSlice.actions.removeFavorite(movie.id.toString()));
        // 삭제 상태 업데이트
        setIsFavorite(false);
      } catch (err) {
        console.error("삭제 요청 에러: ", err);
      }
    } else {
      // 서버에서 추가
      try {
        await clientProxy.post("/rest/v1/favorites", {
          user_id: userId,
          item_id: movie.id,
        });

        dispatch(favoritesSlice.actions.addFavorite(movie.id.toString()));
        console.log("즐겨찾기목록 업데이트: ", favorites);

        // 추가 상태 업데이트
        setIsFavorite(true);
      } catch (err) {
        console.error(err);
      }
    }
    console.log(isFavorite);
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
      <button onClick={() => handleToggleFavorite(filteredData)}>
        <img src={isFavorite ? heart_red : heart_translate} alt="찜하기" />
      </button>
    </div>
  );
}
