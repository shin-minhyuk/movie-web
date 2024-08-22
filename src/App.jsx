import { Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMovieDataById } from "./RTK/thunk";
import Header from "./components/Header";
import GlobalLoading from "./components/GlobalLoading";
import { globalLoadingSlice } from "./RTK/globalLoadingSlice";
import SignIn from "./components/SignIn";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    dispatch(fetchMovieDataById(20));
  }, []);

  // global loading 수정해야함
  useEffect(() => {
    dispatch(globalLoadingSlice.actions.setGlobalLoading(true));

    setTimeout(() => {
      dispatch(globalLoadingSlice.actions.setGlobalLoading(false));
    }, 1000);
  }, [location.pathname]);

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
      <SignIn />
    </div>
  );
}

export default App;
