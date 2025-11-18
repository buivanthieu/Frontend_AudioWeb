import React from 'react';
import { 
    IconButton, 
    Menu, 
    MenuItem, 
    ListItemIcon, 
    ListItemText, 
    Avatar 
} from '@mui/material';
import { 
    AccountCircle, 
    Logout, 
    Settings,
    CloudUpload,
} from '@mui/icons-material';

interface UserMenuProps {
    user: { name: string; avatar?: string };
    onLogout: () => void;
    onOpenUpload: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout, onOpenUpload }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    
    const handleLogout = () => {
        onLogout();
        handleCloseMenu();
    };

    const handleUploadClick = () => {
        onOpenUpload();
        handleCloseMenu();
    }

    return (
        <>
            <IconButton 
                onClick={handleOpenMenu} 
                size="small" 
                aria-controls={open ? 'user-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                sx={{ ml: 2 }}
            >
                {/* Hiển thị Avatar hoặc biểu tượng AccountCircle mặc định */}
                {user.avatar ? (
                    <Avatar alt={user.name} src={user.avatar} sx={{ width: 32, height: 32 }} />
                ) : (
                    <AccountCircle fontSize="large" color="primary" />
                )}
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="user-menu"
                open={open}
                onClose={handleCloseMenu}
                onClick={handleCloseMenu}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleUploadClick}>
                    <ListItemIcon>
                        <CloudUpload fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Tải Track lên</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Cài đặt</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Đăng xuất</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;