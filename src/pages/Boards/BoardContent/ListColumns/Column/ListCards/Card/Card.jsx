import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import AttachmentIcon from '@mui/icons-material/Attachment'
import CommentIcon from '@mui/icons-material/Comment'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useDispatch } from 'react-redux'
import { showModalActiveCard, updateCurrentActiveCard } from '~/redux/activeCard/activeCardSlice'


function Card({ card }) {
  const dispatch = useDispatch()

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card }
  })

  const dndKitCardStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #487eb0' : undefined
  }

  const setActiveCard = () => {
    // Cap nhat lai du lieu activeCard trong redux
    dispatch(updateCurrentActiveCard(card))
    // Hien thi Modal Active Card
    dispatch(showModalActiveCard())
  }

  return (
    <MuiCard
      onClick={setActiveCard}
      ref={setNodeRef} style={dndKitCardStyles} {...attributes} {...listeners}
      sx={{
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset',
        display: card?.FE_PlaceholderCard ? 'none' : 'block',
        border: '1px solid transparent',
        '&:hover': {
          borderColor: (theme) => theme.palette.primary.main
        }
      }}
    >
      {card?.cover &&
        <CardMedia
          sx={{ height: 140 }}
          image={card?.cover}
        />
      }
      <CardContent sx={{
        padding: '12px',
        '&:last-child': {
          padding: '12px'
        }
      }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      {(!!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length) &&
        <CardActions sx={{ padding: '0 4px 8px 4px' }}>
          {!!card?.memberIds?.length &&
            <Button startIcon={<GroupIcon />} size="small">{card?.memberIds?.length}</Button>
          }
          {!!card?.comments?.length &&
            <Button startIcon={<CommentIcon />} size="small">{card?.comments?.length}</Button>
          }
          {!!card?.attachments?.length &&
            <Button startIcon={<AttachmentIcon />} size="small">{card?.attachments?.length}</Button>
          }
        </CardActions>
      }
    </MuiCard>
  )
}

export default Card
