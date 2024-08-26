import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMovieMain } from "./RTK/thunk";
import { globalLoadingSlice } from "./RTK/globalLoadingSlice";
import Header from "./components/Header";
import GlobalLoading from "./components/GlobalLoading";
import Login from "./components/SignIn/Login";
import Footer from "./components/footer";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import DetailList from "./pages/DetailList";
import KakaoLogin from "./pages/KakaoLogin";

import "./App.scss";
import { userSlice } from "./RTK/uesrSlice";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { globalLoading } = useSelector((state) => state.globalLoading);
  const { isUser, userData } = useSelector((state) => state.user);

  // 메인페이지 데이터 패치
  useEffect(() => {
    dispatch(fetchMovieMain());
  }, []);

  // global loading 수정해야함
  useEffect(() => {
    if (
      location.pathname.startsWith("/search") ||
      location.pathname.startsWith("/auth/kakao/callback")
    )
      return;

    // 로딩중으로 바꾸고
    dispatch(globalLoadingSlice.actions.setGlobalLoading(true));

    // 1초뒤에 로딩중 아니게 변신
    setTimeout(() => {
      dispatch(globalLoadingSlice.actions.setGlobalLoading(false));
    }, 1000);
  }, [location.pathname]);

  const checkLocalStorageToken = () => {
    const kakaoToken = localStorage.getItem("KAKAO_ACCESS_TOKEN");
    const token = localStorage.getItem("ACCESS_TOKEN");

    // switch (true)라고 하면, switch 문은 true 값을 기반으로 각 case의 조건을 평가
    switch (true) {
      case !!kakaoToken: // !!kakaoToken이 true일 때 실행
        const fetchKakaoData = async () => {
          const response = await axios.get(
            "https://kapi.kakao.com/v2/user/me",
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
          const userInfo = response.data;
          dispatch(userSlice.actions.setKakaoLogin(userInfo));
          dispatch(userSlice.actions.setIsUser(true));
        };
        fetchKakaoData();
        break;
      case !!token:
        const fetchData = async () => {
          const response = await axios.get(
            "https://kapi.kakao.com/v2/user/me",
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
          const userInfo = response.data;
          dispatch(userSlice.actions.setKakaoLogin(userInfo));
          dispatch(userSlice.actions.setIsUser(true));

          const filteredData = await client.get(
            `/rest/v1/profiles?id=eq.${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
          console.log("사용자 테이블정보: ", filteredData.data[0]);
          dispatch(userSlice.actions.setLogin(filteredData.data[0]));
          dispatch(userSlice.actions.setIsUser(true));
        };
        fetchData();

        break;
      default:
        break;
    }
  };

  useEffect(() => {
    checkLocalStorageToken();
  }, []);

  //   if (
  //     localStorage.getItem("KAKAO_ACCESS_TOKEN") ||
  //     localStorage.getItem("ACCESS_TOKEN")
  //   ) {
  //     const access_token = localStorage.getItem("TOKEN");

  //     const fetchData = async () => {
  //       const userResponse = await axios.get(
  //         "https://kapi.kakao.com/v2/user/me",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${access_token}`,
  //           },
  //         }
  //       );
  //       const userInfo = userResponse.data;
  //       dispatch(userSlice.actions.setKakaoLogin(userInfo));
  //       dispatch(userSlice.actions.setIsUser(true));
  //     };
  //     fetchData();
  //   }

  return (
    <div className="App">
      {/* layout */}
      <div className="header_trigger"></div>
      <Header />
      <GlobalLoading />

      {/* route pages */}
      {globalLoading ? null : (
        <>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/detail" element={<DetailList />}></Route>
            <Route path="/detail/:id" element={<Detail />}></Route>
            <Route path="/auth/kakao/callback" element={<KakaoLogin />}></Route>
          </Routes>
          <Login />
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;
