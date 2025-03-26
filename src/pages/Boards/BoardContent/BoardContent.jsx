import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

function BoardContent({ board }) {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

  return (
    <Box sx={{
      height: (theme) => theme.trello.boardContentHeight,
      width: '100%',
      padding: '10px 0',
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
    }}>
      <ListColumns columns={orderedColumns} />
    </Box>
  )
}

export default BoardContent
