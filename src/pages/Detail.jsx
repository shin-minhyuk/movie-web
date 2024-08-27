import { useParams } from "react-router-dom";
import "../styles/detail.scss";
import DetailInfo from "../components/DetailInfo";
import { useEffect, useState } from "react";
import { clientMovie } from "../client/clientMovie";
import SwiperVideos from "../components/SwiperVideos";
import Card from "../components/Card";

function Detail() {
  const { id } = useParams();
  const { VITE_IMG_URL_ORIGINAL } = import.meta.env;
  const [filteredData, setFilteredData] = useState(null);
  const [videos, setVideos] = useState(null);
  const [similar, setSimilar] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchDetailById = async () => {
      try {
        const { data } = await clientMovie.get(`/movie/${id}`);

        console.log(data);
        setFilteredData(data);
      } catch (err) {
        console.error("영화 데이터 패치 오류: ", err);
      }
    };
    fetchDetailById();
  }, [id]);

  useEffect(() => {
    const fetchVideosById = async () => {
      try {
        const { data } = await clientMovie.get(`/movie/${id}/videos`);

        console.log("영화 비디오: ", data.results);
        setVideos(data.results);
      } catch (err) {
        console.error("영화 데이터 패치 오류: ", err);
      }
    };
    fetchVideosById();
  }, [id]);

  useEffect(() => {
    const fetchPostersById = async () => {
      try {
        const { data } = await clientMovie.get(`/movie/${id}/similar`);

        console.log("similar : ", data.results);
        setSimilar(data.results);
      } catch (err) {
        console.error("영화 데이터 패치 오류: ", err);
      }
    };
    fetchPostersById();
  }, [id]);

  if (!filteredData) {
    return <div>해당 영화 데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <main>
      <div
        className="detail_backImage_box"
        style={{
          backgroundImage: `url(${
            VITE_IMG_URL_ORIGINAL + filteredData.backdrop_path
          })`,
        }}
      >
        <div className="detail_backImage_backdrop"></div>
      </div>
      {/* 상세페이지 */}
      <div className="detail_main">
        {/* 섹션 1 */}
        <div className="detail_main_inner">
          <div className="detail_main_imgbox">
            <img
              className="detail_sec_img"
              src={VITE_IMG_URL_ORIGINAL + filteredData.poster_path}
              alt={filteredData.title}
            />
          </div>
          <DetailInfo filteredData={filteredData} />
        </div>
        {/* 섹션 2 */}
        <div className="home_inner">
          <div className="card_container">
            <div className="title_box">
              <h1 className="text-[24px] ">{filteredData.title} </h1>
              <div className="bg-[red] w-[100px] h-[5px]"></div>
            </div>

            <div>
              <SwiperVideos videos={videos} />
            </div>
          </div>
        </div>
        {/* 섹션 3 */}
        <div className="home_inner">
          <div className="card_container">
            <div className="title_box">
              <h1 className="text-[24px] ">추천 영화</h1>
              <div className="bg-[red] w-[100px] h-[5px]"></div>
            </div>
            <div className="search_movie_container">
              {similar.slice(0, 8).map((el) => (
                <Card key={el.id} movie={el} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Detail;
