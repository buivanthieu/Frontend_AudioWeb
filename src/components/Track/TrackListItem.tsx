import React from "react";
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
  useTheme, // Thêm useTheme để sử dụng theme
} from "@mui/material";
import { PlayArrow, MoreVert, PlaylistAdd, FavoriteBorder, Share } from "@mui/icons-material";

// Cập nhật TrackListItemProps để chấp nhận prop mới
interface TrackListItemProps {
  track: {
    id: number;
    title: string;
    uploadedAt: string;
    thumbnail?: string;
  };
  index?: number;
  onPlay?: (id: number) => void;
  onAddToPlaylist?: (id: number) => void;
  onClick?: (id: number) => void;
  // <---- BỔ SUNG PROP NÀY ---->
  secondaryActionContent?: React.ReactNode; 
}

const TrackListItem: React.FC<TrackListItemProps> = ({
  track,
  index,
  onPlay,
  onAddToPlaylist,
  onClick,
  // Lấy prop mới
  secondaryActionContent, 
}) => {
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const theme = useTheme(); // Sử dụng theme cho màu nền

  const openMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnchor(e.currentTarget as HTMLElement);
  };

  const closeMenu = () => setAnchor(null);

  return (
    <>
      <ListItem
        onClick={() => onClick?.(track.id)}
        sx={{
          borderRadius: 1,
          mb: 1,
          p: 1,
          transition: "background-color 0.2s",
          "&:hover": {
            backgroundColor: theme.palette.action.hover, // Sử dụng màu nền khi hover từ theme
          },
          cursor: "pointer",
        }}
        // <---- CHỈNH SỬA secondaryAction Ở ĐÂY ---->
        secondaryAction={
            secondaryActionContent ? (
                // Nếu có prop tùy chỉnh, hiển thị nội dung đó
                secondaryActionContent
            ) : (
                // Nếu không, hiển thị nút Menu mặc định
                <IconButton size="small" onClick={openMenu}>
                    <MoreVert />
                </IconButton>
            )
        }
      >
        {index !== undefined && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mr: 1, width: 20, textAlign: "center", flexShrink: 0 }}
          >
            {index + 1}
          </Typography>
        )}
        <ListItemAvatar sx={{ minWidth: 56, mr: 1 }}>
          <Box
            component="img"
            src={track.thumbnail || "/placeholder.jpg"}
            alt={track.title}
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1,
              objectFit: "cover",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onPlay?.(track.id);
            }}
          />
        </ListItemAvatar>

        <ListItemText
          primary={
            <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
              {track.title}
            </Typography>
          }
          secondary={
            <Typography variant="caption" color="text.secondary">
              {track.uploadedAt}
            </Typography>
          }
        />
      </ListItem>

      {/* Menu mặc định vẫn giữ nguyên */}
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

export default TrackListItem;