// src/pages/TrackDetails/TrackDetailsPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { Track } from '../../types/Track'; // Import kiểu dữ liệu đầy đủ

// MOCK DATA cho một Track chi tiết (cần các trường chi tiết theo Track.ts)
const getMockTrackById = (id: number): Track | undefined => {
  // Đây là dữ liệu giả định với các trường chi tiết
  const fullTracks: Track[] = [
    {
      id: 1,
      title: "Chuyện tình mùa đông",
      audioUrl: "sample.mp3",
      uploadedAt: "2 ngày trước",
      categoryName: "Tình cảm",
      channelName: "Channel Audio Story",
      originalStoryName: "Chuyện tình mùa đông",
      tagNames: ["Tình cảm", "Lãng mạn"],
      // Thêm các trường chi tiết từ interface Track
      categoryList: { id: 1, name: "Tình cảm", description: "Mô tả thể loại" },
      channelList: { id: 101, name: "Channel Audio Story" },
      originalStoryList: { id: 201, storyName: "Chuyện tình mùa đông", writerName: "Tác giả A" },
      tagLists: [{ id: 1, name: "Tình cảm", description: "Mô tả tag" }],
    },
    // ... có thể thêm track ID: 2, 3, ...
  ];
  return fullTracks.find(t => t.id === id);
};

const TrackDetailsPage: React.FC = () => {
  // 1. Lấy ID từ URL
  const { id } = useParams<{ id: string }>(); 
  const trackId = Number(id);

  // 2. Fetch data (hiện tại dùng Mock)
  const track = getMockTrackById(trackId); 

  if (!track) {
    return (
      <Container maxWidth="xl" sx={{ pt: 3 }}>
        <Typography variant="h5" color="error">Không tìm thấy Track (ID: {id}).</Typography>
      </Container>
    );
  }

  // 3. Render giao diện
  return (
    <Container maxWidth="xl" sx={{ pb: 12, pt: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        
        {/* Phần Thumbnail và Nút Play */}
        <Box sx={{ flexShrink: 0, width: { xs: '100%', md: 300 } }}>
          <Box
            component="img"
            src={track.thumbnail || "/placeholder-track.jpg"}
            alt={track.title}
            sx={{ width: '100%', aspectRatio: '1/1', borderRadius: 2, objectFit: 'cover' }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<PlayArrow />}
            fullWidth
            sx={{ mt: 2, py: 1.5 }}
            onClick={() => console.log(`Playing track ${track.id}`)}
          >
            Nghe ngay
          </Button>
        </Box>

        {/* Phần Chi tiết Track */}
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            {track.title}
          </Typography>
          
          <Typography variant="subtitle1" color="text.secondary" mb={0.5}>
            Kênh: <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>{track.channelName}</Box>
          </Typography>
          
          <Typography variant="subtitle1" color="text.secondary" mb={2}>
            Truyện gốc: <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>{track.originalStoryName}</Box>
            &nbsp;({track.originalStoryList.writerName})
          </Typography>

          <Typography variant="h6" fontWeight={600} mb={1}>
            Tags
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {track.tagNames.map(tag => (
              <Button key={tag} variant="outlined" size="small">
                {tag}
              </Button>
            ))}
          </Box>
          
          <Typography variant="body2" color="text.secondary" mt={2}>
            Đã đăng: {track.uploadedAt}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default TrackDetailsPage;