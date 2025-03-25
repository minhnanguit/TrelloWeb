import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Column from './Column/Column'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

function ListColumns() {
  return (
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
      <Column />
      <Column />

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
  )
}

export default ListColumns