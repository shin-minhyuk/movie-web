import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { modalSlice } from "../RTK/modalSlice";
import Button from "./Button";

export default function Header() {
  return (
    <>
      <header className="header_container">
        <div className="header_inner">
          <div className="header_nav">
            <p className="header_logo">
              Min<span>Flix</span>
            </p>
            <Link className="header_nav_link" to="/">
              홈
            </Link>
            <Link className="header_nav_link" to="/search">
              검색
            </Link>
            <button className="header_theme_color">다크모드</button>
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
