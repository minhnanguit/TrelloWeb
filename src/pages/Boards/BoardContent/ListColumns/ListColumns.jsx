import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Column from './Column/Column'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'


// SortableContext yeu cau prop items la 1 mang dang ['id-1', 'id-2'] chu kh phai [{id: 'id-1'},  {id: 'id-2'}]
// Neu kh dung thi van keo the duoc nhung kh co animation


function ListColumns({ columns }) {
  return (
    <SortableContext items={columns.map(column => column._id)} strategy={horizontalListSortingStrategy} >
      <Box sx={{
        bgColor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': {
          margin: '0 16px'
        }
      }}>
        {columns.map(column => <Column key={column._id} column={column} />)}

        {/* Box add new card */}
        <Box sx={{
          minWidth: '200px',
          maxWidth: '200px',
          marginX: 2,
          borderRadius: '6px',
          height: 'fit-content',
          bgcolor: '#ffffff3d'
        }}>
          <Button
            startIcon={<NoteAddIcon />}
            sx={{
              width: '100%',
              color: 'white',
              display: 'flex',
              justifyContent: 'flex-start',
              paddingLeft: 2.5,
              paddingY: 1
            }}>
            Add new card
          </Button>
        </Box>
      </Box>
    </SortableContext>
  )
}

export default ListColumns