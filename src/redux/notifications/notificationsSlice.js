import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

// Khoi tao gia tri State cua mot cai Slice trong Redux
const initialState = {
  currentNotifications: null
}

// Cac hanh dong goi api (bat dong bo) va cap nhat du lieu vao Redux, dung Middleware createAsyncThunk di kem voi extraReducers
export const fetchInvitationsAPI = createAsyncThunk(
  'notifications/fetchInvitationsAPI',
  async () => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/invitations`)
    return response.data
  }
)

// API cap nhat lai status cua ban ghi invitation thanh ACCEPTED || REJECTED
export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationAPI',
  async ({ status, invitationId }) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/invitations/board/${invitationId}`, { status })
    return response.data
  }
)


// Khoi tao mot cac Slice trong kho luu tru (Redux Store)
export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  // Reducers: noi xu ly du lieu dong bo
  reducers: {
    updateCurrentNotifications: (state, action) => {
      state.currentNotifications = action.payload
    },
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null
    },
    addNotification: (state, action) => {
      // Them ban ghi invitation moi vao dau mang currentNotifications
      state.currentNotifications.unshift(action.payload)
    }
  },
  // extraReducers: noi xu ly du lieu bat dong bo
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
      let incomingInvitations = action.payload
      // Dao nguoc lai mang invitations nhan duoc, de hien thi invitation moi nhat len dau
      state.currentNotifications = Array.isArray(incomingInvitations) ? incomingInvitations.reverse() : []
    })
    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      const updatedInvitation = action.payload
      // Cap nhat lai du lieu boardInvitation trong redux (ben trong no se co status moi sau khi update)
      const getInvitation = state.currentNotifications.find(i => i._id === updatedInvitation._id)
      getInvitation.boardInvitation = updatedInvitation.boardInvitation
    })
  }
})

// Actions: la noi danh cho cac components ben duoi goi bang dispatch() toi no de cap nhat lai du lieu thong qua reducer (chay dong bo)
export const { updateCurrentNotifications, clearCurrentNotifications, addNotification } = notificationsSlice.actions

// Selectors: la noi danh cho cac components ben duoi goi bang hook useSelector() de lay du lieu tu kho redux store ra su dung
export const selectCurrentNotifications = (state) => {
  return state.notifications.currentNotifications
}

// File nay ten la notificationsSlice nhung chung ta se export mot thu ten la reducer
export const notificationsReducer = notificationsSlice.reducer
