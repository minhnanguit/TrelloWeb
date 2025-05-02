import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { isEmpty } from 'lodash'
import { API_ROOT } from '~/utils/constants'
import { generatePlaceholderCard } from '~/utils/generatePlaceholderCard'
import { mapOrder } from '~/utils/sorts'

// Khoi tao gia tri State cua mot cai Slice trong Redux
const initialState = {
  currentActiveBoard: null
}

// Cac hanh dong goi api (bat dong bo) va cap nhat du lieu vao Redux, dung Middleware createAsyncThunk di kem voi extraReducers
export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {
    const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
    return response.data
  }
)

// Khoi tao mot cac Slice trong kho luu tru (Redux Store)
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  // Reducers: noi xu ly du lieu dong bo
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      // action.payload la chuan dat ten nhan du lieu vao reducer
      const board = action.payload

      // Xu ly du lieu neu can thiet
      // ...

      // Update lai du lieu cua currentActiveBoard
      state.currentActiveBoard = board
    }
  },
  // extraReducers: noi xu ly du lieu bat dong bo
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      // action.payload o day chinh la response.data tra ve o tren khi call API
      let board = action.payload

      // Xu ly du lieu (neu co)
      // Sap xep columns luon o day truoc khi truyen xuong components con
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach(column => {
        // Khi f5 lai trang web thi can tao mot placeholder card cua column do
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          // Sap xep cards luon o day truoc khi truyen xuong components con
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })

      // Update lai du lieu cua currentActiveBoard vao Redux
      state.currentActiveBoard = board
    })
  }
})

// Actions: la noi danh cho cac components ben duoi goi bang dispatch() toi no de cap nhat lai du lieu thong qua reducer (chay dong bo)
export const { updateCurrentActiveBoard } = activeBoardSlice.actions

// Selectors: la noi danh cho cac components ben duoi goi bang hook useSelector() de lay du lieu tu kho redux store ra su dung
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}

// File nay ten la activeBoardSlice nhung chung ta se export mot thu ten la reducer
export const activeBoardReducer = activeBoardSlice.reducer
