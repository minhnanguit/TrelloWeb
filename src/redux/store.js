import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from './activeBoard/activeBoardSlice'
import { userReducer } from './user/userSlice'

/** Cau hinh Redux Persist */
import { combineReducers } from 'redux' // redux co san trong node_modules khi cai @reduxjs/toolkit
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // mac dinh noi luu tru du lieu la localstorage


// Cau hinh persist
const rootPersistConfig = {
  key: 'root', // key cua persist do chung ta chi dinh, de mac dinh la root
  storage: storage, // storage import o tren, luu vao localstorage
  whitelist: ['user'] // dinh nghia cac slice du lieu duoc phep duy tri (luu vao localstorage) qua moi lan f5 trinh duyet
  // blacklist: ['user'] // dinh nghia cac slice du lieu kh duoc phep duy tri qua moi lan f5 trinh duyet
}

// Combine cac reducers trong du an o day
const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: userReducer
})

// Thuc hien persist reducer
const persistedReducer = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,

  // Fix warning error when implement redux-persist
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})
