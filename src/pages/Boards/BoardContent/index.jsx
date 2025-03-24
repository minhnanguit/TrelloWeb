import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import AddCardIcon from '@mui/icons-material/AddCard'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Tooltip from '@mui/material/Tooltip'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import AttachmentIcon from '@mui/icons-material/Attachment'
import CommentIcon from '@mui/icons-material/Comment'


const HEADER_COLUMN_HEIGHT = '50px'
const FOOTER_COLUMN_HEIGHT = '56px'

function BoardContent() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{
      height: (theme) => theme.trello.boardContentHeight,
      width: '100%',
      padding: '10px 0',
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
    }}>
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
        {/* Column */}
        <Box sx={{
          minWidth: '300px',
          maxWidth: '300px',
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
          marginLeft: '16px',
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
        }}>
          {/* Header */}
          <Box sx={{
            height: HEADER_COLUMN_HEIGHT,
            padding: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography
              sx={{
                color: 'text.primary',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
              variant='h6'
            >
              Column Title
            </Typography>

            <Box>
              <Tooltip title="More options">
                <ExpandMoreIcon
                  sx={{
                    color: 'text.primary',
                    cursor: 'pointer'
                  }}
                  id="basic-button-dropdown"
                  aria-controls={open ? 'basic-menu-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                />
              </Tooltip>
              <Menu
                id="basic-menu-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button-dropdown'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Save this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <DeleteForeverIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* List card */}
          <Box sx={{
            padding: '0 5px',
            margin: '0 5px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${HEADER_COLUMN_HEIGHT} - ${FOOTER_COLUMN_HEIGHT})`,
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ced0da'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#bfc2cf'
            }
          }}>
            <Card sx={{
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
            </Card>

            <Card sx={{
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: '12px',
                '&:last-child': {
                  padding: '12px'
                }
              }}>
                <Typography>
                  Tho
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: '12px',
                '&:last-child': {
                  padding: '12px'
                }
              }}>
                <Typography>
                  Tho
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: '12px',
                '&:last-child': {
                  padding: '12px'
                }
              }}>
                <Typography>
                  Tho
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: '12px',
                '&:last-child': {
                  padding: '12px'
                }
              }}>
                <Typography>
                  Tho
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: '12px',
                '&:last-child': {
                  padding: '12px'
                }
              }}>
                <Typography>
                  Tho
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: '12px',
                '&:last-child': {
                  padding: '12px'
                }
              }}>
                <Typography>
                  Tho
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: '12px',
                '&:last-child': {
                  padding: '12px'
                }
              }}>
                <Typography>
                  Tho
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: '12px',
                '&:last-child': {
                  padding: '12px'
                }
              }}>
                <Typography>
                  Tho
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: '12px',
                '&:last-child': {
                  padding: '12px'
                }
              }}>
                <Typography>
                  Tho
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: '12px',
                '&:last-child': {
                  padding: '12px'
                }
              }}>
                <Typography>
                  Tho
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: '12px',
                '&:last-child': {
                  padding: '12px'
                }
              }}>
                <Typography>
                  Tho
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Footer */}
          <Box sx={{
            height: FOOTER_COLUMN_HEIGHT,
            padding: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Button startIcon={<AddCardIcon />}>
              Add new card
            </Button>
            <Tooltip title="Drag to card">
              <DragHandleIcon
                sx={{
                  cursor: 'pointer'
                }}
              />
            </Tooltip>
          </Box>
        </Box>




        <Box sx={{
          minWidth: '300px',
          maxWidth: '300px',
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
          marginLeft: '16px',
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}>
          {/* Header */}
          <Box sx={{
            height: HEADER_COLUMN_HEIGHT,
            padding: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography
              sx={{
                color: 'text.primary',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
              variant='h6'
            >
              Column Title
            </Typography>

            <Box>
              <Tooltip title="More options">
                <ExpandMoreIcon
                  sx={{
                    color: 'text.primary',
                    cursor: 'pointer'
                  }}
                  id="basic-button-dropdown"
                  aria-controls={open ? 'basic-menu-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                />
              </Tooltip>
              <Menu
                id="basic-menu-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button-dropdown'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Save this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <DeleteForeverIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* List card */}
          <Box sx={{
            padding: '0 5px',
            margin: '0 5px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${HEADER_COLUMN_HEIGHT} - ${FOOTER_COLUMN_HEIGHT})`,
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ced0da'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#bfc2cf'
            }
          }}>
            <Card sx={{
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
            </Card>

            <Card sx={{
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: '12px',
                '&:last-child': {
                  padding: '12px'
                }
              }}>
                <Typography>
                  Tho
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: '12px',
                '&:last-child': {
                  padding: '12px'
                }
              }}>
                <Typography>
                  Tho
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: '12px',
                '&:last-child': {
                  padding: '12px'
                }
              }}>
                <Typography>
                  Tho
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: '12px',
                '&:last-child': {
                  padding: '12px'
                }
              }}>
                <Typography>
                  Tho
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: '12px',
                '&:last-child': {
                  padding: '12px'
                }
              }}>
                <Typography>
                  Tho
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: '12px',
                '&:last-child': {
                  padding: '12px'
                }
              }}>
                <Typography>
                  Tho
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: '12px',
                '&:last-child': {
                  padding: '12px'
                }
              }}>
                <Typography>
                  Tho
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: '12px',
                '&:last-child': {
                  padding: '12px'
                }
              }}>
                <Typography>
                  Tho
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: '12px',
                '&:last-child': {
                  padding: '12px'
                }
              }}>
                <Typography>
                  Tho
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: '12px',
                '&:last-child': {
                  padding: '12px'
                }
              }}>
                <Typography>
                  Tho
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: '12px',
                '&:last-child': {
                  padding: '12px'
                }
              }}>
                <Typography>
                  Tho
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Footer */}
          <Box sx={{
            height: FOOTER_COLUMN_HEIGHT,
            padding: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Button startIcon={<AddCardIcon />}>
              Add new card
            </Button>
            <Tooltip title="Drag to card">
              <DragHandleIcon
                sx={{
                  cursor: 'pointer'
                }}
              />
            </Tooltip>
          </Box>
        </Box>
      </Box>

      
    </Box>
  )
}

export default BoardContent
