import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "uesr",
  initialState: {
    isUser: false,
    userData: {
      nickname: "",
      email: "",
      bio: "",
      profile_image: "",
    },
  },

  reducers: {
    setIsUser(state, action) {
      state.isUser = action.payload;
    },
    setKakaoLogin(state, action) {
      state.userData.nickname = action.payload.properties.nickname;
      state.userData.email = action.payload.kakao_account.email;
      state.userData.profile_image = action.payload.properties.profile_image;
    },
  },
});
