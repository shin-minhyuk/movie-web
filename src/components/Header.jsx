import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isModal } from "../RTK/modalSlice";
import Logo from "./Logo";
import Button from "./Button";
import Navigation from "./navigation";
import dark from "../assets/dark-mode.svg";
import white from "../assets/white-mode.svg";
import userBasic from "../assets/user-basic.jpeg";

export default function Header() {
  const [theme, setTheme] = useState("dark");
  const { isUser, userData } = useSelector((state) => state.user);
  console.log("로그인: ", isUser);
  console.log("사용자 정보: ", userData);
  const dispatch = useDispatch();
  const [isUserModal, setIsUserModal] = useState(false);

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

    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          header.classList.remove("header_bg");
        } else {
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

  const handleSignOut = () => {
    localStorage.removeItem("KAKAO_ACCESS_TOKEN");
    localStorage.removeItem("KAKAO_REFRESH_TOKEN");
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    window.location.reload();
  };

  return (
    <>
      <header className="header_container">
        <div className="header_inner">
          <nav className="header_nav">
            <Logo />
            <Navigation />
            <button onClick={themeToggle} className="header_theme_color">
              <img src={theme === "dark" ? white : dark} alt="" />
            </button>
          </nav>
          <div className="header_auth">
            {isUser ? (
              <div className="header_user_container">
                <div
                  onClick={() => setIsUserModal(true)}
                  className="header_user"
                >
                  <img
                    src={
                      userData.profile_image === ""
                        ? userBasic
                        : userData.profile_image
                    }
                    alt={`${userData.nickname}님의 프로필 이미지`}
                  />
                  <div>{userData.nickname}</div>
                </div>
                {isUserModal ? (
                  <div
                    onClick={() => setIsUserModal(false)}
                    className="header_toggle_backdrop"
                  >
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className={`header_toggle ${isUserModal ? "show" : ""}`}
                    >
                      <div>관심목록</div>
                      <div>계정관리</div>
                      <div onClick={() => handleSignOut()}>로그아웃</div>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
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
