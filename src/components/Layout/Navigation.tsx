import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import {
  Home,
  Explore,
  LibraryMusic,
  Person,
} from '@mui/icons-material';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentPath = () => {
    const path = location.pathname;
    if (path === '/' || path.startsWith('/home')) return 0;
    if (path.startsWith('/explore')) return 1;
    if (path.startsWith('/library')) return 2;
    if (path.startsWith('/profile')) return 3;
    return 0;
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 88, // Above audio player
        left: 0,
        right: 0,
        zIndex: 999,
        display: { xs: 'block', md: 'none' },
      }}
      elevation={3}
    >
      <BottomNavigation
        value={getCurrentPath()}
        onChange={(_, newValue) => {
          const routes = ['/', '/explore', '/library', '/profile'];
          navigate(routes[newValue]);
        }}
        showLabels
        sx={{
          bgcolor: 'background.paper',
          '& .MuiBottomNavigationAction-root': {
            color: 'text.secondary',
            '&.Mui-selected': {
              color: 'primary.main',
            },
          },
        }}
      >
        <BottomNavigationAction label="Trang chủ" icon={<Home />} />
        <BottomNavigationAction label="Khám phá" icon={<Explore />} />
        <BottomNavigationAction label="Thư viện" icon={<LibraryMusic />} />
        <BottomNavigationAction label="Cá nhân" icon={<Person />} />
      </BottomNavigation>
    </Paper>
  );
};

export default Navigation;

