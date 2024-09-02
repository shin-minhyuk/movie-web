import { Route, Routes, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchMovieMain } from './store/thunk'
import { globalLoadingSlice } from './store/globalLoadingSlice'
import GlobalLoading from './components/GlobalLoading'

import Footer from './components/footer'
import Home from './pages/Home'
import Search from './pages/Search'
import Detail from './pages/Detail'
import DetailList from './pages/DetailList'
import KakaoLogin from './pages/KakaoLogin'

import './App.scss'
import { favoritesSlice, userSlice } from './store/uesrSlice'
import axios from 'axios'
import { client } from './client/client'
import Favorite from './pages/Favorite'
import MyPage from './pages/Mypage'
import Header from './components/Header'
import Login from './components/auth/Login'

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const { globalLoading } = useSelector((state) => state.globalLoading)
  const { userData } = useSelector((state) => state.user)
  const userId = userData.id

  // 메인페이지 데이터 패치
  useEffect(() => {
    dispatch(fetchMovieMain())
  }, [])

  useEffect(() => {
    if (
      location.pathname.startsWith('/search') ||
      location.pathname.startsWith('/auth/kakao/callback')
    )
      return

    // 로딩중으로 바꾸고
    dispatch(globalLoadingSlice.actions.setGlobalLoading(true))

    // 1초뒤에 로딩중 아니게 변신
    setTimeout(() => {
      dispatch(globalLoadingSlice.actions.setGlobalLoading(false))
    }, 1000)
  }, [location.pathname])

  // 로컬스토리지 토큰 확인 및 사용자 정보 업데이트
  const checkLocalStorageToken = async () => {
    const kakaoToken = localStorage.getItem('KAKAO_ACCESS_TOKEN')
    const token = localStorage.getItem('ACCESS_TOKEN')

    // 카카오 토큰이 있는 경우
    if (!!kakaoToken) {
      const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${kakaoToken}`,
        },
      })
      const userInfo = response.data
      dispatch(userSlice.actions.setKakaoLogin(userInfo))
      dispatch(userSlice.actions.setIsUser(true))

      // 카카오 토큰이 있으면, 이메일 토큰들은 무조건 삭제
      localStorage.removeItem('ACCESS_TOKEN')
      localStorage.removeItem('REFRESH_TOKEN')

      // 이메일 로그인인 경우
    } else if (!!token) {
      const { data } = await client.get('/auth/v1/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const { id } = data

      const filteredData = await client.get(`/rest/v1/profiles?id=eq.${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch(userSlice.actions.setLogin(filteredData.data[0]))
      dispatch(userSlice.actions.setIsUser(true))
    } else {
      console.log('액세스 토큰을 찾을 수 없습니다')
    }
  }

  // 서버에서 즐겨찾기 목록을 가져오는 함수
  const fetchFavorites = async () => {
    if (userId === '') return console.log('아이디를 찾을 수 없습니다')

    try {
      const { data } = await client.get('/rest/v1/favorites', {
        params: {
          user_id: `eq.${userId}`,
        },
      })

      if (data)
        dispatch(
          favoritesSlice.actions.setFavorites(data.map((el) => el.item_id))
        )
      console.log(
        '즐겨찾기 함수 실행됨 ',
        data.map((el) => el.item_id)
      )
    } catch (err) {
      console.error('즐겨찾기 목록 에러: ', err)
    }
  }

  useEffect(() => {
    const initialize = async () => {
      await checkLocalStorageToken()
    }
    initialize()
  }, [])

  useEffect(() => {
    fetchFavorites()
  }, [userId])

  return (
    <div className="App">
      {/* layout */}
      <div className="header_trigger"></div>
      <Header />
      <GlobalLoading />

      {/* route pages */}
      {globalLoading ? null : (
        <>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/detail" element={<DetailList />}></Route>
            <Route path="/detail/:id" element={<Detail />}></Route>
            <Route path="/auth/kakao/callback" element={<KakaoLogin />}></Route>
            <Route path="/favorite" element={<Favorite />}></Route>
            <Route path="/mypage" element={<MyPage />}></Route>
          </Routes>
          <Login />
        </>
      )}
      <Footer />
    </div>
  )
}

export default App
