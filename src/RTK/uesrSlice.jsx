import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "uesr",
  initialState: {
    isUser: false,
    userData: {
      id: "",
      nickname: "",
      email: "",
      bio: "",
      profile_image: "",
    },
  },

  reducers: {
    setIsUser: (state, action) => {
      state.isUser = action.payload;
    },
    setKakaoLogin: (state, action) => {
      state.userData.id = action.payload.id;
      state.userData.nickname = action.payload.properties.nickname;
      state.userData.email = action.payload.kakao_account.email;
      state.userData.profile_image = action.payload.properties.profile_image;
    },
    setLogin: (state, action) => {
      state.userData.id = action.payload.id;
      state.userData.nickname = action.payload.nickname;
      state.userData.email = action.payload.email;
      state.userData.bio = action.payload.bio;
      state.userData.profile_image = action.payload.profile_image;
    },
  },
});

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      const isFavorites = state.favorites.some((el) => el === action.payload);

      // 서버에서도 테이블에 같은 내용이 들어오지 않도록 방어처리를 했지만
      // 클라이언트에서도 조건을 걸어서 favorite 상태라면 push가 되지 않도록 설계
      if (!isFavorites) state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (el) => el.item_id !== action.payload.item_id
      );
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
});
