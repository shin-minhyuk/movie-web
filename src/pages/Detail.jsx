import { useParams } from "react-router-dom";
import "../styles/detail.scss";
import { useSelector } from "react-redux";
import MovieAverage from "../components/movieAverage";
import heart_translate from "../assets/heart_translate.svg";
import heart_red from "../assets/heart_red.svg";
import { useState } from "react";

function Detail() {
  const params = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const { data, loading } = useSelector((state) => state.movie);
  const filteredData = data?.find((el) => el.id === Number(params.id));

  // 깜빡이는 현상 수정 => loading page 만들어야함
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!filteredData) {
    return <div>해당 영화 데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="detail_container">
      {/* 상단 data.back 이미지 */}
      <div className="detail_backImage_box">
        <img
          className="detail_backImage"
          src={filteredData.back}
          alt={filteredData + " 이미지"}
        />
        <div className="detail_backImage_backdrop"></div>
      </div>
      {/* 상세페이지 */}
      <div className="detail_main">
        {/* 섹션 1 */}
        <div className="detail_sec">
          <div className="detail_sec_imgbox">
            <img
              className="detail_sec_img"
              src={filteredData.front}
              alt={filteredData.title}
            />
          </div>
          <div className="detail_sec_info">
            <h1 className="detail_sec_title">
              {filteredData.title} {filteredData.release_date.slice(0, 4)}
            </h1>
            <div className="detail_sec_position">
              <MovieAverage movie={filteredData} />
              <div className="detail_sec_position_list">영화</div>
              <div className="detail_sec_position_list">장르</div>
            </div>
            <div className="detail_sec_des">{filteredData.description}</div>
            <button onClick={() => setIsFavorite((prev) => !prev)}>
              <img
                src={isFavorite ? heart_red : heart_translate}
                alt="찜하기"
              />
            </button>
          </div>
        </div>

        {/* 섹션 2 */}
        <div className="detial_sec">
          <h1 className="text-[24px]">비슷한 영화</h1>
          <div className="bg-[red] w-[100px] h-[5px]"></div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
