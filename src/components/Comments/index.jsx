import { Comment } from '../Comment'
import styles from './style.module.scss'

export default function Comments({ commentDatas }) {
  //

  return (
    <div className={styles.comments}>
      {commentDatas?.map((el) => (
        <Comment key={el.id} el={el} />
      ))}
    </div>
  )
}
