// Boards details
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoxContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data.js'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis/index'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '68072fc7f885af3b14faa369'

    // CallAPI
    fetchBoardDetailsAPI(boardId)
      .then((board) => {
        setBoard(board)
      })
  }, [])

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoxContent board={board} />
    </Container>
  )
}

export default Board
