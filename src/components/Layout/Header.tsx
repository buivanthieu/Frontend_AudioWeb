import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Favorite,
  History,
  Login as LoginIcon,
  PersonAdd,
  Settings,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
    maxWidth: 400,
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    } else {
      navigate('/search');
    }
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          onClick={() => navigate('/')}
          sx={{ 
            flexGrow: { xs: 1, sm: 0 },
            fontWeight: 700,
            background: 'linear-gradient(45deg, #6366f1, #ec4899)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mr: 3,
            cursor: 'pointer',
          }}
        >
          AudioStory
        </Typography>

        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{ flexGrow: { xs: 1, sm: 0 } }}
        >
          <Search onClick={handleSearchClick} sx={{ cursor: 'pointer' }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Tìm tracks, playlists, channels..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={handleSearchClick}
            />
          </Search>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton size="large" color="inherit" sx={{ mr: 1 }}>
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <IconButton
          size="large"
          edge="end"
          onClick={handleMenu}
          color="inherit"
        >
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
            <AccountCircle />
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleClose}>
            <Favorite sx={{ mr: 2 }} /> Yêu thích
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <History sx={{ mr: 2 }} /> Lịch sử nghe
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <AccountCircle sx={{ mr: 2 }} /> Tài khoản
          </MenuItem>
          <MenuItem onClick={() => { handleClose(); navigate('/login'); }}>
            <LoginIcon sx={{ mr: 2 }} /> Đăng nhập
          </MenuItem>
          <MenuItem onClick={() => { handleClose(); navigate('/register'); }}>
            <PersonAdd sx={{ mr: 2 }} /> Đăng ký
          </MenuItem>
          <Divider sx={{ my: 1 }} />
          <MenuItem onClick={handleClose}>
            <Settings sx={{ mr: 2 }} /> Cài đặt
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

