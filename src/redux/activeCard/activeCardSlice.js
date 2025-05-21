import { createSlice } from '@reduxjs/toolkit'

// Khoi tao gia tri State cua mot cai Slice trong Redux
const initialState = {
  currentActiveCard: null
}

// Khoi tao mot cac Slice trong kho luu tru (Redux Store)
export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  // Reducers: noi xu ly du lieu dong bo
  reducers: {
    updateCurrentActiveCard: (state, action) => {
      // action.payload la chuan dat ten nhan du lieu vao reducer, action.payload o day chinh la du lieu nhan duoc tu View
      const activeCard = action.payload

      // Xu ly du lieu neu can thiet
      // ...

      // Update lai du lieu cua currentActiveCard
      state.currentActiveCard = activeCard
    },
    clearCurrentActiveCard: (state) => {
      state.currentActiveCard = null
    }
  }
  // extraReducers: noi xu ly du lieu bat dong bo
})

// Actions: la noi danh cho cac components ben duoi goi bang dispatch() toi no de cap nhat lai du lieu thong qua reducer (chay dong bo)
export const { updateCurrentActiveCard, clearCurrentActiveCard } = activeCardSlice.actions

// Selectors: la noi danh cho cac components ben duoi goi bang hook useSelector() de lay du lieu tu kho redux store ra su dung
export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard
}

// File nay ten la activeCardSlice nhung chung ta se export mot thu ten la reducer
export const activeCardReducer = activeCardSlice.reducer
