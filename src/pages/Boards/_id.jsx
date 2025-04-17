// Boards details
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoxContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data.js'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis/index'
import { set } from 'lodash'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '67ffc55f5baf4f35aaec9824'

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
