// src/pages/Home/Home.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  Stack,
  Chip,
  Tabs,
  Tab,
} from "@mui/material";

import TrackCard from "../../components/Track/TrackCard";
import { TrackList } from "../../types/Track";

// Loại bỏ AuthModal và UserMenu vì chúng đã ở Header.tsx

const mockTracks: TrackList[] = [
  {
    id: 1,
    title: "Chuyện tình mùa đông",
    audioUrl: "sample.mp3",
    uploadedAt: "2 ngày trước",
    categoryName: "Tình cảm",
    channelName: "Channel Audio Story",
    originalStoryName: "Chuyện tình mùa đông",
    tagNames: ["Tình cảm", "Lãng mạn"],
  },
  {
    id: 2,
    title: "Hành trình phiêu lưu",
    audioUrl: "sample.mp3",
    uploadedAt: "5 ngày trước",
    categoryName: "Phiêu lưu",
    channelName: "Người kể chuyện",
    originalStoryName: "Hành trình phiêu lưu",
    tagNames: ["Phiêu lưu", "Kỳ thú"],
  },
  {
    id: 3,
    title: "Bí ẩn rừng sâu",
    audioUrl: "sample.mp3",
    uploadedAt: "1 tuần trước",
    categoryName: "Kinh dị",
    channelName: "Kênh Truyện Ma",
    originalStoryName: "Bí ẩn rừng sâu",
    tagNames: ["Kinh dị", "Huyền bí"],
  },
];

const categories = [
  "Tất cả",
  "Tình cảm",
  "Phiêu lưu",
  "Kinh dị",
  "Lịch sử",
  "Khoa học viễn tưởng",
  "Giáo dục",
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [tab, setTab] = useState(0);
  const [category, setCategory] = useState("Tất cả");

  const handleTrackClick = (id: number) => navigate(`/track/${id}`);

  return (
    <Container maxWidth="xl" sx={{ pb: 12, pt: 3 }}>
        
        {/* Đã loại bỏ phần hiển thị nút Đăng nhập/UserMenu */}
        <Typography variant="h4" fontWeight={700} mb={2}>
            Chào mừng đến với AudioStory
        </Typography>
        
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Tracks" />
        <Tab label="Playlists" />
      </Tabs>

      <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: "wrap", gap: 1 }}>
        {categories.map((c) => (
          <Chip
            key={c}
            label={c}
            clickable
            onClick={() => setCategory(c)}
            color={category === c ? "primary" : "default"}
            variant={category === c ? "filled" : "outlined"}
          />
        ))}
      </Stack>

      {tab === 0 && (
        <>
          <Typography variant="h5" fontWeight={600} mb={2}>
            Tracks mới nhất
          </Typography>

          <Grid container spacing={3}>
            {mockTracks.map((t) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={t.id} component={'div' as any}>
                <TrackCard
                  track={t}
                  onClick={handleTrackClick}
                  onPlay={(id) => console.log("play", id)}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {tab === 1 && <Typography>Playlists sẽ để sau...</Typography>}
      
      {/* Đã loại bỏ AuthModal và TrackUploadModal */}
    </Container>
  );
};

export default Home;