import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box sx={{
      height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
    }}>
      CONTENT
    </Box>
  )
}

export default BoardContent
