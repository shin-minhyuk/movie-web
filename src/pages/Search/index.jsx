import { useEffect, useState } from 'react'
import { clientMovie } from '../../client/clientMovie'
import Card from '../../components/Card'
import styles from './style.module.scss'

function Search() {
  const [value, setValue] = useState('')
  const [data, setData] = useState([])
  const [category, setCategory] = useState('movie')

  window.scrollTo(0, 0)

  const onChange = (event) => {
    const { value } = event.target
    setValue(value)
  }

  useEffect(() => {
    const id = setTimeout(() => {
      switch (category) {
        case 'movie':
          clientMovie
            .get(`/search/movie?query=${value}`)
            .then((res) => {
              console.log(res.data.results)
              setData(res.data.results)
            })
            .catch((err) => console.err(err))
          break

        case 'TV':
          clientMovie
            .get(`/search/tv?query=${value}`)
            .then((res) => {
              console.log(res.data.results)
              setData(res.data.results)
            })
            .catch((err) => console.err(err))
          break

        // 배우, card 컴포넌트 프롭스 타입 추가 및 추가 작성 코드 필요
        case 'actor':
          clientMovie
            .get(`/search/person?query=${value}`)
            .then((res) => {
              console.log(res.data.results)
              setData(res.data.results)
            })
            .catch((err) => console.err(err))
          break
      }
    }, 1000)

    return () => clearTimeout(id)
  }, [value])

  return (
    <>
      <div className={styles.search_container}>
        <div className={styles.search_inner}>
          <div className={styles.search_category}>
            <button
              className={category === 'movie' ? styles.btn_color : null}
              onClick={() => setCategory('movie')}
            >
              영화
            </button>
            <button
              className={category === 'TV' ? styles.btn_color : null}
              onClick={() => setCategory('TV')}
            >
              TV
            </button>
            {/* TODO(0903): 배우, card 컴포넌트 프롭스 타입 추가 및 추가 작성 코드 필요 */}
            <button
              className={category === 'actor' ? styles.btn_color : null}
              onClick={() => setCategory('actor')}
            >
              배우
            </button>
          </div>
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="보고싶은 영화를 검색해주세요"
          />
          <div className={styles.search_movie_container}>
            {data?.map((el) => (
              <Card key={el.id} movie={el} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Search
