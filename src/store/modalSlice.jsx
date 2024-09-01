import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isVisible: false,
    modalType: null,
  },
  reducers: {
    setIsVisible(state, action) {
      return { ...state, isVisible: action.payload }
    },
    setModalType(state, action) {
      return { ...state, modalType: action.payload }
    },
  },
})
