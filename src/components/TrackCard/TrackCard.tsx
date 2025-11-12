import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  PlayArrow,
  MoreVert,
  PlaylistAdd,
  FavoriteBorder,
  Share,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  cursor: 'pointer',
  '&:hover .play-overlay': {
    opacity: 1,
  },
  '&:hover .more-menu': {
    opacity: 1,
  },
}));

const PlayOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
  zIndex: 1,
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  paddingTop: '56.25%', // 16:9 aspect ratio (like YouTube)
  overflow: 'hidden',
  borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
}));

interface TrackCardProps {
  track: {
    // id: string;
    // title: string;
    // uploader: string;
    // uploaderId?: string;
    // thumbnail?: string;
    // duration: string; // e.g., "15:30"
    // views?: number;
    // uploadedAt?: string;
    // audioUrl?: string;
      id: number;
    title: string;
    audioUrl: string;

    uploadedAt: string; 

    categoryName: string;
    channelName: string;
    originalStoryName: string;

    tagNames: string[];
  };
  onPlay?: (id: string) => void;
  onAddToPlaylist?: (id: string) => void;
  onClick?: (id: string) => void;
}

const TrackCard: React.FC<TrackCardProps> = ({
  track,
  onPlay,
  onAddToPlaylist,
  onClick,
}) => {
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay?.(String(track.id));
  };

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setMenuAnchor(e.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleAddToPlaylist = () => {
    onAddToPlaylist?.(String(track.id));
    handleMenuClose();
  };

  const formatViews = (views?: number) => {
    if (!views) return '';
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M lượt nghe`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K lượt nghe`;
    return `${views} lượt nghe`;
  };

  return (
    <>
      <StyledCard onClick={() => onClick?.(String(track.id))}>
        <ImageContainer>
          <CardMedia
            component="img"
            // image={track.thumbnail || '/placeholder-track.jpg'}
            alt={track.title}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <PlayOverlay className="play-overlay">
            <IconButton
              size="large"
              onClick={handlePlay}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              <PlayArrow fontSize="large" />
            </IconButton>
          </PlayOverlay>
          
          {/* Duration badge */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              bgcolor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            {/* {track.duration} */}
          </Box>

          {/* More menu button */}
          <Box
            className="more-menu"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            <IconButton
              size="small"
              onClick={handleMenuOpen}
              sx={{
                bgcolor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.8)',
                },
              }}
            >
              <MoreVert />
            </IconButton>
          </Box>
        </ImageContainer>

        <CardContent sx={{ p: 1.5 }}>
          <Typography
            variant="subtitle2"
            component="h3"
            sx={{
              fontWeight: 600,
              mb: 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.4,
            }}
          >
            {track.title}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: 'block',
              mb: 0.5,
              cursor: 'pointer',
              '&:hover': {
                color: 'primary.main',
                textDecoration: 'underline',
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              // if (track.uploaderId) {
              //   navigate(`/channel/${track.uploaderId}`);
              // }
            }}
          >
            {/* {track.uploader} */}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            {/* {track.views && (
              <Typography variant="caption" color="text.secondary">
                {formatViews(track.views)}
              </Typography>
            )} */}
            {track.uploadedAt && (
              <>
                <Typography variant="caption" color="text.secondary">•</Typography>
                <Typography variant="caption" color="text.secondary">
                  {track.uploadedAt}
                </Typography>
              </>
            )}
          </Box>
        </CardContent>
      </StyledCard>

      {/* More menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleAddToPlaylist}>
          <ListItemIcon>
            <PlaylistAdd fontSize="small" />
          </ListItemIcon>
          <ListItemText>Thêm vào playlist</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <FavoriteBorder fontSize="small" />
          </ListItemIcon>
          <ListItemText>Thêm vào yêu thích</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Share fontSize="small" />
          </ListItemIcon>
          <ListItemText>Chia sẻ</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default TrackCard;

