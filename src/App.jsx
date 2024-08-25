import { Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import GlobalLoading from "./components/GlobalLoading";
import { globalLoadingSlice } from "./RTK/globalLoadingSlice";
import Login from "./components/SignIn/Login";
import { fetchMovieMain } from "./RTK/thunk";
import DetailList from "./pages/DetailList";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { globalLoading } = useSelector((state) => state.globalLoading);

  // global loading 수정해야함
  useEffect(() => {
    if (location.pathname.startsWith("/search")) return;

    // 로딩중으로 바꾸고
    dispatch(globalLoadingSlice.actions.setGlobalLoading(true));

    // 1초뒤에 로딩중 아니게 변신
    setTimeout(() => {
      dispatch(globalLoadingSlice.actions.setGlobalLoading(false));
    }, 1000);
  }, [location.pathname]);

  // 메인페이지 데이터 패치
  useEffect(() => {
    dispatch(fetchMovieMain());
    console.log("실행됨");
  }, []);

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
          </Routes>
          <Login />
        </>
      )}
    </div>
  );
}

export default App;
