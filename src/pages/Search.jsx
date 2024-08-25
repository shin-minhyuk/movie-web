import { useEffect, useState } from "react";
import { clientMovie } from "../client/clientMovie";
import Card from "../components/Card";

import "../styles/search.scss";
import "../styles/home.scss";

function Search() {
  /**
   * input change가 발생할 때, 마지막 이벤트 기준으로 n초 뒤에 데이터를 불러와야함
   * onChange 이벤트 => 검색을 할 때, url이 바뀜,
   *  */
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("movie");

  const onChange = (event) => {
    const { value } = event.target;
    setValue(value);
  };

  useEffect(() => {
    const id = setTimeout(() => {
      switch (category) {
        case "movie":
          console.log("movie case 실행");

          clientMovie
            .get(`/search/movie?query=${value}`)
            .then((res) => {
              console.log(res.data.results);
              setData(res.data.results);
            })
            .catch((err) => console.err(err));
          break;

        case "TV":
          console.log("TV case 실행");

          clientMovie
            .get(`/search/tv?query=${value}`)
            .then((res) => {
              console.log(res.data.results);
              setData(res.data.results);
            })
            .catch((err) => console.err(err));
          break;
        case "actor":
          console.log("actor case 실행");

          clientMovie
            .get(`/search/person?query=${value}`)
            .then((res) => {
              console.log(res.data.results);
              setData(res.data.results);
            })
            .catch((err) => console.err(err));
          break;
      }
    }, 1000);

    return () => clearTimeout(id);
  }, [value]);

  return (
    <>
      <div className="search_container">
        <div className="search_inner">
          <div className="search_category">
            <button
              className={category === "movie" ? "btn_color" : null}
              onClick={() => setCategory("movie")}
            >
              영화
            </button>
            <button
              className={category === "TV" ? "btn_color" : null}
              onClick={() => setCategory("TV")}
            >
              TV
            </button>
            {/* 배우, card 컴포넌트 프롭스 타입 추가 및 추가 작성 코드 필요 */}
            <button
              className={category === "actor" ? "btn_color" : null}
              onClick={() => setCategory("actor")}
            >
              배우
            </button>
          </div>
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="보고싶은 영화를 검색해주세요"
          />
          <div className="search_movie_container">
            {data?.map((el) => (
              <Card key={el.id} movie={el} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
