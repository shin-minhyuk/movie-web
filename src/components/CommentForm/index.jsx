import styles from './style.module.scss'
import userBasic from '../../assets/user-basic.jpeg'
import send from '../../assets/send.svg'

export default function CommentForm({ userData, value, setValue }) {
  return (
    <div className={styles.comment_sendBox}>
      <div className={styles.comment_imgBox}>
        <img
          src={
            Boolean(userData.profile_image) ? userData.profile_image : userBasic
          }
          alt={`${userData.nickname}님의 사진`}
        />
      </div>
      <div className={styles.comment_add}>
        <p>{userData.nickname}</p>
        <input
          type="text"
          name="text"
          placeholder="영화 리뷰를 작성해주세요"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {/* TODO(0902): 버튼 컴포넌트 타입 추가 필요 */}
        <button type="submit">
          <img src={send} alt="보내기 아이콘" />
          <span>작성하기</span>
        </button>
      </div>
    </div>
  )
}
