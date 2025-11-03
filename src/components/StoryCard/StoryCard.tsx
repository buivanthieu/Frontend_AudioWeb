import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Stack,
} from '@mui/material';
import {
  PlayArrow,
  FavoriteBorder,
  Favorite,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  '&:hover .play-overlay': {
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
  borderRadius: theme.shape.borderRadius,
  zIndex: 1,
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  paddingTop: '150%', // 2:3 aspect ratio
  overflow: 'hidden',
  borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
}));

interface StoryCardProps {
  story: {
    id: string;
    title: string;
    author: string;
    coverImage?: string;
    description?: string;
    duration?: string;
    chapters?: number;
    category?: string;
    rating?: number;
    isFavorite?: boolean;
  };
  onPlay?: (id: string) => void;
  onFavorite?: (id: string) => void;
  onClick?: (id: string) => void;
}

const StoryCard: React.FC<StoryCardProps> = ({
  story,
  onPlay,
  onFavorite,
  onClick,
}) => {
  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay?.(story.id);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite?.(story.id);
  };

  return (
    <StyledCard onClick={() => onClick?.(story.id)}>
      <ImageContainer>
        <CardMedia
          component="img"
          image={story.coverImage || '/placeholder-story.jpg'}
          alt={story.title}
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
        {story.category && (
          <Chip
            label={story.category}
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              bgcolor: 'primary.main',
              color: 'white',
            }}
          />
        )}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            gap: 0.5,
            zIndex: 2,
          }}
        >
          <IconButton
            size="small"
            onClick={handleFavorite}
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              color: story.isFavorite ? 'secondary.main' : 'white',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            {story.isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Box>
      </ImageContainer>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            mb: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {story.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          {story.author}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          {story.rating && (
            <Typography variant="caption" color="warning.main">
              ⭐ {story.rating.toFixed(1)}
            </Typography>
          )}
          {story.duration && (
            <Typography variant="caption" color="text.secondary">
              • {story.duration}
            </Typography>
          )}
          {story.chapters && (
            <Typography variant="caption" color="text.secondary">
              • {story.chapters} chương
            </Typography>
          )}
        </Stack>

        {story.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {story.description}
          </Typography>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default StoryCard;

