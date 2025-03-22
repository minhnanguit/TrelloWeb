// Boards details
import Container from '@mui/material/Container'
import AppBar from '../../components/AppBar/index'
import BoardBar from './BoardBar/index'
import BoxContent from './BoardContent/index'

function Board() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar />
      <BoxContent />
    </Container>
  )
}

export default Board
