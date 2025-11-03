import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import {
  PlayArrow,
  MoreVert,
  PlaylistAdd,
  FavoriteBorder,
  Share,
} from '@mui/icons-material';

interface TrackListItemProps {
  track: {
    id: string;
    title: string;
    uploader: string;
    uploaderId?: string;
    thumbnail?: string;
    duration: string;
    views?: number;
    uploadedAt?: string;
  };
  index?: number;
  isPlaying?: boolean;
  onPlay?: (id: string) => void;
  onAddToPlaylist?: (id: string) => void;
  onClick?: (id: string) => void;
}

const TrackListItem: React.FC<TrackListItemProps> = ({
  track,
  index,
  isPlaying = false,
  onPlay,
  onAddToPlaylist,
  onClick,
}) => {
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay?.(track.id);
  };

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setMenuAnchor(e.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleAddToPlaylist = () => {
    onAddToPlaylist?.(track.id);
    handleMenuClose();
  };

  const formatViews = (views?: number) => {
    if (!views) return '';
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  return (
    <>
      <ListItem
        onClick={() => onClick?.(track.id)}
        sx={{
          '&:hover': {
            bgcolor: 'action.hover',
          },
          cursor: 'pointer',
          borderRadius: 1,
          mb: 0.5,
        }}
        secondaryAction={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: { xs: 'none', md: 'block' }, minWidth: 60, textAlign: 'right' }}
            >
              {track.duration}
            </Typography>
            <IconButton
              edge="end"
              onClick={handleMenuOpen}
              size="small"
            >
              <MoreVert />
            </IconButton>
          </Box>
        }
      >
        {index !== undefined && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              minWidth: 32,
              textAlign: 'center',
              fontWeight: isPlaying ? 600 : 400,
              color: isPlaying ? 'primary.main' : 'text.secondary',
            }}
          >
            {isPlaying ? (
              <PlayArrow fontSize="small" />
            ) : (
              index + 1
            )}
          </Typography>
        )}

        <ListItemAvatar sx={{ minWidth: 120 }}>
          <Box
            component="img"
            src={track.thumbnail || '/placeholder-track.jpg'}
            alt={track.title}
            sx={{
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: 1,
              objectFit: 'cover',
              cursor: 'pointer',
            }}
            onClick={handlePlay}
          />
        </ListItemAvatar>

        <ListItemText
          primary={
            <Typography
              variant="body1"
              sx={{
                fontWeight: isPlaying ? 600 : 400,
                color: isPlaying ? 'primary.main' : 'text.primary',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {track.title}
            </Typography>
          }
          secondary={
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
              <Typography
                variant="caption"
                color="text.secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  if (track.uploaderId) {
                    navigate(`/channel/${track.uploaderId}`);
                  }
                }}
                sx={{
                  cursor: track.uploaderId ? 'pointer' : 'default',
                  '&:hover': track.uploaderId
                    ? {
                        color: 'primary.main',
                        textDecoration: 'underline',
                      }
                    : {},
                }}
              >
                {track.uploader}
              </Typography>
              {track.views && (
                <>
                  <Typography variant="caption" color="text.secondary">•</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatViews(track.views)} lượt nghe
                  </Typography>
                </>
              )}
              {track.uploadedAt && (
                <>
                  <Typography variant="caption" color="text.secondary">•</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {track.uploadedAt}
                  </Typography>
                </>
              )}
            </Box>
          }
        />
      </ListItem>

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

export default TrackListItem;

