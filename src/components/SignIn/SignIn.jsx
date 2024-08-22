import { useDispatch, useSelector } from "react-redux";
import * as Styled from "./SignIn.styled.js";
import { modalSlice } from "../../RTK/modalSlice";
import Button from "../Button";
import kakao from "../../assets/ico_kakao_logo.png";

export default function Login() {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  return (
    <>
      {modal ? (
        <Styled.Wrapper
          className="login_container"
          onClick={() => dispatch(modalSlice.actions.isModal(false))}
        >
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
              <button children="로그인" type="modal" color="red"></button>
              <Styled.Kakao>
                <img src={kakao} />
                카카오로 3초 만에 시작하기
              </Styled.Kakao>
              <button children="회원가입" type="modal" color="white"></button>
            </Styled.LoginFrom>
          </Styled.Inner>
        </Styled.Wrapper>
      ) : null}
    </>
  );
}
