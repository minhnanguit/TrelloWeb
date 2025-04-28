// Boards details
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoxContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data.js'
import { useEffect, useState } from 'react'

import { fetchBoardDetailsAPI,
  createNewColumnAPI,
  createNewCardAPI,
  updateBoardDetailsAPI,
  moveCardToDifferentColumnAPI
} from '~/apis/index'

import { generatePlaceholderCard } from '~/utils/generatePlaceholderCard.js'
import { isEmpty } from 'lodash'
import { mapOrder } from '~/utils/sorts'
import { Box, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '680c5638cd86303dd9fde5df'

    // CallAPI
    fetchBoardDetailsAPI(boardId)
      .then((board) => {
        // Sap xep columns luon o day truoc khi truyen xuong components con
        board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

        board.columns.forEach(column => {
          // Khi f5 lai trang web thi can tao mot placeholder card cua column do
          if (isEmpty(column.cards)) {
            column.cards = [generatePlaceholderCard(column)]
            column.cardOrderIds = [generatePlaceholderCard(column)._id]
          } else {
            // Sap xep cards luon o day truoc khi truyen xuong components con
            column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
          }
        })

        setBoard(board)
      })
  }, [])

  // Call API tao moi column va cap nhat lai state board
  const createNewColumn = async (newColumnData) => {
    // Call API tao moi column
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    // Khi tao moi 1 column thi can tao mot placeholder card cua column do
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    // Cap nhat lai state board
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  // Call API tao moi card va cap nhat lai state board
  const createNewCard = async (newCardData) => {
    // Call API tao moi card
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    // Cap nhat lai state board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }
    setBoard(newBoard)
  }

  // Call API xu ly sau khi dnd columns xong
  const moveColumns = (dndOrderedColumns) => {
    // Sau khi dnd columns thi chi can cap nhat lai vi tri cua columns -> can lay ra mang columnOrderIds. Ma columnOrderIds thuoc board -> can xu ly trong board

    // Update cho chuan du lieu state board
    const dndOrderedColumnIds = dndOrderedColumns.map(column => column._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)

    // Call API update board sau khi keo tha columns xong
    updateBoardDetailsAPI(board._id, { columnOrderIds: dndOrderedColumnIds })
  }

  // Call API xu ly sau khi dnd cards trong cung column xong
  const moveCardsInSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    // Sau khi dnd cards trong cung column thi chi can cap nhat lai vi tri cua cards -> can lay ra mang cardOrderIds. Ma cardOrderIds thuoc column -> can xu ly trong column
    // Update cho chuan du lieu state board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)
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
    setBoard(newBoard)

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
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardsInSameColumn={moveCardsInSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
      />
    </Container>
  )
}

export default Board
