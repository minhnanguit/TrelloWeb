import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import AttachmentIcon from '@mui/icons-material/Attachment'
import CommentIcon from '@mui/icons-material/Comment'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'


function Card({ temporaryHideMedia }) {
  if (temporaryHideMedia) {
    return (
      <MuiCard sx={{
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}>
        <CardContent sx={{
          padding: '12px',
          '&:last-child': {
            padding: '12px'
          }
        }}>
          <Typography>Card test 01</Typography>
        </CardContent>
      </MuiCard>
    )
  }
  return (
    <MuiCard sx={{
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      overflow: 'unset'
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://th.bing.com/th/id/R.8e07caeb4ef19dcb579ff17170cbcc05?rik=mX67HJcVF3w1YQ&pid=ImgRaw&r=0"
        title="green iguana"
      />
      <CardContent sx={{
        padding: '12px',
        '&:last-child': {
          padding: '12px'
        }
      }}>
        <Typography>Minh Nang</Typography>
      </CardContent>
      <CardActions sx={{ padding: '0 4px 8px 4px' }}>
        <Button startIcon={<GroupIcon />} size="small">14</Button>
        <Button startIcon={<CommentIcon />} size="small">3</Button>
        <Button startIcon={<AttachmentIcon />} size="small">10</Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card
