import { Link, useLocation, useParams } from "react-router-dom";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "./Button";
import { isModal } from "../RTK/modalSlice";

export default function Header() {
  const [theme, setTheme] = useState("dark");
  const [isLogged, setIsLogged] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location);

  const getNavBgColor = (path) => {
    if (location.pathname.startsWith(path)) {
    }
  };

  const themeToggle = () => {
    const html = document.documentElement;

    if (html.classList.contains("ui-white")) {
      html.classList.remove("ui-white");
      setTheme("white");
      console.log("테마: ", theme);
    } else {
      html.classList.add("ui-white");
      setTheme("dark");
      console.log("테마: ", theme);
    }
  };

  // 헤더 bg 옵저버 트리거
  useEffect(() => {
    const header_trigger = document.querySelector(".header_trigger");
    const header = document.querySelector(".header_container");

    if (!header_trigger) return console.log("헤더가 정의되지 않음");
    else console.log(header_trigger);

    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("entering");
          header.classList.remove("header_bg");
        } else {
          console.log("leaving");
          header.classList.add("header_bg");
        }
      });
    };

    let observer = new IntersectionObserver(callback, options);
    if (header_trigger) observer.observe(header_trigger);

    return () => {
      if (header_trigger) observer.unobserve(header_trigger);
    };
  }, []);

  return (
    <>
      <header className="header_container">
        <div className="header_inner">
          <nav className="header_nav">
            <Logo />
            <Link
              className={`header_nav_link ${
                location.pathname === "/" ? "nav_bg_color" : ""
              }`}
              to="/"
            >
              홈
            </Link>
            <Link
              className={`header_nav_link ${
                location.pathname.startsWith("/detail") ? "nav_bg_color" : ""
              }`}
              to="/detail"
            >
              영화
            </Link>
            <Link
              className={`header_nav_link ${
                location.pathname.startsWith("/search") ? "nav_bg_color" : ""
              }`}
              to="/search"
            >
              검색
            </Link>
            <button onClick={themeToggle} className="header_theme_color">
              다크모드
            </button>
          </nav>
          <div className="header_auth">
            {isLogged ? null : (
              <>
                <Button
                  onClick={() => {
                    dispatch(isModal(true));
                  }}
                >
                  로그인
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
