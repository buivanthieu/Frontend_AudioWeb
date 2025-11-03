import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Avatar,
  Divider,
  Tabs,
  Tab,
  Stack,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Subscriptions,
  NotificationsNone,
  Notifications,
  MoreVert,
  PlaylistPlay,
  MusicNote,
  Info,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import TrackCard from '../components/TrackCard/TrackCard';
import TrackListItem from '../components/TrackListItem/TrackListItem';

const ChannelBanner = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 200,
  background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
  borderRadius: theme.shape.borderRadius,
  mb: 3,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
}));

const ChannelHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: 3,
  mb: 3,
  flexWrap: 'wrap',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`channel-tabpanel-${index}`}
      aria-labelledby={`channel-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const Channel: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  // Mock data - sẽ thay bằng API call
  const channel = {
    id: id || 'channel-1',
    name: 'Channel Audio Story',
    handle: '@channelaudiostory',
    avatar: '/placeholder-avatar.jpg',
    banner: '/placeholder-banner.jpg',
    subscribers: 50000,
    totalViews: 2500000,
    description: `Kênh chuyên về truyện audio, sách nói và những câu chuyện hay nhất.
    
Chúng tôi đăng tải các track audio chất lượng cao với nhiều thể loại khác nhau:
- Truyện tình cảm
- Phiêu lưu kỳ thú
- Khoa học viễn tưởng
- Lịch sử và văn hóa

Đăng ký kênh để không bỏ lỡ bất kỳ track nào! 🔔`,
    joinDate: 'Tháng 1, 2024',
    location: 'Việt Nam',
    website: 'https://channelaudiostory.com',
    socialLinks: {
      facebook: 'https://facebook.com/channelaudiostory',
      twitter: 'https://twitter.com/channelaudiostory',
    },
    verified: true,
  };

  const tracks = [
    {
      id: '1',
      title: 'Tuyển tập truyện audio hay nhất - Tập 1',
      uploader: channel.name,
      thumbnail: '/placeholder-track.jpg',
      duration: '25:30',
      views: 125000,
      uploadedAt: '2 ngày trước',
      audioUrl: '/sample-audio.mp3',
    },
    {
      id: '2',
      title: 'Cuộc phiêu lưu kỳ thú - Phần 1',
      uploader: channel.name,
      thumbnail: '/placeholder-track.jpg',
      duration: '45:20',
      views: 89000,
      uploadedAt: '1 tuần trước',
      audioUrl: '/sample-audio.mp3',
    },
    {
      id: '3',
      title: 'Tình yêu và cuộc sống - Tập đặc biệt',
      uploader: channel.name,
      thumbnail: '/placeholder-track.jpg',
      duration: '30:15',
      views: 156000,
      uploadedAt: '3 ngày trước',
      audioUrl: '/sample-audio.mp3',
    },
    {
      id: '4',
      title: 'Thám hiểm rừng sâu - Chương mở đầu',
      uploader: channel.name,
      thumbnail: '/placeholder-track.jpg',
      duration: '35:45',
      views: 67000,
      uploadedAt: '5 ngày trước',
      audioUrl: '/sample-audio.mp3',
    },
    {
      id: '5',
      title: 'Khoa học viễn tưởng - Tương lai xa',
      uploader: channel.name,
      thumbnail: '/placeholder-track.jpg',
      duration: '40:10',
      views: 98000,
      uploadedAt: '1 tuần trước',
      audioUrl: '/sample-audio.mp3',
    },
    {
      id: '6',
      title: 'Lịch sử Việt Nam - Thời kỳ độc lập',
      uploader: channel.name,
      thumbnail: '/placeholder-track.jpg',
      duration: '50:25',
      views: 234000,
      uploadedAt: '2 ngày trước',
      audioUrl: '/sample-audio.mp3',
    },
  ];

  const playlists = [
    {
      id: 'p1',
      title: 'Tuyển tập truyện tình cảm hay nhất',
      description: 'Những câu chuyện tình yêu lãng mạn và cảm động',
      thumbnail: '/placeholder-track.jpg',
      trackCount: 25,
      uploader: channel.name,
      views: 125000,
    },
    {
      id: 'p2',
      title: 'Phiêu lưu và khám phá',
      description: 'Cuộc phiêu lưu đầy thú vị và bất ngờ',
      thumbnail: '/placeholder-track.jpg',
      trackCount: 18,
      uploader: channel.name,
      views: 89000,
    },
    {
      id: 'p3',
      title: 'Khoa học viễn tưởng tuyển chọn',
      description: 'Những câu chuyện về tương lai và công nghệ',
      thumbnail: '/placeholder-track.jpg',
      trackCount: 12,
      uploader: channel.name,
      views: 67000,
    },
  ];

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSubscribe = () => {
    setSubscribed(!subscribed);
    if (notificationsEnabled && !subscribed) {
      setNotificationsEnabled(false);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleNotificationToggle = () => {
    if (!subscribed) {
      setSubscribed(true);
    }
    setNotificationsEnabled(!notificationsEnabled);
    handleMenuClose();
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <Container maxWidth="xl" sx={{ py: 3, pb: 20 }}>
      {/* Banner */}
      <ChannelBanner>
        <Box
          component="img"
          src={channel.banner}
          alt={channel.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={(e) => {
            // Fallback nếu không có banner
            e.currentTarget.style.display = 'none';
          }}
        />
      </ChannelBanner>

      {/* Channel Header */}
      <ChannelHeader>
        <Avatar
          src={channel.avatar}
          sx={{
            width: 120,
            height: 120,
            border: '4px solid',
            borderColor: 'background.default',
          }}
        />
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
            <Typography variant="h4" component="h1" fontWeight={700}>
              {channel.name}
            </Typography>
            {channel.verified && (
              <Chip
                label="✓"
                size="small"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  height: 24,
                }}
              />
            )}
          </Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {channel.handle}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2, flexWrap: 'wrap' }}>
            <Typography variant="body2" color="text.secondary">
              {formatNumber(channel.subscribers)} người đăng ký
            </Typography>
            <Typography variant="body2" color="text.secondary">
              •
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {tracks.length} tracks
            </Typography>
            <Typography variant="body2" color="text.secondary">
              •
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatNumber(channel.totalViews)} lượt xem tổng cộng
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button
            variant={subscribed ? 'contained' : 'outlined'}
            startIcon={subscribed ? <Notifications /> : <Subscriptions />}
            onClick={handleSubscribe}
            sx={{
              borderRadius: 18,
              textTransform: 'none',
              fontWeight: 600,
              minWidth: 140,
            }}
            color={subscribed ? 'error' : 'primary'}
          >
            {subscribed ? 'Đã đăng ký' : 'Đăng ký'}
          </Button>
          <IconButton onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleNotificationToggle} disabled={!subscribed}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {notificationsEnabled ? <Notifications /> : <NotificationsNone />}
                <Typography>
                  {notificationsEnabled ? 'Tắt thông báo' : 'Bật thông báo'}
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              Chia sẻ kênh
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              Báo cáo kênh
            </MenuItem>
          </Menu>
        </Box>
      </ChannelHeader>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
            },
          }}
        >
          <Tab icon={<MusicNote />} iconPosition="start" label="Tracks" />
          <Tab icon={<PlaylistPlay />} iconPosition="start" label="Playlists" />
          <Tab icon={<Info />} iconPosition="start" label="Giới thiệu" />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        {/* View mode toggle */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            size="small"
            variant={viewMode === 'grid' ? 'contained' : 'outlined'}
            onClick={() => setViewMode('grid')}
            sx={{ mr: 1, textTransform: 'none' }}
          >
            Grid
          </Button>
          <Button
            size="small"
            variant={viewMode === 'list' ? 'contained' : 'outlined'}
            onClick={() => setViewMode('list')}
            sx={{ textTransform: 'none' }}
          >
            List
          </Button>
        </Box>

        {viewMode === 'grid' ? (
          <Grid container spacing={3}>
            {tracks.map((track) => (
              <Grid item xs={6} sm={4} md={3} lg={2.4} key={track.id}>
                <TrackCard
                  track={track}
                  onClick={(id) => navigate(`/track/${id}`)}
                  onPlay={(id) => console.log('Play:', id)}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 1 }}>
            {tracks.map((track, index) => (
              <TrackListItem
                key={track.id}
                track={track}
                index={index}
                onClick={(id) => navigate(`/track/${id}`)}
                onPlay={(id) => console.log('Play:', id)}
              />
            ))}
          </Box>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {playlists.map((playlist) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={playlist.id}>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
                onClick={() => navigate(`/playlist/${playlist.id}`)}
              >
                <Box
                  sx={{
                    position: 'relative',
                    paddingTop: '56.25%',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    component="img"
                    src={playlist.thumbnail}
                    alt={playlist.title}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      bgcolor: 'rgba(0, 0, 0, 0.8)',
                      color: 'white',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      fontWeight: 600,
                    }}
                  >
                    <PlaylistPlay fontSize="small" />
                    <Typography variant="caption">{playlist.trackCount}</Typography>
                  </Box>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    gutterBottom
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {playlist.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {playlist.uploader}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatNumber(playlist.views)} lượt xem
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Giới thiệu
          </Typography>
          <Typography
            variant="body2"
            sx={{
              whiteSpace: 'pre-wrap',
              mb: 3,
            }}
          >
            {channel.description}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Thống kê
              </Typography>
              <Stack spacing={1}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Ngày tham gia
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {channel.joinDate}
                  </Typography>
                </Box>
                {channel.location && (
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Vị trí
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {channel.location}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Liên kết
              </Typography>
              <Stack spacing={1}>
                {channel.website && (
                  <Button
                    href={channel.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textTransform: 'none',
                      justifyContent: 'flex-start',
                      color: 'primary.main',
                    }}
                  >
                    {channel.website}
                  </Button>
                )}
                {channel.socialLinks.facebook && (
                  <Button
                    href={channel.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textTransform: 'none',
                      justifyContent: 'flex-start',
                      color: 'primary.main',
                    }}
                  >
                    Facebook
                  </Button>
                )}
                {channel.socialLinks.twitter && (
                  <Button
                    href={channel.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textTransform: 'none',
                      justifyContent: 'flex-start',
                      color: 'primary.main',
                    }}
                  >
                    Twitter
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>
    </Container>
  );
};

export default Channel;

