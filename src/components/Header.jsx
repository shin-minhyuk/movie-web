import { Link } from "react-router-dom";
import { modalSlice } from "../RTK/modalSlice";
import Logo from "./Logo";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "./Button";

export default function Header() {
  const [theme, setTheme] = useState("dark");
  const dispatch = useDispatch();

  const themeToggle = () => {
    const html = document.documentElement;

    if (html.classList.contains("ui-white")) {
      html.classList.remove("ui-white");
      setTheme("white");
    } else {
      html.classList.add("ui-white");
      setTheme("dark");
    }
    console.log(html.classList);
  };

  return (
    <>
      <header className="header_container">
        <div className="header_inner">
          <div className="header_nav">
            <Logo />
            <Link className="header_nav_link" to="/">
              홈
            </Link>
            <Link className="header_nav_link" to="/search">
              검색
            </Link>
            <button onClick={themeToggle} className="header_theme_color">
              다크모드
            </button>
          </div>
          <div className="header_auth">
            <Button
              onClick={() => {
                dispatch(modalSlice.actions.isModal(true));
              }}
            >
              로그인
            </Button>
            <Button>회원가입</Button>
          </div>
        </div>
      </header>
    </>
  );
}
