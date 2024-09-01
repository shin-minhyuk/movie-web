import userBasic from '../../assets/user-basic.jpeg'
import { ProfileWrapper } from './style'

export default function UserProfile({ setIsUserModal, userData }) {
  return (
    <ProfileWrapper onClick={() => setIsUserModal(true)}>
      <img
        src={userData.profile_image === '' ? userBasic : userData.profile_image}
        alt={`${userData.nickname}님의 프로필 이미지`}
      />
      <div>{userData.nickname}</div>
    </ProfileWrapper>
  )
}
