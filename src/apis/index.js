// Ben FE call API bang thu vien axios
import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

/**
 * Tat ca cac function ben duoi chi request va lay data tu response luon ma kh co try catch
 * Vi phia FE kh can thiet lam vay doi voi moi request boi no se gay ra viec du thua code
 * Giai phap Clean Code do la se catch loi tap trung tai mot noi bang cach dung Interceptors trong axios
 * Interceptors la cach ma chung ta se danh chan vao giua request hoac response de xu ly logic ma chung ta muon
 */

export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)

  // axios se tra ve ket qua thong qua property cua no la data
  return response.data
}

