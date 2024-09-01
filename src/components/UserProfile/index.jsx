import userBasic from '../../assets/user-basic.jpeg'

export default function UserProfile({ setIsUserModal, userData }) {
  return (
    <div onClick={() => setIsUserModal(true)} className="header_user">
      <img
        src={userData.profile_image === '' ? userBasic : userData.profile_image}
        alt={`${userData.nickname}님의 프로필 이미지`}
      />
      <div>{userData.nickname}</div>
    </div>
  )
}
