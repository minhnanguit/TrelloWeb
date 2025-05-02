import { Routes, Route, Navigate } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'

function App() {
  return (
    <Routes>
      {/* Redirect Route */}
      <Route path='/' element={
        // replace gia tri true de no thay the route /, nghia la route / se kh con nam trong history cua Browser
        <Navigate to='/boards/680c5638cd86303dd9fde5df' replace='true' />
      } />

      {/* Board Details */}
      <Route path='/boards/:boardId' element={<Board />} />

      {/* Authentication */}
      <Route path='/register' element={<Auth />} />
      <Route path='/login' element={<Auth />} />

      {/* 404 Not Found Page */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
