import * as Styled from '../Login/style.js'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import kakao from '../../../assets/ico_kakao_logo.png'
import '../Login/style.js'
import { modalSlice } from '../../../store/modalSlice.jsx'
import CommonInput from '../CommonInput/index.jsx'
import { client } from '../../../client/client.js'
import { userSlice } from '../../../store/uesrSlice.jsx'

export default function SignUp({ setIsLogin }) {
  const dispatch = useDispatch()

  const [inpSignUpValue, setInpSignUpValue] = useState({
    nickname: '',
    email: '',
    password: '',
    passwordRe: '',
  })
  const [inpSignUpError, setInpSignUpError] = useState({
    nickname: '',
    email: '',
    password: '',
    passwordRe: '',
  })

  // 인풋 상태 업데이트
  const onChangeSignUp = (event) => {
    const { value, name } = event.target

    // inp상태 업데이트
    setInpSignUpValue({
      ...inpSignUpValue,
      [name]: value,
    })

    // // => 반환값이 객체 재귀함수 아마도?
    const error = signUpValidator(value, name)

    console.log(error)

    setInpSignUpError({
      ...inpSignUpError,
      [name]: error[name],
    })
  }

  // 유효성 검사
  const signUpValidator = (value, name) => {
    let inputValue = (value) => {
      return Boolean(value)
    }

    if (inputValue(value, name) === '') {
      const fieldName =
        name === 'nickname'
          ? '닉네임이'
          : name === 'email '
          ? '이메일이'
          : name === 'password'
          ? '비밀번호가'
          : name === 'passwordRe'
          ? '비밀번호가'
          : ''
      console.log('필드셋: ', fieldName)
      return {
        [name]: `${fieldName} 입력되지 않았습니다`,
      }
    }

    if (inputValue)
      // 인풋값 조건부 에러출력
      switch (name) {
        case 'nickname':
          inputValue = (value) => {
            // - 2자 이상 16자 이하, 영어 또는 숫자 또는 한글로 구성
            // * 특이사항 : 한글 초성 및 모음은 허가하지 않는다.
            const reg = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/
            return reg.test(value) ? '' : '닉네임이 올바르지 않습니다'
          }
          break
        case 'email':
          inputValue = (value) => {
            const reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
            return reg.test(value)
              ? ''
              : '이메일이 정해진 규칙에 올바르지 않습니다'
          }
          break
        case 'password':
          inputValue = (value) => {
            const MIN_PASSWORD_COUNT = 6
            if (value.length >= MIN_PASSWORD_COUNT) return ''
            else return `비밀번호는 ${MIN_PASSWORD_COUNT}자리 이상이어야 합니다`
          }
          break
        case 'passwordRe':
          inputValue = (value) => {
            const MIN_PASSWORD_COUNT = 6
            // 수정해보면 분명 더 이해하기 쉬운 코드가 있을것임
            if (
              value.length >= MIN_PASSWORD_COUNT &&
              value !== inpSignUpValue.password
            ) {
              return `비밀번호가 일치하지 않습니다`
            } else if (value.length >= MIN_PASSWORD_COUNT) {
              return ''
            } else {
              return `비밀번호는 ${MIN_PASSWORD_COUNT}자리 이상이어야 합니다`
            }
          }
          break
      }
    // 비밀번호가 같지 않을 경우 예외처리

    const errorMessage = inputValue(value)
    console.log('에러: ', errorMessage)
    return {
      [name]: errorMessage,
    }
  }

  const fetchSignUpPost = async () => {
    // 회원가입 신청
    try {
      const response = await client.post('/auth/v1/signup', {
        email: inpSignUpValue.email,
        password: inpSignUpValue.password,
      })

      const { data, error } = response

      // 디버깅: 혹시나 상단 비동기 작업에서 에러가 나면 아래 코드를 실행하지 않고 바로 error 던지기
      if (error) {
        throw new Error(`회원가입 에러: ${error.message}`)
      }

      // userId => uuid로 저장됨
      const userId = data.user.id

      // 프로필 테이블에 따로 데이터 저장
      const profileResponse = await client.post('/rest/v1/profiles', {
        id: userId,
        email: inpSignUpValue.email,
        password: inpSignUpValue.password,
        nickname: inpSignUpValue.nickname,
        profile_image: '',
        bio: '',
      })

      console.log('userId: ', userId)
      console.log('회원가입 성공: ', response)
      console.log('프로필 저장: ', profileResponse)
      // 로컬스토리지 액세스 토큰, 리프레시 토큰 저장
      const { access_token, refresh_token } = response.data
      localStorage.setItem('ACCESS_TOKEN', access_token)
      localStorage.setItem('REFRESH_TOKEN', refresh_token)

      // 모달 상태 변경, 로그인 상태 업데이트 (전역)
      dispatch(modalSlice.actions.setIsVisible(false))

      // 로그인 상태 조건에 따라 헤더 로그인 버튼 컴포넌트 유저 UI 변경
      dispatch(userSlice.actions.setIsUser(true))
    } catch (error) {
      console.error(error)
    }
  }

  // 버튼 활성화 조건
  const disabled =
    Object.values(inpSignUpValue).every((el) => el !== '') &&
    Object.values(inpSignUpError).every((el) => el === '')

  // 모달창 내렸을 때, 로그인 상태값 전부 초기화
  const handleClose = () => {
    dispatch(modalSlice.actions.setIsVisible(false))
    inpSignUpValue.email = ''
    inpSignUpValue.password = ''
    inpSignUpValue.email = ''
    inpSignUpValue.password = ''

    // basic isLogin value 초기화
    setIsLogin(true)
  }

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL
  }

  return (
    <Styled.Wrapper className="login_container" onClick={handleClose}>
      <Styled.Inner
        className="login_inner"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <h1>
          Min<span style={{ color: 'red' }}>Flix</span>
        </h1>
        <Styled.LoginFrom
          onSubmit={(e) => {
            e.preventDefault()
            fetchSignUpPost()
          }}
        >
          <CommonInput
            placeholder="닉네임을 입력해주세요"
            name="nickname"
            value={inpSignUpValue}
            error={inpSignUpError}
            onChange={onChangeSignUp}
          />
          <CommonInput
            placeholder="이메일 (example@example.com)"
            name="email"
            type="email"
            value={inpSignUpValue}
            error={inpSignUpError}
            onChange={onChangeSignUp}
          />
          <CommonInput
            placeholder="비밀번호를 입력해 주세요"
            name="password"
            type="password"
            value={inpSignUpValue}
            error={inpSignUpError}
            onChange={onChangeSignUp}
          />
          <CommonInput
            placeholder="비밀번호를 다시 입력해 주세요"
            name="passwordRe"
            type="password"
            value={inpSignUpValue}
            error={inpSignUpError}
            onChange={onChangeSignUp}
          />

          <button
            disabled={!disabled}
            type="submit"
            onClick={() => setIsLogin(false)}
            style={{
              backgroundColor: disabled ? null : '#676767',
            }}
          >
            회원가입
          </button>
          <Styled.Kakao onClick={() => handleKakaoLogin()}>
            <img src={kakao} />
            카카오로 3초 만에 시작하기
          </Styled.Kakao>
          <span
            onClick={() => dispatch(modalSlice.actions.setModalType('Login'))}
          >
            로그인
          </span>
        </Styled.LoginFrom>
      </Styled.Inner>
    </Styled.Wrapper>
  )
}
