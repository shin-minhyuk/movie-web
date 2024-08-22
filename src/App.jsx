import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMovieDataById } from "./RTK/thunk";
import axios from "axios";
import Header from "./components/Header";
import Login from "./components/Login";
import GlobalLoading from "./components/GlobalLoading";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieDataById(20));
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
