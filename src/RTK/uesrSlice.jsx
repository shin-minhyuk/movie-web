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
      // const isFavorites
      state.favorites.push(action.payload);
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
