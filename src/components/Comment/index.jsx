import styles from './style.module.scss'
import userBasic from '../../assets/user-basic.jpeg'

export function Comment({ el }) {
  return (
    <div key={el.id} className={styles.comment}>
      <div className={styles.comment_imgBox}>
        <img
          src={Boolean(el.profile_image) ? el.profile_image : userBasic}
          alt={`${el.nickname}님의 사진`}
        />
      </div>
      <div className={styles.comment_content}>
        <p>{el.nickname}</p>
        <p>
          {new Date(el.created_at).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </p>
        <p>{el.comment}</p>
      </div>
    </div>
  )
}
