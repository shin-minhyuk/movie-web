import { useSelector } from 'react-redux'
import SwiperMain from '../../components/Swiper/SwiperMain'
import SwiperSection from '../../components/Swiper/SwiperSection'
import styles from './style.module.scss'

import './style.module.scss'

function Home() {
  // 메인 페이지 데이터
  const { now_playing, popular, top_rated, upcoming, loading } = useSelector(
    (state) => state.movieMain
  )

  return (
    <main className={styles.home_container}>
      <div>
        <SwiperMain filteredData={now_playing} />
      </div>
      <div className={styles.home_inner}>
        <SwiperSection movies={now_playing} title={'현재 상영중'} />
        <SwiperSection movies={top_rated} title={'랭킹 TOP 20'} />
        <SwiperSection movies={upcoming} title={'개봉 예정'} />
        <SwiperSection movies={popular} title={'인기순'} />
      </div>
    </main>
  )
}

export default Home
