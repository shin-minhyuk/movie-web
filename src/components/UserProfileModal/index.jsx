import { Link } from 'react-router-dom'
import { ProfileModalWrapper } from './style'

export default function UserProfileModal({
  isUserModal,
  setIsUserModal,
  onClick,
}) {
  return (
    <ProfileModalWrapper
      onClick={() => setIsUserModal(false)}
      className="header_toggle_backdrop"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`header_toggle ${isUserModal ? 'show' : ''}`}
      >
        <div>
          <Link to="/favorite">관심목록</Link>
        </div>
        <div>
          <Link to="/mypage">계정관리</Link>
        </div>
        <div onClick={onClick}>로그아웃</div>
      </div>
    </ProfileModalWrapper>
  )
}
