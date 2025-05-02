import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Column from './Column/Column'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify' // dung toast o dau thi import o do
import { cloneDeep } from 'lodash'
import { createNewColumnAPI } from '~/apis/index'
import { selectCurrentActiveBoard, updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { generatePlaceholderCard } from '~/utils/generatePlaceholderCard.js'


// SortableContext yeu cau prop items la 1 mang dang ['id-1', 'id-2'] chu kh phai [{id: 'id-1'},  {id: 'id-2'}]
// Neu kh dung thi van keo the duoc nhung kh co animation


function ListColumns({ columns }) {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)

  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toogleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const [newColumnTitle, setNewColumnTitle] = useState('')

  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('Please enter column title')
      return
    }

    // Tao du lieu column de call API
    const newColumnData = {
      title: newColumnTitle
    }

    /* Call API tao moi column va cap nhat lai state board (dung redux) */
    // Call API tao moi column
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    // Khi tao moi 1 column thi can tao mot placeholder card cua column do
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    // Cap nhat lai state board
    /** O day neu dung spread operator thi se bi dinh loi 'object is not extensible' lien quan den rules cua redux
     * -> thay vi dung spread operator thi dung cloneDeep
     */
    // const newBoard = { ...board }
    const newBoard = cloneDeep(board)
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

    // Dong trang thai them column moi va clear input
    toogleOpenNewColumnForm()
    setNewColumnTitle('')
  }

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
        {columns.map(column =>
          <Column key={column._id}
            column={column}
          />
        )}

        {/* Box add new card */}
        {!openNewColumnForm
          ? <Box
            onClick={toogleOpenNewColumnForm}
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
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
              Add new column
            </Button>
          </Box>
          : <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p: 1,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <TextField
              label="Enter column title..."
              type="text"
              size='small'
              variant='outlined'
              autoFocus
              value={newColumnTitle}
              onChange={e => setNewColumnTitle(e.target.value)}
              sx={{
                '& label': {
                  color: 'white'
                },
                '& label.Mui-focused': {
                  color: 'white'
                },
                '& input': {
                  color: 'white'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white'
                  },
                  '&:hover fieldset': {
                    borderColor: 'white'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white'
                  }
                }
              }}
            />
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <Button
                onClick={addNewColumn}
                variant='contained'
                color='success'
                size='small'
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': {
                    bgcolor: (theme) => theme.palette.success.main
                  }
                }}
              >
                Add Column
              </Button>
              <CloseIcon
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': {
                    color: (theme) => theme.palette.warning.light
                  }
                }}
                fontSize='small'
                onClick={toogleOpenNewColumnForm}
              />
            </Box>
          </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ListColumns