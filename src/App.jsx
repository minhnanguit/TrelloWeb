import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'
import AccountVerification from './pages/Auth/AccountVerification'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from './redux/user/userSlice'
import Settings from '~/pages/Settings/Settings'
import Boards from '~/pages/Boards'


/** Giai phap clean code trong viec xac dinh cac route nao can dang nhap tai khoan xong thi moi cho truy cap
 * Su dung <Outlet /> cua react-route-dom de hien thi cac Child Route
 */
const ProtectedRoute = ({ user }) => {
  if (!user) {
    return <Navigate to='/login' replace={true} />
  }
  return <Outlet />
}

function App() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      {/* Redirect Route */}
      <Route path='/' element={
        // replace gia tri true de no thay the route /, nghia la route / se kh con nam trong history cua Browser
        <Navigate to='/boards' replace={true} />
      } />

      {/* Protected Routes la nhung route chi cho truy cap sau khi login */}
      <Route element={<ProtectedRoute user={currentUser} />}>
        {/* <Outlet /> se chay vao cac child route trong nay */}

        {/* Board Details */}
        <Route path='/boards/:boardId' element={<Board />} />

        {/* Boards List */}
        <Route path='/boards' element={<Boards />} />

        {/* Settings */}
        <Route path='/settings/account' element={<Settings />} />
        <Route path='/settings/security' element={<Settings />} />
      </Route>

      {/* Authentication */}
      <Route path='/register' element={<Auth />} />
      <Route path='/login' element={<Auth />} />
      <Route path='/account/verification' element={<AccountVerification />} />

      {/* 404 Not Found Page */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
