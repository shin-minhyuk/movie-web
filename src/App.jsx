import { Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./components/Header";
import GlobalLoading from "./components/GlobalLoading";
import { globalLoadingSlice } from "./RTK/globalLoadingSlice";
import Login from "./components/SignIn/Login";
import { fetchMovieMain } from "./RTK/thunk";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  // global loading 수정해야함
  useEffect(() => {
    dispatch(globalLoadingSlice.actions.setGlobalLoading(true));

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
      <Header />
      <GlobalLoading />

      {/* route pages */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
      </Routes>
      <Login />
    </div>
  );
}

export default App;
