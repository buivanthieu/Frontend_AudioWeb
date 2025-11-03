import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme/theme';
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import Home from './pages/Home';
import TrackDetail from './pages/TrackDetail';
import Channel from './pages/Channel';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';

// Mock current playing track - sẽ được quản lý bằng state/context sau
const mockCurrentTrack = {
  id: '1',
  title: 'Tuyển tập truyện audio hay nhất - Tập 1',
  uploader: 'Channel Audio Story',
  thumbnail: '/placeholder-track.jpg',
  duration: '25:30',
  audioUrl: '/sample-audio.mp3',
};

function App() {
  const [currentTrack, setCurrentTrack] = useState(mockCurrentTrack);

  // TODO: Implement audio state management with Context API or Redux
  // const handlePlayTrack = (track: any) => setCurrentTrack(track);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/track/:id" element={<TrackDetail />} />
            <Route path="/channel/:id" element={<Channel />} />
            <Route path="/user/:id" element={<Channel />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Add more routes later */}
          </Routes>
          <Navigation />
          <AudioPlayer currentTrack={currentTrack} />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
