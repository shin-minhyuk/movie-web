import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Logo from '../Logo'
import Navigation from '../Navigation'
import userBasic from '../../assets/user-basic.jpeg'
import { Link } from 'react-router-dom'
import Button from '../Button'
import { HeaderWrapper } from './style'
import UserProfileModal from '../UserProfileModal'
import UserProfile from '../UserProfile'
import { modalSlice } from '../../store/modalSlice'

export default function Header() {
  const [theme, setTheme] = useState('dark')
  const { isUser, userData } = useSelector((state) => state.user)
  const [isUserModal, setIsUserModal] = useState(false)
  const html = document.documentElement
  const dispatch = useDispatch()

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      setTheme(storedTheme)
      if (storedTheme === 'white') {
        html.classList.add('ui-white')
      } else {
        html.classList.remove('ui-white')
      }
    } else {
      setTheme('dark')
      html.classList.remove('ui-white')
    }
  }, [])

  // 헤더 bg 옵저버 트리거
  useEffect(() => {
    const header_trigger = document.querySelector('.header_trigger')
    const header = document.querySelector('header')

    if (!header_trigger) return console.log('헤더가 정의되지 않음')

    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    }

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          header?.classList.remove('header_bg')
        } else {
          header?.classList.add('header_bg')
        }
      })
    }

    let observer = new IntersectionObserver(callback, options)
    if (header_trigger) observer.observe(header_trigger)

    return () => {
      if (header_trigger) observer.unobserve(header_trigger)
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem('KAKAO_ACCESS_TOKEN')
    localStorage.removeItem('KAKAO_REFRESH_TOKEN')
    localStorage.removeItem('ACCESS_TOKEN')
    localStorage.removeItem('REFRESH_TOKEN')
    window.location.reload()
  }

  const handleLoginClick = () => {
    dispatch(modalSlice.actions.setIsVisible(true))
    dispatch(modalSlice.actions.setModalType('Login'))
  }

  return (
    <>
      <HeaderWrapper>
        <div className="header_inner">
          <Navigation theme={theme} setTheme={setTheme} html={html} />
          <div className="header_auth">
            {isUser ? (
              <div className="header_user_container">
                <UserProfile
                  setIsUserModal={setIsUserModal}
                  userData={userData}
                />
                {isUserModal ? (
                  <UserProfileModal
                    isUserModal={isUserModal}
                    setIsUserModal={setIsUserModal}
                    onClick={() => handleSignOut()}
                  />
                ) : null}
              </div>
            ) : (
              <>
                <Button text="로그인" onClick={handleLoginClick}></Button>
              </>
            )}
          </div>
        </div>
      </HeaderWrapper>
    </>
  )
}
