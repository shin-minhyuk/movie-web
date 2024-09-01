import { useDispatch, useSelector } from 'react-redux'
import * as Styled from './style.js'

import kakao from '../../../assets/ico_kakao_logo.png'
import { useState } from 'react'
import { client } from '../../../client/client.js'
import { userSlice } from '../../../store/uesrSlice.jsx'
import { modalSlice } from '../../../store/modalSlice.jsx'
import SignUp from '../SignUp/index.jsx'
import CommonInput from '../CommonInput/index.jsx'
import Logo from '../../Logo/index.jsx'

export default function Login() {
  const { isVisible, modalType } = useSelector((state) => state.modal)
  const dispatch = useDispatch()
  const [isLogin, setIsLogin] = useState(true)
  const [loginValue, setLoginValue] = useState({
    email: '',
    password: '',
  })
  const [loginError, setLoginError] = useState({
    email: '',
    password: '',
  })

  const handleClose = () => {
    dispatch(modalSlice.actions.setIsVisible(false))
    // 모달창 내렸을 때, 로그인 상태값 전부 초기화
    loginValue.email = ''
    loginValue.password = ''
    loginError.email = ''
    loginError.password = ''

    // basic isLogin value 초기화
    setIsLogin(true)
  }

  const onChangeLogin = (event) => {
    const { value, name } = event.target
    const error = valueValidation(value, name)

    setLoginValue({
      ...loginValue,
      [name]: value,
    })

    setLoginError({
      ...loginError,
      [name]: error[name],
    })
  }

  // 유효성 검사
  const valueValidation = (value, name) => {
    // 검사를 하려면 데이터를 받아와야함, value, name을 데이터로 받아와서 유효성 검사 진행
    // 검사를 거친 데이터를 담을 변수 생성
    let inputValue = (value) => {
      return Boolean(value)
    }

    if (inputValue(value) === false) {
      return {
        [name]: `${
          name === 'email' ? '이메일이' : '비밀번호가'
        } 입력되지 않았습니다.`,
      }
    }

    switch (name) {
      case 'email':
        inputValue = (value) => {
          const reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
          return reg.test(value) ? '' : '이메일이 올바르지 않습니다'
        }
        break
      case 'password':
        inputValue = (value) => {
          const MIN_PASSWORD_COUNT = 5
          if (value.length >= MIN_PASSWORD_COUNT) {
            return ''
          } else {
            return `비밀번호는 ${MIN_PASSWORD_COUNT}자리 이상이어야 합니다.`
          }
        }
        break
    }

    const errorMessage = inputValue(value)

    return {
      [name]: errorMessage,
    }
  }

  const disabled =
    Object.values(loginValue).every((el) => el !== '') &&
    Object.values(loginError).every((el) => el === '')

  // 로그인 요청
  const fetchLoginPost = async () => {
    try {
      // 사용자 로그인 요청
      const response = await client.post('/auth/v1/token?grant_type=password', {
        email: loginValue.email,
        password: loginValue.password,
      })

      // 로컬스토리지 토큰 저장
      const { access_token, refresh_token, user } = response.data
      console.log(response)
      localStorage.setItem('ACCESS_TOKEN', access_token)
      localStorage.setItem('REFRESH_TOKEN', refresh_token)

      // 서버에서 받아온 데이터의 id값으로 추가저장 해놓은 테이블의 사용자 데이터(테이블) 불러오기
      const filteredData = await client.get(
        `/rest/v1/profiles?id=eq.${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      console.log('사용자 테이블정보: ', filteredData.data[0])
      dispatch(userSlice.actions.setLogin(filteredData.data[0]))
      dispatch(userSlice.actions.setIsUser(true))
      dispatch(modalSlice.actions.setIsVisible(false))
    } catch (err) {
      console.error(err)
    }
  }

  // KAKAO OAUTH URL
  const { VITE_KAKAO_REDIRECT_URI, VITE_KAKAO_REST_API_KEY } = import.meta.env
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${VITE_KAKAO_REST_API_KEY}&redirect_uri=${VITE_KAKAO_REDIRECT_URI}&prompt=select_account`

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL
  }

  return (
    <>
      {/* isModal이 true이면 isLogin이 true인지 false인지 비교를 시작 */}
      {isVisible === false ? null : modalType === 'Login' ? (
        <Styled.Wrapper className="login_container" onClick={handleClose}>
          <Styled.Inner
            className="login_inner"
            onClick={(e) => e.stopPropagation()}
          >
            <Logo />
            <Styled.LoginFrom
              onSubmit={(e) => {
                e.preventDefault()
                fetchLoginPost()
              }}
            >
              <CommonInput
                type="email"
                placeholder="이메일을 작성해주세요"
                name="email"
                value={loginValue}
                onChange={onChangeLogin}
                error={loginError}
              />
              <CommonInput
                type="password"
                placeholder="비밀번호를 작성해주세요"
                name="password"
                value={loginValue}
                onChange={onChangeLogin}
                error={loginError}
              />
              <button
                disabled={!disabled}
                type="submit"
                onClick={() => setIsLogin(true)}
                style={{
                  backgroundColor: disabled ? null : '#676767',
                }}
              >
                로그인
              </button>
              <Styled.Kakao onClick={() => handleKakaoLogin()}>
                <img src={kakao} />
                카카오로 3초 만에 시작하기
              </Styled.Kakao>
              <span
                onClick={() =>
                  dispatch(modalSlice.actions.setModalType('SignUp'))
                }
              >
                회원가입
              </span>
            </Styled.LoginFrom>
          </Styled.Inner>
        </Styled.Wrapper>
      ) : (
        <SignUp setIsLogin={setIsLogin} handleClose={handleClose} />
      )}
    </>
  )
}
