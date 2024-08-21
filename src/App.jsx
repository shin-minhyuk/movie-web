import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDataById } from "./RTK/thunk";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieDataById(20));
  }, []);

  return (
    <div className="App">
      {/* layout */}
      <Header />

      {/* route pages */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/detail:id" element={<Detail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
