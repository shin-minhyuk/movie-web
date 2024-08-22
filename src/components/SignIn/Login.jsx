import { useDispatch, useSelector } from "react-redux";
import * as Styled from "./Login.styled.js";
import { isModal } from "../../RTK/modalSlice";
import kakao from "../../assets/ico_kakao_logo.png";
import { useState } from "react";

export default function Login() {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);

  const handleClose = () => {
    dispatch(isModal(false));
    // 모달창 내렸을 때, 로그인 상태값 전부 초기화
    loginValue.email = "";
    loginValue.password = "";
    loginError.email = "";
    loginError.password = "";

    // basic isLogin value 초기화
    setIsLogin(true);
  };

  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState({
    email: "",
    password: "",
  });

  const onChangeLogin = (event) => {
    const { value, name } = event.target;
    const error = valueValidation(value, name);

    setLoginValue({
      ...loginValue,
      [name]: value,
    });

    setLoginError({
      ...loginError,
      [name]: error[name],
    });
  };

  // 유효성 검사
  const valueValidation = (value, name) => {
    // 검사를 하려면 데이터를 받아와야함, value, name을 데이터로 받아와서 유효성 검사 진행
    // 검사를 거친 데이터를 담을 변수 생성
    let outputValue = (value) => {
      return Boolean(value);
    };

    if (outputValue(value) === false) {
      return {
        [name]: `${
          name === "email" ? "이메일이" : "비밀번호가"
        } 입력되지 않았습니다.`,
      };
    }

    switch (name) {
      case "email":
        outputValue = (value) => {
          const reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
          return reg.test(value) ? "" : "이메일이 올바르지 않습니다";
        };
        break;
      case "password":
        outputValue = (value) => {
          const MIN_PASSWORD_COUNT = 5;
          if (value.length >= MIN_PASSWORD_COUNT) {
            return "";
          } else {
            return `비밀번호는 ${MIN_PASSWORD_COUNT}자리 이상이어야 합니다.`;
          }
        };
        break;
    }

    const errorMessage = outputValue(value);

    return {
      [name]: errorMessage,
    };
  };

  const disabled =
    Object.values(loginValue).every((el) => el !== "") &&
    Object.values(loginError).every((el) => el === "");
  console.log("로그인 disabled: ", disabled);

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
              <div>
                <input
                  type="email"
                  placeholder="이메일을 작성해주세요"
                  name="email"
                  autoComplete="off"
                  value={loginValue.email}
                  onChange={onChangeLogin}
                  className={loginError.email ? "error" : null}
                />
                <p>{loginError.email ? loginError.email : null}</p>
              </div>
              <div>
                <input
                  placeholder="비밀번호를 작성해주세요"
                  type="password"
                  name="password"
                  autoComplete="off"
                  onChange={onChangeLogin}
                  className={loginError.password ? "error" : null}
                />
                <p>{loginError.password ? loginError.password : null}</p>
              </div>
              <button
                disabled={!disabled}
                type="submit"
                onClick={() => setIsLogin(true)}
                style={{
                  backgroundColor: disabled ? null : "#676767",
                }}
              >
                로그인
              </button>
              <Styled.Kakao>
                <img src={kakao} />
                카카오로 3초 만에 시작하기
              </Styled.Kakao>
              <span onClick={() => setIsLogin(false)}>회원가입</span>
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
  const [inpSignUpValue, setInpSignUpValue] = useState({
    nickname: "",
    email: "",
    password: "",
    passwordRe: "",
  });
  const [inpSignUpError, setInpSignUpError] = useState({
    nickname: "",
    email: "",
    password: "",
    passwordRe: "",
  });

  // 인풋 상태 업데이트
  const onChangeSignUp = (event) => {
    const { value, name } = event.target;

    // inp상태 업데이트
    setInpSignUpValue({
      ...inpSignUpValue,
      [name]: value,
    });

    const error = signUpValidator(value, name);
    console.log(error);

    setInpSignUpError({
      ...inpSignUpError,
      [name]: error[name],
    });
  };

  // 유효성 검사
  const signUpValidator = (value, name) => {
    let outputValue = (value) => {
      return Boolean(value);
    };

    if (outputValue(value, name) === "") {
      const fieldName =
        name === "nickname"
          ? "닉네임이"
          : name === "email "
          ? "이메일이"
          : name === "password"
          ? "비밀번호가"
          : name === "passwordRe"
          ? "비밀번호가"
          : "";
      console.log("필드셋: ", fieldName);
      return {
        [name]: `${fieldName} 입력되지 않았습니다`,
      };
    }

    if (outputValue)
      // 인풋값 조건부 에러출력
      switch (name) {
        case "nickname":
          outputValue = (value) => {
            // - 2자 이상 16자 이하, 영어 또는 숫자 또는 한글로 구성
            // * 특이사항 : 한글 초성 및 모음은 허가하지 않는다.
            const reg = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
            return reg.test(value) ? "" : "닉네임이 올바르지 않습니다";
          };
          break;
        case "email":
          outputValue = (value) => {
            const reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
            return reg.test(value)
              ? ""
              : "이메일이 정해진 규칙에 올바르지 않습니다";
          };
          break;
        case "password":
          outputValue = (value) => {
            const MIN_PASSWORD_COUNT = 6;
            if (value.length >= MIN_PASSWORD_COUNT) return "";
            else
              return `비밀번호는 ${MIN_PASSWORD_COUNT}자리 이상이어야 합니다`;
          };
          break;
        case "passwordRe":
          outputValue = (value) => {
            const MIN_PASSWORD_COUNT = 6;
            if (
              value.length >= MIN_PASSWORD_COUNT &&
              value !== inpSignUpValue.password
            ) {
              return `비밀번호가 일치하지 않습니다`;
            } else if (value.length >= MIN_PASSWORD_COUNT) {
              return "";
            } else {
              return `비밀번호는 ${MIN_PASSWORD_COUNT}자리 이상이어야 합니다`;
            }
          };
          break;
      }
    // 비밀번호가 같지 않을 경우 예외처리

    const errorMessage = outputValue(value);
    console.log("에러: ", errorMessage);
    return {
      [name]: errorMessage,
    };
  };

  const disabled =
    Object.values(inpSignUpValue).every((el) => el !== "") &&
    Object.values(inpSignUpError).every((el) => el === "");
  console.log("회원가입 disabled: ", disabled);

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
          <div>
            <input
              type="text"
              name="nickname"
              placeholder="닉네임을 입력해주세요"
              value={inpSignUpValue.nickname}
              onChange={onChangeSignUp}
              className={inpSignUpError.nickname ? "error" : null}
            />
            <p>{inpSignUpError.nickname ? inpSignUpError.nickname : ""}</p>
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="이메일 (example@example.com)"
              value={inpSignUpValue.email}
              onChange={onChangeSignUp}
              className={inpSignUpError.email ? "error" : null}
            />
            <p>{inpSignUpError.email ? inpSignUpError.email : ""}</p>
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해 주세요"
              value={inpSignUpValue.password}
              onChange={onChangeSignUp}
              className={inpSignUpError.password ? "error" : null}
            />
            <p>{inpSignUpError.password ? inpSignUpError.password : ""}</p>
          </div>
          <div>
            <input
              type="password"
              name="passwordRe"
              placeholder="비밀번호를 다시 입력해 주세요"
              value={inpSignUpValue.passwordRe}
              onChange={onChangeSignUp}
              className={inpSignUpError.passwordRe ? "error" : null}
            />
            <p>{inpSignUpError.passwordRe ? inpSignUpError.passwordRe : ""}</p>
          </div>
          <button
            disabled={!disabled}
            type="submit"
            onClick={() => setIsLogin(false)}
            style={{
              backgroundColor: disabled ? null : "#676767",
            }}
          >
            회원가입
          </button>
          <Styled.Kakao>
            <img src={kakao} />
            카카오로 3초 만에 시작하기
          </Styled.Kakao>
          <span onClick={() => setIsLogin(true)}>로그인</span>
        </Styled.LoginFrom>
      </Styled.Inner>
    </Styled.Wrapper>
  );
}
