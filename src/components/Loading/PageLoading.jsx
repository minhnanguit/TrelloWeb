import { Box, CircularProgress, Typography } from '@mui/material'

function PageLoading({ content }) {
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
      <Typography>{content}</Typography>
    </Box>
  )
}

export default PageLoading
