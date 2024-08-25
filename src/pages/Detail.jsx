import { useParams } from "react-router-dom";
import "../styles/detail.scss";
import DetailInfo from "../components/detailInfo";
import { useEffect, useState } from "react";
import { clientMovie } from "../client/clientMovie";

function Detail() {
  const { id } = useParams();
  const { VITE_IMG_URL_ORIGINAL } = import.meta.env;
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const fetchDetailById = async () => {
      try {
        const res = await clientMovie.get(`/movie/${id}`);
        setFilteredData(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("영화 데이터 패치 오류: ", err);
      }
    };
    fetchDetailById();
  }, [id]);

  if (!filteredData) {
    return <div>해당 영화 데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="detail_container">
      {/* 상단 data.back 이미지 */}
      <div className="detail_backImage_box">
        <img
          className="detail_backImage"
          src={VITE_IMG_URL_ORIGINAL + filteredData.backdrop_path}
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
              src={VITE_IMG_URL_ORIGINAL + filteredData.poster_path}
              alt={filteredData.title}
            />
          </div>
          <DetailInfo filteredData={filteredData} />
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
