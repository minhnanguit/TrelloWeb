import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box sx={{
      height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
      width: '100%',
      backgroundColor: 'primary.main',
      display: 'flex',
      alignItems: 'center'
    }}>
      CONTENT
    </Box>
  )
}

export default BoardContent
