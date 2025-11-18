import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Button, // Import Button
  Badge,
  Stack,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  CloudUpload, // Import CloudUpload cho nút upload
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';

// Import components đã tạo trước đó
import AuthModal from '../Auth/AuthModal'; // Đảm bảo đường dẫn đúng
import UserMenu from '../User/UserMenu'; // Đảm bảo đường dẫn đúng
import TrackUploadModal from '../Track/TrackUploadModal';
// --- Styled Components (Giữ nguyên) ---
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
      width: '30ch',
    },
  },
}));

// --- Header Component (Cập nhật) ---
const Header: React.FC = () => {
    const navigate = useNavigate();

    // STATE CHO XÁC THỰC
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock State
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    
    // MOCK USER DATA
    const mockUser = {
        name: "Tên Người Dùng",
        avatar: "https://i.pravatar.cc/300" 
    }

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setAuthModalOpen(false);
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
    }
    
    const RenderUserAuth = () => {
        if (isLoggedIn) {
            return (
                <Stack direction="row" spacing={1} alignItems="center">
                    {/* Nút Upload Track */}
                    <IconButton 
                        color="inherit" 
                        title="Tải Track lên"
                        onClick={() => setUploadModalOpen(true)}
                    >
                        <CloudUpload />
                    </IconButton>
                    
                    {/* Thông báo */}
                    <IconButton size="large" color="inherit">
                        <Badge badgeContent={4} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    {/* Menu người dùng */}
                    <UserMenu 
                        user={mockUser} 
                        onLogout={handleLogout} 
                        onOpenUpload={() => setUploadModalOpen(true)}
                    />
                </Stack>
            );
        }
        return (
            <Button variant="contained" color="secondary" onClick={() => setAuthModalOpen(true)}>
                Đăng nhập
            </Button>
        );
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* Logo/Tên dự án */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    >
                        AudioWeb
                    </Typography>

                    {/* Thanh tìm kiếm */}
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Tìm kiếm..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    <Box sx={{ flexGrow: 1 }} />
                    
                    {/* AUTH / USER SECTION */}
                    <Box sx={{ display: 'flex' }}>
                        {RenderUserAuth()}
                    </Box>
                </Toolbar>
            </AppBar>
            
            {/* MODALS */}
            <AuthModal 
                open={authModalOpen} 
                onClose={() => setAuthModalOpen(false)} 
                onLoginSuccess={handleLoginSuccess}
            />
            <TrackUploadModal 
                open={uploadModalOpen} 
                onClose={() => setUploadModalOpen(false)} 
            />
        </Box>
    );
};

export default Header;