// src/pages/Home.tsx

import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Grid, Stack, Chip, Button, Tabs, Tab, List,
} from '@mui/material';
import { ArrowForward, PlayArrow } from '@mui/icons-material';

// Import DTOs và Component cần thiết

import { Track, TrackList } from '../../types/Track';
import { Playlist } from '../../types/Playlist';
import TrackCard from '../../components/TrackCard/TrackCard';
import TrackListItem from '../../components/TrackListItem/TrackListItem';

// Giờ đây, các mảng Mock Data đã được gán kiểu TypeScript!
interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}
const mockTracks: TrackList[] = [
  // Cấu trúc y hệt code mẫu bạn gửi, nhưng đã có kiểu Track[]
  {
    id: 1,
    title: 'Chuyện tình mùa đông',
    audioUrl: '/sample-audio.mp3',
    uploadedAt: '2 ngày trước',
    categoryName: 'Tình cảm',
    channelName: 'Channel Audio Story',
    originalStoryName: 'Chuyện tình mùa đông',
    tagNames: ['Tình cảm', 'Lãng mạn'],
  },
  {
    id: 2,
    title: 'Hành trình phiêu lưu',
    audioUrl: '/sample-audio.mp3',
    uploadedAt: '5 ngày trước',
    categoryName: 'Phiêu lưu',
    channelName: 'Người kể chuyện',
    originalStoryName: 'Hành trình phiêu lưu',
    tagNames: ['Phiêu lưu', 'Kỳ thú'],
  },
  {
    id: 3,
    title: 'Bí ẩn rừng sâu',
    audioUrl: '/sample-audio.mp3',
    uploadedAt: '1 tuần trước',
    categoryName: 'Kinh dị',
    channelName: 'Kênh Truyện Ma',
    originalStoryName: 'Bí ẩn rừng sâu',
    tagNames: ['Kinh dị', 'Huyền bí'],
  }


];

const mockPlaylists: Playlist[] = [
    // Tương tự, gán kiểu Playlist[]
    { id: 'p1', title: 'Tuyển tập truyện tình cảm hay nhất', description: 'Những câu chuyện tình yêu lãng mạn và cảm động', thumbnail: '/placeholder-track.jpg', trackCount: 25, uploader: 'Channel Audio Story' },
    { id: 'p2', title: 'Phiêu lưu và khám phá', description: 'Cuộc phiêu lưu đầy thú vị và bất ngờ', thumbnail: '/placeholder-track.jpg', trackCount: 18, uploader: 'Adventure Audio' },
];

const categories: string[] = [
  'Tất cả', 'Tình cảm', 'Phiêu lưu', 'Kinh dị', 'Lịch sử', 'Khoa học viễn tưởng', 'Giáo dục',
];
// --- Khối dữ liệu Mock và định nghĩa cơ bản kết thúc ---

function TabPanel(props: TabPanelProps) { // Sử dụng Interface TabPanelProps đã định nghĩa
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index} // KEY: Ẩn/hiện nội dung dựa trên State
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {/* Chỉ hiển thị nội dung (children) nếu State 'value' khớp với 'index' của Tab hiện tại */}
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>} 
    </div>
  );
}

const Home: React.FC = () => {
    // 1. HOOKS: Bộ não của Component
    
    // useNavigate: Hook để chuyển trang (routing)
    const navigate = useNavigate(); 
    
    // useState: Quản lý State cục bộ
    const [tabValue, setTabValue] = useState(0); // Tab đang được chọn (Tracks=0, Playlists=1)
    const [selectedCategory, setSelectedCategory] = useState('Tất cả'); // Category đang được chọn
    // const [viewMode] = useState<'grid' | 'list'>('grid'); // Mode hiển thị (Grid/List)

    // Event Handlers: Logic khi có tương tác người dùng
    
    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        // Cập nhật State Tab
        setTabValue(newValue); 
    };

    const handleTrackClick = (id: string) => {
        // Logic Routing: Chuyển đến trang chi tiết Track
        navigate(`/track/${id}`); 
        // Khi người dùng click vào Card/Item, họ được đưa đến URL đó.
    };

    const handlePlay = (id: string) => {
        // Logic Player: Sau này sẽ gọi Global Player Store ở đây
        console.log('Play track:', id); 
    };

    const handleAddToPlaylist = (id: string) => {
        console.log('Add track to playlist:', id);
    };

    // 2. JSX/MUI: Cấu trúc Giao diện (Phần return)

    return (
        <Container maxWidth="xl" sx={{ pb: 20, pt: 3 }}>
            
            {/* Hero Section (Box, Typography, Button) */}
            <Box /* ... style ... */>
                <Typography variant="h3" component="h1" /* ... */>
                    Chào mừng đến với AudioStory
                </Typography>
                {/* ... */}
            </Box>

            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={tabValue} onChange={handleTabChange} /* ... */>
                    <Tab label="Tracks" />
                    <Tab label="Playlists" />
                    <Tab label="Đang phát" />
                </Tabs>
            </Box>

            {/* Categories (Stack, Chip, map) */}
            <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}>
                {/* Vòng lặp map: Tạo các Chip dựa trên mảng categories */}
                {categories.map((cat) => (
                    <Chip
                        key={cat}
                        label={cat}
                        clickable
                        onClick={() => setSelectedCategory(cat)} // Cập nhật State
                        color={selectedCategory === cat ? 'primary' : 'default'}
                        variant={selectedCategory === cat ? 'filled' : 'outlined'}
                    />
                ))}
            </Stack>

            {/* Nội dung Tab 1: Tracks */}
            <TabPanel value={tabValue} index={0}>
                
                {/* Section Tracks mới nhất (Grid, map) */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" component="h2" fontWeight={600} mb={3}>
                        Tracks mới nhất
                    </Typography>
                    
                    {/* Grid Layout và Vòng lặp */}
                    <Grid columns={12} spacing={3}>
                        {mockTracks.map((track) => (
                            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={track.id}>
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
                {/* Section Tracks Thịnh hành... (Tương tự) */}
            </TabPanel>

            {/* Nội dung Tab 2: Playlists */}
            <TabPanel value={tabValue} index={1}>
                {/* ... Tương tự, sử dụng mockPlaylists.map ... */}
            </TabPanel>

            {/* Nội dung Tab 3: Đang phát */}
            <TabPanel value={tabValue} index={2}>
                {/* ... */}
            </TabPanel>
        </Container>
    );
};

export default Home;