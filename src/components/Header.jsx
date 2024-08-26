import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isModal } from "../RTK/modalSlice";
import Logo from "./Logo";
import Button from "./Button";
import Navigation from "./navigation";

export default function Header() {
  const [theme, setTheme] = useState("dark");
  const { isUser, userData } = useSelector((state) => state.user);
  console.log("로그인: ", isUser);
  console.log("사용자 정보: ", userData);
  const dispatch = useDispatch();
  const [isUserModal, setIsUserModal] = useState(false);
  console.log(isUserModal);

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

  return (
    <>
      <header className="header_container">
        <div className="header_inner">
          <nav className="header_nav">
            <Logo />
            <Navigation />
            <button onClick={themeToggle} className="header_theme_color">
              다크모드
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
                    src={userData.profile_image}
                    alt={`${userData.nickname}님의 프로필 이미지`}
                  />
                  <div>{userData.nickname}</div>
                </div>
                {isUserModal && (
                  <div
                    onClick={() => setIsUserModal(false)}
                    className="header_toggle_backdrop"
                  >
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className={`header_toggle ${isUserModal ? "show" : ""}`}
                    >
                      <div>계정 설정</div>
                      <div>로그아웃</div>
                    </div>
                  </div>
                )}
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
