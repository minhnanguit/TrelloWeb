import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

// Khoi tao gia tri State cua mot cai Slice trong Redux
const initialState = {
  currentUser: null
}

// Cac hanh dong goi api (bat dong bo) va cap nhat du lieu vao Redux, dung Middleware createAsyncThunk di kem voi extraReducers
export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)
    return response.data
  }
)

export const logoutUserAPI = createAsyncThunk(
  'user/logoutUserAPI',
  async (showSuccessMessage = true) => {
    const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/users/logout`)
    if (showSuccessMessage) {
      toast.success('Logged out successfully!')
    }
    return response.data
  }
)

export const updateUserAPI = createAsyncThunk(
  'user/updateUserAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/update`, data)
    return response.data
  }
)

// Khoi tao mot cac Slice trong kho luu tru (Redux Store)
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // Reducers: noi xu ly du lieu dong bo
  reducers: {},
  // extraReducers: noi xu ly du lieu bat dong bo
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      // action.payload o day chinh la response.data tra ve o tren khi call API
      const user = action.payload

      // Xu ly du lieu (neu co)

      // Update lai du lieu cua currentUser vao Redux
      state.currentUser = user
    })
    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      /**
       * API logout sau khi goi thanh cong se clear thong tin currentUser ve null
       * Ket hop ProtectedRoute o App.js => dieu huong ve trang login
       */
      state.currentUser = null
    })
    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      const updatedUser = action.payload
      state.currentUser = updatedUser
    })
  }
})

// Actions: la noi danh cho cac components ben duoi goi bang dispatch() toi no de cap nhat lai du lieu thong qua reducer (chay dong bo)
// export const {} = userSlice.actions

// Selectors: la noi danh cho cac components ben duoi goi bang hook useSelector() de lay du lieu tu kho redux store ra su dung
export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

// File nay ten la activeBoardSlice nhung chung ta se export mot thu ten la reducer de ben store su dung
export const userReducer = userSlice.reducer
