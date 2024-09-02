import { useSelector } from 'react-redux'
import { clientMovie } from '../../client/clientMovie'
import { useEffect, useState } from 'react'
import Card from '../../components/Card'
import Title from '../../components/Title'
import styles from './style.module.scss'

function Favorite() {
  const { favorites } = useSelector((state) => state.favorites)
  const [filteredData, setFilteredData] = useState([])
  console.log(favorites.length)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const fetchDetailById = async (id) => {
    try {
      const { data } = await clientMovie.get(`/movie/${id}`)
      return data
    } catch (err) {
      console.error('즐겨찾기 패치에러: ', err)
    }
  }

  const fetchAll = async () => {
    const response = await Promise.all(
      favorites.map((el) => fetchDetailById(el))
    )
    setFilteredData(response)
  }

  useEffect(() => {
    fetchAll()
  }, [favorites])

  return (
    <div className={styles.search_container}>
      <div className={styles.home_inner}>
        <div>
          {/* <div className="title_box">
            <h1 className="text-[24px] ">
              내가 관심있는 영화 ({`${favorites.length}`})
            </h1>
            <div className="bg-[red] w-[100px] h-[5px]"></div>
          </div> */}
          <Title text={`내가 관심있는 영화 (${favorites.length})`} />
          <div className={styles.search_movie_container}>
            {filteredData?.map((el) => (
              <Card key={el.id} movie={el} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Favorite
