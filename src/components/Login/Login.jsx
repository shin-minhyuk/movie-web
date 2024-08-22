import { useDispatch, useSelector } from "react-redux";

import * as Styled from "./Login.styled";
import { modalSlice } from "../../RTK/modalSlice";
import Button from "../Button";

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
              <Button children="로그인" type="modal" color="red"></Button>
              <Button
                onClick={() => alert("작동")}
                children="회원가입"
                type="modal"
                color="white"
              ></Button>
            </Styled.LoginFrom>
          </Styled.Inner>
        </Styled.Wrapper>
      ) : null}
    </>
  );
}
