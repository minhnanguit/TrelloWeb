import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '~/utils/formatters'
import { logoutUserAPI } from '~/redux/user/userSlice'
import { refreshTokenAPI } from '~/apis'

// /**
//  * Khong the import { store } from '~/redux/store' theo cach thuong thuong o day vi no chi dung cho file jsx, con file js thi kh
//  * Giai phap: Inject Store: la ky thuat khi can su dung bien redux store o cac file ngoai pham vi component (nhu file authorizeAxios hien tai)
//  * Khi ung dung bat dau chay len, code se chay vao main.jsx dau tien, tu ben do chung ta goi ham injectStore de gan bien mainStore vao bien axiosReduxStore cuc bo trong file nay
//  */
let axiosReduxStore
export const injectStore = (mainStore) => {
  axiosReduxStore = mainStore
}


// Khoi tao mot doi tuong Axios (authorizedAxiosInstance) muc dich de custom va cau hinh chung cho du an
let authorizedAxiosInstance = axios.create()
// Thoi gian doi toi da cua 1 request: 10 phut
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10
// withCredentials: cho phep cac axios tu dong gui cookie trong moi request len BE
// (phuc vu viec chung ta se luu JWT tokens (refresh & access) vao trong httpOnly Cookie cua trinh duyet)
authorizedAxiosInstance.defaults.withCredentials = true


/* Cau hinh Interceptors (Bo danh chan vao giua moi Request & Response) */
// Interceptor Request: can thiep vao giua cac cai request API
authorizedAxiosInstance.interceptors.request.use((config) => {
  // Chan spam click
  interceptorLoadingElements(true)

  return config
}, (error) => {
  return Promise.reject(error)
})


// Khoi tao mot cai Promise cho viec goi API refresh_token
// Muc dich tao Promise nay de khi nao goi API refresh_token xong thi moi retry lai cac API bi loi truoc do
let refreshTokenPromise = null


// Interceptor Response: can thiep vao giua cac cai response nhan ve
authorizedAxiosInstance.interceptors.response.use((response) => {
  // Chan spam click
  interceptorLoadingElements(false)

  return response
}, (error) => {
  // Moi ma http status code nam ngoai khoang 200-299 se la error va roi vao day
  // Chan spam click
  interceptorLoadingElements(false)

  /** Xu ly refresh token tu dong */
  // Truong hop 1: Neu nhu nhan ma 401 tu BE, thi goi API dang xuat luon
  if (error.response?.status === 401) {
    axiosReduxStore.dispatch(logoutUserAPI(false))
  }

  // Truong hop 2: Neu nhu nhan ma 410 tu BE, thi goi API refresh_token de lam moi lai accessToken
  // Dau tien lay duoc cac request API dang bi loi (accessToken het han) thong qua error.config
  const originalRequests = error.config
  if (error.response?.status === 410 && !originalRequests._retry) {
    // Gan them mot gia tri _retry luon = true trong khoang thoi gian cho, dam bao viec refresh token nay chi luon goi 1 lan tai 1 thoi diem
    originalRequests._retry = true

    // Kiem tra xem neu chua co refreshTokenPromise thi thuc hien gan viec goi api refresh_token cho cai refreshTokenPromise
    if (!refreshTokenPromise) {
      refreshTokenPromise = refreshTokenAPI()
        .then((data) => {
          // accessToken da nam trong http only cookie (xu ly phia BE)
          return data.accessToken
        })
        .catch(() => {
          // Neu nhan bat ky loi nao tu api refresh token thi cho logout luon
          axiosReduxStore.dispatch(logoutUserAPI(false))
        })
        .finally(() => {
          // Du API co thanh cong hay loi thi van luon gan lai refreshTokenPromise ve null nhu ban dau
          refreshTokenPromise = null
        })
    }

    // Can return truong hop refreshTokenPromise chay thanh cong va xu ly them o day
    // eslint-disable-next-line no-unused-vars
    return refreshTokenPromise.then(accessToken => {
      /**
       * Buoc 1: Doi voi truong hop neu du an can luu accessToken vao localStorage hoac dau do thi se xu ly them o day
       * Hien tai o day kh can buoc 1 nay vi chung ta da dua accessToken vao cookie (xu ly phia BE) sau khi API refreshToken duoc goi thanh cong
       */

      // Buoc 2: Return lai axios instance cua chung ta ket hop cac originalRequests de goi lai nhung API ban dau bi loi
      return authorizedAxiosInstance(originalRequests)
    })
  }


  // Xu ly tam trung phan hien thi thong bao loi tra ve tu moi response cua API o day (viet code mot lan: clean code)
  let errorMessage = error?.message
  if (error.response?.data?.message) {
    errorMessage = error.response?.data?.message
  }
  // Dung toastify de hien thi bat ky moi ma loi len man hinh (ngoai tru ma 410 - GONE phuc vu viec tu dong refresh lai token)
  if (error.response?.status !== 410) {
    toast.error(errorMessage)
  }

  return Promise.reject(error)
})

export default authorizedAxiosInstance
