import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModal: false,
  },
  reducers: {
    isModal(state, action) {
      return { ...state, isModal: action.payload }
    },
  },
})
