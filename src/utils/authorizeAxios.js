import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '~/utils/formatters'

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

// Interceptor Response: can thiep vao giua cac cai response nhan ve
authorizedAxiosInstance.interceptors.response.use((response) => {
  // Chan spam click
  interceptorLoadingElements(false)

  return response
}, (error) => {
  // Moi ma http status code nam ngoai khoang 200-299 se la error va roi vao day

  // Chan spam click
  interceptorLoadingElements(false)

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
