import { useDispatch, useSelector } from "react-redux";
import * as Styled from "./Login.styled.js";
import { isModal } from "../../RTK/modalSlice";
import kakao from "../../assets/ico_kakao_logo.png";
import { useState } from "react";

export default function Login() {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  console.log(isLogin);

  const handleClose = () => dispatch(isModal(false));

  return (
    <>
      {/* isModal이 true이면 isLogin이 true인지 false인지 비교를 시작 */}
      {modal.isModal === false ? null : isLogin ? (
        <Styled.Wrapper className="login_container" onClick={handleClose}>
          <Styled.Inner
            className="login_inner"
            onClick={(e) => e.stopPropagation()}
          >
            <h1>
              Min<span style={{ color: "red" }}>Flix</span>
            </h1>
            <Styled.LoginFrom onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="이메일을 작성해주세요"
                name="email"
                autoComplete="off"
              />
              <input
                placeholder="비밀번호를작성해주세요"
                type="password"
                name="password"
                autoComplete="off"
              />
              <button type="submit" onClick={() => setIsLogin(true)}>
                로그인
              </button>
              <Styled.Kakao>
                <img src={kakao} />
                카카오로 3초 만에 시작하기
              </Styled.Kakao>
              <div onClick={() => setIsLogin(false)}>회원가입</div>
            </Styled.LoginFrom>
          </Styled.Inner>
        </Styled.Wrapper>
      ) : (
        <SignUp setIsLogin={setIsLogin} handleClose={handleClose} />
      )}
    </>
  );
}

function SignUp({ setIsLogin, handleClose }) {
  return (
    <Styled.Wrapper className="login_container" onClick={handleClose}>
      <Styled.Inner
        className="login_inner"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>
          Min<span style={{ color: "red" }}>Flix</span>
        </h1>
        <Styled.LoginFrom onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="이메일을 입력해주세요" />
          <input type="password" />
          <input type="email" />
          <button type="submit" onClick={() => setIsLogin(false)}>
            회원가입
          </button>
          <Styled.Kakao>
            <img src={kakao} />
            카카오로 3초 만에 시작하기
          </Styled.Kakao>
          <div onClick={() => setIsLogin(true)}>로그인</div>
        </Styled.LoginFrom>
      </Styled.Inner>
    </Styled.Wrapper>
  );
}
