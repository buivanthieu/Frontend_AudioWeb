// src/components/TrackCard/TrackCard.tsx
import React from "react";
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
} from "@mui/material";
import {
  PlayArrow,
  MoreVert,
  PlaylistAdd,
  FavoriteBorder,
  Share,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

interface TrackCardProps {
  track: {
    id: number;
    title: string;
    audioUrl: string;
    uploadedAt: string;
    categoryName: string;
    channelName: string;
    originalStoryName: string;
    tagNames: string[];
    thumbnail?: string;
  };
  onPlay?: (id: number) => void;
  onAddToPlaylist?: (id: number) => void;
  onClick?: (id: number) => void;
}

const StyledCard = styled(Card)({
  position: "relative",
  cursor: "pointer",
  "&:hover .play-overlay": { opacity: 1 },
  "&:hover .more-menu": { opacity: 1 },
});

const PlayOverlay = styled(Box)({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0,0.55)",
  opacity: 0,
  transition: "opacity .25s",
  zIndex: 2,
});

const TrackCard: React.FC<TrackCardProps> = ({
  track,
  onPlay,
  onAddToPlaylist,
  onClick,
}) => {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const openMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnchor(e.currentTarget as HTMLElement );
  };

  const closeMenu = () => setAnchor(null);

  return (
    <>
      <StyledCard onClick={() => onClick?.(track.id)}>
        <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
          <CardMedia
            component="img"
            image={track.thumbnail || "/placeholder-track.jpg"}
            alt={track.title}
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          <PlayOverlay className="play-overlay">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onPlay?.(track.id);
              }}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              <PlayArrow fontSize="large" />
            </IconButton>
          </PlayOverlay>

          <Box
            className="more-menu"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              opacity: 0,
              transition: "0.2s",
            }}
          >
            <IconButton
              size="small"
              sx={{
                bgcolor: "rgba(0,0,0,0.6)",
                color: "white",
                "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
              }}
              onClick={openMenu}
            >
              <MoreVert />
            </IconButton>
          </Box>
        </Box>

        <CardContent sx={{ p: 1.5 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              mb: 0.5,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {track.title}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {track.uploadedAt}
          </Typography>
        </CardContent>
      </StyledCard>

      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={closeMenu}>
        <MenuItem
          onClick={() => {
            onAddToPlaylist?.(track.id);
            closeMenu();
          }}
        >
          <ListItemIcon>
            <PlaylistAdd fontSize="small" />
          </ListItemIcon>
          <ListItemText>Thêm vào playlist</ListItemText>
        </MenuItem>

        <MenuItem onClick={closeMenu}>
          <ListItemIcon>
            <FavoriteBorder fontSize="small" />
          </ListItemIcon>
          <ListItemText>Yêu thích</ListItemText>
        </MenuItem>

        <MenuItem onClick={closeMenu}>
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
