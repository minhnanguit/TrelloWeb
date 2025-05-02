// Boards details
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoxContent from './BoardContent/BoardContent'
import { useEffect } from 'react'

import {
  updateBoardDetailsAPI,
  moveCardToDifferentColumnAPI
} from '~/apis/index'

import { cloneDeep } from 'lodash'
import { Box, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

import { fetchBoardDetailsAPI, updateCurrentActiveBoard, selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


function Board() {
  const dispatch = useDispatch()
  // Khong dung state cua component nua ma chuyen sang state cua redux
  const board = useSelector(selectCurrentActiveBoard)
  // const [board, setBoard] = useState(null)

  // Lay params boardId tren URL
  const { boardId } = useParams()

  useEffect(() => {
    // const boardId = '680c5638cd86303dd9fde5df'

    // CallAPI
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch, boardId])


  // Call API xu ly sau khi dnd columns xong
  const moveColumns = (dndOrderedColumns) => {
    // Sau khi dnd columns thi chi can cap nhat lai vi tri cua columns -> can lay ra mang columnOrderIds. Ma columnOrderIds thuoc board -> can xu ly trong board

    // Update cho chuan du lieu state board
    const dndOrderedColumnIds = dndOrderedColumns.map(column => column._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

    // Call API update board sau khi keo tha columns xong
    updateBoardDetailsAPI(board._id, { columnOrderIds: dndOrderedColumnIds })
  }

  // Call API xu ly sau khi dnd cards trong cung column xong
  const moveCardsInSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    // Sau khi dnd cards trong cung column thi chi can cap nhat lai vi tri cua cards -> can lay ra mang cardOrderIds. Ma cardOrderIds thuoc column -> can xu ly trong column
    // Update cho chuan du lieu state board
    // const newBoard = { ...board }
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))
  }

  // Call API xu ly sau khi dnd card toi column khac
  /** Khi di chuyen card sang column khac:
   * B1: Cap nhat lai mang cardOrderIds ben column cu (xoa _id cua card ra khoi mang cardOrderIds)
   * B2: Cap nhat lai mang cardOrderIds ben column moi (them _id cua card vao mang cardOrderIds)
   * B3: Cap nhat lai truong columnId thanh column moi cua card da keo
   */
  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    // Update cho chuan du lieu state board
    const dndOrderdColumnIds = dndOrderedColumns.map(column => column._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderdColumnIds
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

    // Call API de BE xu ly
    let prevCardOrderIds = dndOrderedColumns.find(column => column._id === prevColumnId)?.cardOrderIds
    // Khi keo card cuoi cung cua mot column thi column se tu sinh ra mot placeholderCard, can xoa no di truoc khi gui du lieu len BE
    if (prevCardOrderIds[0].includes('placeholder-card')) {
      prevCardOrderIds = []
    }

    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(column => column._id === nextColumnId)?.cardOrderIds
    })
  }

  if (!board) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100vw',
        height: '100vh'
      }}>
        <CircularProgress />
        <Typography>Loading Board...</Typography>
      </Box>
    )
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoxContent
        board={board}

        // 3 props nay giu lai vi no chi truyen qua mot cap den BoardContent.jsx
        moveColumns={moveColumns}
        moveCardsInSameColumn={moveCardsInSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
      />
    </Container>
  )
}

export default Board
