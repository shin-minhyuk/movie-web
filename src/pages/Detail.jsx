import { useParams } from "react-router-dom";
import "../styles/detail.scss";
import DetailInfo from "../components/DetailInfo";
import { useEffect, useState } from "react";
import { clientMovie } from "../client/clientMovie";
import SwiperVideos from "../components/SwiperVideos";
import Card from "../components/Card";
import { client } from "../client/client";
import { useSelector } from "react-redux";
import Toast, { notify } from "../components/toast";

function Detail() {
  const { id } = useParams();
  const { VITE_IMG_URL_ORIGINAL } = import.meta.env;
  const [filteredData, setFilteredData] = useState(null);
  const [videos, setVideos] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [comment, setComment] = useState("");
  const [commentDatas, setCommentDatas] = useState([]);

  const { userData } = useSelector((state) => state.user);

  // 영화 id값과 사용자의 id값을 대조해서 데이터를 가져온다 X
  // 특정 영화에 대한 리뷰 데이터가 필요함, 영화 데이터를 가져와서
  // 화면에 뿌릴 때, 데이터의 테이블 내용을 참조해서 ui를 구성
  // 그럼 사용자의 닉네임도 받아와야함 === 테이블 추가
  useEffect(() => {
    const fetchCommentDatas = async () => {
      try {
        const { data } = await client.get("/rest/v1/comments", {
          params: {
            movie_id: `eq.${id}`,
          },
        });
        console.log("댓글 데이터 응답: ", data);
        setCommentDatas(data);
      } catch (err) {
        console.error("댓글 패치 에러: ", err);
      }
    };
    fetchCommentDatas();
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

  /**
   *  테이블 : id(댓글번호), movie_id(영화id), user_id(사용자id), comment(댓글내용), created_at(작성시간)
      댓글 작성 후, submit 이벤트가 발생하면
      client.post("/rest/v1/테이블이름", {
        user_id: userId,
        movie_id: movie.id,
        comment: inputValue,
      })

      detail/:id 페이지에 입장했을 때, 서버에서 id값을 기반으로 데이터를 불러와서
      화면에 뿌려주는 작업이 필요함

      댓글이 작성되면, 리렌더가 발생해야함

      댓글을 작성했을 때, value가 없으면 반려
   * 
   */
  const onSubmit = (e) => {
    e.preventDefault();

    if (userData.id === "") {
      return notify({ type: "error", text: "로그인이 필요한 서비스입니다" });
    }

    addComment();
    // 값 초기화
    setComment("");
  };
  console.log(comment);

  // 댓글 추가 함수
  const addComment = async () => {
    // 예외처리 early return
    if (comment === "") return console.log("값이 입력되지 않았습니다");

    try {
      const response = await client.post("/rest/v1/comments", {
        user_id: userData.id,
        movie_id: id,
        comment: comment,
        nickname: userData.nickname,
      });

      console.log("코멘트 응답: ", response);
      notify({ type: "success", text: "리뷰가 작성되었습니다" });
    } catch (err) {
      console.error("코멘트 패치 에러: ", err);
    }
  };

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
              <h1 className="text-[24px] ">영화 리뷰</h1>
              <div className="bg-[red] w-[100px] h-[5px]"></div>
            </div>

            <form onSubmit={onSubmit} className="comments_container">
              <Toast />
              <div className="comments">
                {commentDatas?.map((el) => (
                  <div className="comment">
                    <p>{el.nickname}</p>
                    <p>{el.content}</p>
                    <p>{el.created_at.slice(0, 9)}</p>
                  </div>
                ))}
              </div>
              <input
                type="text"
                name="text"
                placeholder="영화 리뷰를 작성해주세요"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button type="submit">추가</button>
            </form>
          </div>
        </div>
        {/* 섹션 4 */}
        <div className="home_inner">
          <div className="card_container">
            <div className="title_box">
              <h1 className="text-[24px] ">추천 영화</h1>
              <div className="bg-[red] w-[100px] h-[5px]"></div>
            </div>
            <div className="search_movie_container">
              {similar?.slice(0, 8).map((el) => (
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
