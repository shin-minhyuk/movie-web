import { Link } from "react-router-dom";

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
            <button>로그인</button>
            <button>회원가입</button>
          </div>
        </div>
      </header>
    </>
  );
}
