import { useState, useEffect } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'
import PageLoading from '~/components/Loading/PageLoading'
import { verifyUserAPI } from '~/apis'

function AccountVerification() {
  // Lay gia tri email va token tu URL
  let [searchParams] = useSearchParams()
  const email = searchParams.get('email')
  const token = searchParams.get('token')

  // Tao mot bien state de biet duoc la da verify tai khoan thanh cong hay chua
  const [verified, setVerified] = useState(false)

  // Call API de verify tai khoan
  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token })
        .then(() => setVerified(true))
    }
  }, [email, token])

  // Neu URL co van de, kh ton tai 1 trong 2 gia tri email hoac token thi da ra trang 404 luon
  if (!email || !token) {
    return <Navigate to='/404' />
  }

  // Neu chua verify xong thi hien loading
  if (!verified) {
    return <PageLoading content='Verifying Account...' />
  }

  // Cuoi cung neu kh gap van de gi + verify thanh cong thi dieu huong ve trang login cung gia tri verifiedEmail
  return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccountVerification
