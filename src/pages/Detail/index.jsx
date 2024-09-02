import { useParams } from 'react-router-dom'
import DetailInfo from '../../components/DetailInfo'
import { useEffect, useState } from 'react'
import { clientMovie } from '../../client/clientMovie'
import { client } from '../../client/client'
import { useSelector } from 'react-redux'
import Toast, { notify } from '../../components/Toast'
import SwiperVideos from '../../components/Swiper/SwiperVideos'
import Comments from '../../components/Comments'
import CommentForm from '../../components/CommentForm'
import Title from '../../components/Title'
import DetailSectionLayout from '../../layouts/DetailSectionLayout'
import Card from '../../components/Card'
import styles from './style.module.scss'

function Detail() {
  const { id } = useParams()
  const { VITE_IMG_URL_ORIGINAL } = import.meta.env
  const [filteredData, setFilteredData] = useState(null)
  const [videos, setVideos] = useState(null)
  const [similar, setSimilar] = useState(null)
  const [comment, setComment] = useState('')
  const [commentDatas, setCommentDatas] = useState([])
  const { userData } = useSelector((state) => state.user)

  const fetchCommentDatas = async () => {
    try {
      const { data } = await client.get('/rest/v1/comments', {
        params: {
          movie_id: `eq.${id}`,
        },
      })
      console.log('댓글 데이터 응답: ', data)
      setCommentDatas(data)
    } catch (err) {
      console.error('댓글 패치 에러: ', err)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchCommentDatas()
  }, [])

  useEffect(() => {
    const fetchDetailById = async () => {
      try {
        const { data } = await clientMovie.get(`/movie/${id}`)

        console.log(data)
        setFilteredData(data)
      } catch (err) {
        console.error('영화 데이터 패치 오류: ', err)
      }
    }
    fetchDetailById()
  }, [id])

  useEffect(() => {
    const fetchVideosById = async () => {
      try {
        const { data } = await clientMovie.get(`/movie/${id}/videos`)

        console.log('영화 비디오: ', data.results)
        setVideos(data.results)
      } catch (err) {
        console.error('영화 데이터 패치 오류: ', err)
      }
    }
    fetchVideosById()
  }, [id])

  useEffect(() => {
    const fetchPostersById = async () => {
      try {
        const { data } = await clientMovie.get(`/movie/${id}/similar`)

        console.log('similar : ', data.results)
        setSimilar(data.results)
      } catch (err) {
        console.error('영화 데이터 패치 오류: ', err)
      }
    }
    fetchPostersById()
  }, [id])

  const onSubmit = (e) => {
    e.preventDefault()

    if (userData.id === '') {
      return notify({ type: 'error', text: '로그인이 필요한 서비스입니다' })
    }

    // 댓글 추가
    addComment()
    // 인풋값 초기화
    setComment('')
  }
  console.log(comment)

  // 댓글 추가 함수
  const addComment = async () => {
    // 예외처리 early return
    if (comment === '') return console.log('값이 입력되지 않았습니다')

    try {
      const response = await client.post('/rest/v1/comments', {
        user_id: userData.id,
        movie_id: id,
        comment: comment,
        nickname: userData.nickname,
      })

      console.log('코멘트 응답: ', response)
      notify({ type: 'success', text: '리뷰가 작성되었습니다' })

      fetchCommentDatas()
    } catch (err) {
      console.error('코멘트 패치 에러: ', err)
    }
  }

  if (!filteredData) {
    return <div>해당 영화 데이터를 찾을 수 없습니다.</div>
  }

  return (
    <main>
      <div
        className={styles.detail_backImage_box}
        style={{
          backgroundImage: `url(${
            VITE_IMG_URL_ORIGINAL + filteredData.backdrop_path
          })`,
        }}
      >
        <div className={styles.detail_backImage_backdrop}></div>
      </div>
      {/* 상세페이지 */}
      <div className={styles.detail_main}>
        {/* 섹션 1 */}
        <div className={styles.detail_main_inner}>
          <div className={styles.detail_main_imgbox}>
            <img
              className={styles.detail_sec_img}
              src={VITE_IMG_URL_ORIGINAL + filteredData.poster_path}
              alt={filteredData.title}
            />
          </div>
          <DetailInfo filteredData={filteredData} />
        </div>
        {/* 섹션 2 */}
        <DetailSectionLayout>
          <Title text={filteredData.title} />
          <SwiperVideos videos={videos} />
        </DetailSectionLayout>
        {/* 섹션 3 */}
        <DetailSectionLayout>
          <Title text="영화 리뷰" />
          <form onSubmit={onSubmit} className={styles.comments_container}>
            <Toast />
            <Comments commentDatas={commentDatas} />
            <CommentForm
              userData={userData}
              value={comment}
              setValue={setComment}
            />
          </form>
        </DetailSectionLayout>
        {/* 섹션 4 */}
        <DetailSectionLayout>
          <Title text="추천 영화" />
          <div className={styles.search_movie_container}>
            {similar?.slice(0, 8).map((el) => (
              <Card key={el.id} movie={el} />
            ))}
          </div>
        </DetailSectionLayout>
      </div>
    </main>
  )
}

export default Detail
