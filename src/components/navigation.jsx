import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();

  return (
    <>
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
    </>
  );
}

export default Navigation;
