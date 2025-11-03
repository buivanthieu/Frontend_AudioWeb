import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Stack,
  Chip,
  Button,
  Tabs,
  Tab,
  List,
} from '@mui/material';
import { ArrowForward, PlayArrow } from '@mui/icons-material';
import TrackCard from '../components/TrackCard/TrackCard';
import TrackListItem from '../components/TrackListItem/TrackListItem';

// Mock data - sẽ thay thế bằng API call sau
const tracks = [
  {
      id: '1',
      title: 'Tuyển tập truyện audio hay nhất - Tập 1',
      uploader: 'Channel Audio Story',
      uploaderId: 'channel-1',
      thumbnail: '/placeholder-track.jpg',
    duration: '25:30',
    views: 125000,
    uploadedAt: '2 ngày trước',
    audioUrl: '/sample-audio.mp3',
  },
  {
      id: '2',
      title: 'Cuộc phiêu lưu kỳ thú - Phần 1',
      uploader: 'Người kể chuyện',
      uploaderId: 'channel-2',
      thumbnail: '/placeholder-track.jpg',
    duration: '45:20',
    views: 89000,
    uploadedAt: '1 tuần trước',
    audioUrl: '/sample-audio.mp3',
  },
  {
    id: '3',
    title: 'Tình yêu và cuộc sống - Tập đặc biệt',
    uploader: 'Radio Tình Yêu',
    thumbnail: '/placeholder-track.jpg',
    duration: '30:15',
    views: 156000,
    uploadedAt: '3 ngày trước',
    audioUrl: '/sample-audio.mp3',
  },
  {
    id: '4',
    title: 'Thám hiểm rừng sâu - Chương mở đầu',
    uploader: 'Adventure Audio',
    thumbnail: '/placeholder-track.jpg',
    duration: '35:45',
    views: 67000,
    uploadedAt: '5 ngày trước',
    audioUrl: '/sample-audio.mp3',
  },
  {
    id: '5',
    title: 'Khoa học viễn tưởng - Tương lai xa',
    uploader: 'SciFi Stories',
    thumbnail: '/placeholder-track.jpg',
    duration: '40:10',
    views: 98000,
    uploadedAt: '1 tuần trước',
    audioUrl: '/sample-audio.mp3',
  },
  {
    id: '6',
    title: 'Lịch sử Việt Nam - Thời kỳ độc lập',
    uploader: 'Lịch sử Việt',
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
    uploader: 'Channel Audio Story',
  },
  {
    id: 'p2',
    title: 'Phiêu lưu và khám phá',
    description: 'Cuộc phiêu lưu đầy thú vị và bất ngờ',
    thumbnail: '/placeholder-track.jpg',
    trackCount: 18,
    uploader: 'Adventure Audio',
  },
];

const categories = [
  'Tất cả',
  'Tình cảm',
  'Phiêu lưu',
  'Kinh dị',
  'Lịch sử',
  'Khoa học viễn tưởng',
  'Giáo dục',
];

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
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [viewMode] = useState<'grid' | 'list'>('grid');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleTrackClick = (id: string) => {
    navigate(`/track/${id}`);
  };

  const handlePlay = (id: string) => {
    console.log('Play track:', id);
    // Start playing audio
  };

  const handleAddToPlaylist = (id: string) => {
    console.log('Add track to playlist:', id);
    // Open playlist selector
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 20, pt: 3 }}>
      {/* Hero Section */}
      <Box
        sx={{
          mb: 6,
          p: 4,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
          Chào mừng đến với AudioStory
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
          Khám phá hàng ngàn track audio hay nhất
        </Typography>
        <Button
          variant="contained"
          size="large"
          endIcon={<ArrowForward />}
          sx={{
            bgcolor: 'white',
            color: 'primary.main',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.9)',
            },
          }}
        >
          Khám phá ngay
        </Button>
      </Box>

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
          <Tab label="Tracks" />
          <Tab label="Playlists" />
          <Tab label="Đang phát" />
        </Tabs>
      </Box>

      {/* Categories */}
      <Stack
        direction="row"
        spacing={1}
        sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}
      >
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            clickable
            onClick={() => setSelectedCategory(cat)}
            color={selectedCategory === cat ? 'primary' : 'default'}
            variant={selectedCategory === cat ? 'filled' : 'outlined'}
          />
        ))}
      </Stack>

      {/* Tab Panel: Tracks */}
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography variant="h5" component="h2" fontWeight={600}>
              Tracks mới nhất
            </Typography>
            <Button endIcon={<ArrowForward />} color="primary">
              Xem tất cả
            </Button>
          </Box>

          {viewMode === 'grid' ? (
            <Grid container spacing={3}>
              {tracks.map((track) => (
                <Grid item xs={6} sm={4} md={3} lg={2.4} key={track.id}>
                  <TrackCard
                    track={track}
                    onClick={handleTrackClick}
                    onPlay={handlePlay}
                    onAddToPlaylist={handleAddToPlaylist}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
              {tracks.map((track, index) => (
                <TrackListItem
                  key={track.id}
                  track={track}
                  index={index}
                  onClick={handleTrackClick}
                  onPlay={handlePlay}
                  onAddToPlaylist={handleAddToPlaylist}
                />
              ))}
            </List>
          )}
        </Box>

        {/* Trending Tracks */}
        <Box>
          <Typography variant="h5" component="h2" fontWeight={600} mb={3}>
            Đang thịnh hành
          </Typography>
          <Grid container spacing={3}>
            {tracks.slice(0, 4).map((track) => (
              <Grid item xs={6} sm={4} md={3} lg={3} key={track.id}>
                <TrackCard
                  track={track}
                  onClick={handleTrackClick}
                  onPlay={handlePlay}
                  onAddToPlaylist={handleAddToPlaylist}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </TabPanel>

      {/* Tab Panel: Playlists */}
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
              >
                <Box
                  sx={{
                    position: 'relative',
                    paddingTop: '56.25%', // 16:9
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
                      top: 8,
                      right: 8,
                      bgcolor: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    <PlayArrow fontSize="small" />
                    <Typography variant="caption" fontWeight={600}>
                      {playlist.trackCount}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {playlist.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {playlist.uploader}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {playlist.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Tab Panel: Đang phát */}
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Chưa có track nào đang phát
          </Typography>
          <Button
            variant="contained"
            startIcon={<PlayArrow />}
            sx={{ mt: 2 }}
          >
            Khám phá tracks
          </Button>
        </Box>
      </TabPanel>
    </Container>
  );
};

export default Home;
