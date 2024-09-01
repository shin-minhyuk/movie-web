import { configureStore } from '@reduxjs/toolkit'
import { movieMainSlice } from './movieSlice'

import { globalLoadingSlice } from './globalLoadingSlice'
import { favoritesSlice, userSlice } from './uesrSlice'
import { modalSlice } from './modalSlice'

export const store = configureStore({
  reducer: {
    movieMain: movieMainSlice.reducer,
    modal: modalSlice.reducer,
    globalLoading: globalLoadingSlice.reducer,
    user: userSlice.reducer,
    favorites: favoritesSlice.reducer,
  },
})
