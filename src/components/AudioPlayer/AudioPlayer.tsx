import React, { useState, useRef, useEffect } from 'react';
import {
  Paper,
  IconButton,
  Slider,
  Typography,
  Box,
  Stack,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  VolumeUp,
  VolumeOff,
  Repeat,
  RepeatOne,
  Shuffle,
  Speed,
  PlaylistPlay,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const PlayerContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(1.5, 2),
  borderRadius: 0,
  background: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  zIndex: 1000,
}));

const TinyText = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  opacity: 0.7,
  fontWeight: 500,
  letterSpacing: 0.2,
}));

interface AudioPlayerProps {
  currentTrack?: {
    id: string;
    title: string;
    uploader: string;
    thumbnail?: string;
    audioUrl?: string;
    duration?: string;
  };
  onNext?: () => void;
  onPrevious?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  currentTrack,
  onNext,
  onPrevious,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [shuffle, setShuffle] = useState(false);
  const [speedMenuAnchor, setSpeedMenuAnchor] = useState<null | HTMLElement>(null);

  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (_event: Event, newValue: number | number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newValue as number;
      setCurrentTime(newValue as number);
    }
  };

  const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
    const vol = newValue as number;
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol / 100;
      setIsMuted(vol === 0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSpeedClick = (event: React.MouseEvent<HTMLElement>) => {
    setSpeedMenuAnchor(event.currentTarget);
  };

  const handleSpeedClose = (rate?: number) => {
    if (rate !== undefined && audioRef.current) {
      audioRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
    setSpeedMenuAnchor(null);
  };

  const toggleRepeat = () => {
    const modes: ('off' | 'all' | 'one')[] = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setRepeatMode(nextMode);
  };

  useEffect(() => {
    if (currentTrack?.audioUrl && audioRef.current) {
      audioRef.current.src = currentTrack.audioUrl;
      audioRef.current.load();
    }
  }, [currentTrack?.audioUrl]);

  if (!currentTrack) {
    return null;
  }

  return (
    <>
      <PlayerContainer elevation={4}>
        <Stack spacing={2}>
          {/* Progress bar */}
          <Box>
            <Slider
              size="small"
              value={currentTime}
              min={0}
              max={duration || 100}
              onChange={handleSeek}
              sx={{
                color: 'primary.main',
                '& .MuiSlider-thumb': {
                  width: 12,
                  height: 12,
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: -1 }}>
              <TinyText>{formatTime(currentTime)}</TinyText>
              <TinyText>{formatTime(duration)}</TinyText>
            </Box>
          </Box>

          {/* Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Track info */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1, minWidth: 0 }}>
              {currentTrack.thumbnail && (
                <Box
                  component="img"
                  src={currentTrack.thumbnail}
                  alt={currentTrack.title}
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1,
                    objectFit: 'cover',
                  }}
                />
              )}
              <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                <Typography variant="subtitle2" noWrap>
                  {currentTrack.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {currentTrack.uploader}
                </Typography>
              </Box>
            </Box>

            {/* Playback controls */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <IconButton
                size="small"
                onClick={() => setShuffle(!shuffle)}
                color={shuffle ? 'primary' : 'default'}
              >
                <Shuffle fontSize="small" />
              </IconButton>

              <IconButton size="small" onClick={onPrevious}>
                <SkipPrevious />
              </IconButton>

              <IconButton
                size="large"
                onClick={handlePlayPause}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  width: 48,
                  height: 48,
                }}
              >
                {isPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>

              <IconButton size="small" onClick={onNext}>
                <SkipNext />
              </IconButton>

              <IconButton
                size="small"
                onClick={toggleRepeat}
                color={repeatMode === 'off' ? 'default' : 'primary'}
              >
                {repeatMode === 'one' ? <RepeatOne /> : <Repeat />}
              </IconButton>
            </Box>

            {/* Volume and speed */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton size="small" onClick={handleSpeedClick}>
                <Speed fontSize="small" />
              </IconButton>
              <Chip
                label={`${playbackRate}x`}
                size="small"
                variant="outlined"
                sx={{ minWidth: 50 }}
              />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: 100 }}>
                <IconButton size="small" onClick={toggleMute}>
                  {isMuted ? <VolumeOff /> : <VolumeUp />}
                </IconButton>
                <Slider
                  size="small"
                  value={volume}
                  onChange={handleVolumeChange}
                  sx={{ width: 60 }}
                />
              </Box>

              <IconButton size="small">
                <PlaylistPlay fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Stack>
      </PlayerContainer>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      >
        {/* Audio track for accessibility */}
        <track kind="captions" />
      </audio>

      {/* Speed menu */}
      <Menu
        anchorEl={speedMenuAnchor}
        open={Boolean(speedMenuAnchor)}
        onClose={() => handleSpeedClose()}
      >
        {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
          <MenuItem
            key={rate}
            onClick={() => handleSpeedClose(rate)}
            selected={playbackRate === rate}
          >
            <ListItemText primary={`${rate}x`} />
            {playbackRate === rate && <ListItemIcon>✓</ListItemIcon>}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default AudioPlayer;

