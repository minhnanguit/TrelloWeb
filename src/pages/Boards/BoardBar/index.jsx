import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLES = {
  color: 'White',
  backgroundColor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    backgroundColor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box sx={{
      height: (theme) => theme.trello.boardBarHeight,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingX: '8px',
      gap: 2,
      overflowX: 'auto',
      borderBottom: '1px solid white',
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label="Minh Nang"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add To Drive"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filter"
          clickable
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
        >Invite</Button>

        <AvatarGroup
          max={7}
          sx={{
            '& .MuiAvatar-root': {
              width: '34px',
              height: '34px',
              fontSize: '16px',
              border: 'none'
            },
            gap: '10px'
          }}
        >
          <Tooltip title='minhnang'>
            <Avatar alt="Remy Sharp" src="https://th.bing.com/th/id/OIP.PBW5xYA2INIu23KqsVN1RAAAAA?pid=ImgDet&w=184&h=230&c=7&dpr=1.3" />
          </Tooltip>
          <Tooltip title='minhnang'>
            <Avatar alt="Remy Sharp" src="https://i.pinimg.com/736x/1b/b6/41/1bb64146f15f6fb4fbc5edfdbf5ea567.jpg" />
          </Tooltip>
          <Tooltip title='minhnang'>
            <Avatar alt="Remy Sharp" src="https://i.pinimg.com/736x/ce/97/58/ce9758194d851dace3ce09b68e6a0d59.jpg" />
          </Tooltip>
          <Tooltip title='minhnang'>
            <Avatar alt="Remy Sharp" src="https://i.pinimg.com/736x/16/02/e7/1602e7fde74949263d2ed4d652a54ed0.jpg" />
          </Tooltip>
          <Tooltip title='minhnang'>
            <Avatar alt="Remy Sharp" src="https://i.pinimg.com/736x/99/68/55/99685563683ab392d3042282be946d62.jpg" />
          </Tooltip>
          <Tooltip title='minhnang'>
            <Avatar alt="Remy Sharp" src="https://thanhtrungmobile.vn/thanhtrungmobile-vn/2023/08/hinh-nen-avatar-buon-1.jpeg.webp" />
          </Tooltip>
          <Tooltip title='minhnang'>
            <Avatar alt="Remy Sharp" src="/https://i.pinimg.com/736x/0c/97/26/0c9726ca5efeeec9a4b73a2c09c320a6.jpg" />
          </Tooltip>
          <Tooltip title='minhnang'>
            <Avatar alt="Remy Sharp" src="https://intomau.com/Content/upload/images/tho-bay-mau-quan-khan.jpg" />
          </Tooltip>
          <Tooltip title='minhnang'>
            <Avatar alt="Remy Sharp" src="https://i.ytimg.com/vi/TMR6ejOpnKo/frame0.jpg" />
          </Tooltip>
          <Tooltip title='minhnang'>
            <Avatar alt="Remy Sharp" src="https://i.ytimg.com/vi/TMR6ejOpnKo/frame0.jpg" />
          </Tooltip>
          <Tooltip title='minhnang'>
            <Avatar alt="Remy Sharp" src="https://i.ytimg.com/vi/TMR6ejOpnKo/frame0.jpg" />
          </Tooltip>
          <Tooltip title='minhnang'>
            <Avatar alt="Remy Sharp" src="https://i.ytimg.com/vi/TMR6ejOpnKo/frame0.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
