import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  IconButton,
  Avatar,
  Divider,
  TextField,
  Stack,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  ThumbUp,
  ThumbUpOutlined,
  ThumbDown,
  ThumbDownOutlined,
  Share,
  MoreVert,
  PlaylistAdd,
  Reply,
  Subscriptions,
  NotificationsNone,
  ArrowBack,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import TrackCard from '../components/TrackCard/TrackCard';
import TrackListItem from '../components/TrackListItem/TrackListItem';

const PlayerSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: '56.25%', // 16:9 aspect ratio
  backgroundColor: '#000',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  mb: 3,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: 18,
  px: 2,
  fontWeight: 600,
}));

const TrackDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [commentText, setCommentText] = useState('');

  // Mock data - sẽ thay bằng API call
  const track = {
    id: id || '1',
    title: 'Tuyển tập truyện audio hay nhất - Tập 1 | Audio Story Collection',
    uploader: 'Channel Audio Story',
    uploaderId: 'channel-1',
    uploaderAvatar: '/placeholder-avatar.jpg',
    thumbnail: '/placeholder-track.jpg',
    duration: '25:30',
    views: 125000,
    uploadedAt: '2 ngày trước',
    description: `Đây là tuyển tập các truyện audio hay nhất được chọn lọc kỹ lưỡng. 
    
Các truyện trong playlist này bao gồm nhiều thể loại khác nhau như tình cảm, phiêu lưu, và nhiều câu chuyện hấp dẫn khác.

Hãy subscribe và like để ủng hộ kênh nhé! 🔔`,
    audioUrl: '/sample-audio.mp3',
    likes: 12500,
    dislikes: 250,
    subscribers: 50000,
    category: 'Tình cảm',
    tags: ['audio', 'truyện', 'tuyển tập', 'hay nhất'],
  };

  const comments = [
    {
      id: 'c1',
      author: 'Nguyễn Văn A',
      authorAvatar: '/placeholder-avatar.jpg',
      text: 'Track này hay quá! Cảm ơn uploader nhiều ❤️',
      likes: 125,
      replies: 5,
      postedAt: '1 giờ trước',
    },
    {
      id: 'c2',
      author: 'Trần Thị B',
      authorAvatar: '/placeholder-avatar.jpg',
      text: 'Mình đã nghe đi nghe lại nhiều lần rồi, rất hay!',
      likes: 89,
      replies: 2,
      postedAt: '3 giờ trước',
    },
    {
      id: 'c3',
      author: 'Lê Văn C',
      authorAvatar: '/placeholder-avatar.jpg',
      text: 'Có phần 2 không ạ? Mình rất mong chờ!',
      likes: 45,
      replies: 0,
      postedAt: '5 giờ trước',
    },
  ];

  const suggestedTracks = [
    {
      id: '2',
      title: 'Cuộc phiêu lưu kỳ thú - Phần 1',
      uploader: 'Người kể chuyện',
      thumbnail: '/placeholder-track.jpg',
      duration: '45:20',
      views: 89000,
      uploadedAt: '1 tuần trước',
      audioUrl: '/sample-audio.mp3',
    },
    {
      id: '3',
      title: 'Tình yêu và cuộc sống - Tập đặc biệt',
      uploader: 'Radio Tình Yêu',
      thumbnail: '/placeholder-track.jpg',
      duration: '30:15',
      views: 156000,
      uploadedAt: '3 ngày trước',
      audioUrl: '/sample-audio.mp3',
    },
    {
      id: '4',
      title: 'Thám hiểm rừng sâu - Chương mở đầu',
      uploader: 'Adventure Audio',
      thumbnail: '/placeholder-track.jpg',
      duration: '35:45',
      views: 67000,
      uploadedAt: '5 ngày trước',
      audioUrl: '/sample-audio.mp3',
    },
  ];

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const handleSubscribe = () => {
    setSubscribed(!subscribed);
  };

  const handlePostComment = () => {
    if (commentText.trim()) {
      console.log('Post comment:', commentText);
      setCommentText('');
      // TODO: API call to post comment
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3, pb: 20 }}>
      {/* Back button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Quay lại
      </Button>

      <Grid container spacing={3}>
        {/* Main content */}
        <Grid item xs={12} lg={8}>
          {/* Audio Player Section */}
          <PlayerSection>
            <Box
              component="img"
              src={track.thumbnail}
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
            {/* Play button overlay - sẽ tích hợp với audio player */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                bgcolor: 'rgba(0, 0, 0, 0.7)',
                borderRadius: '50%',
                p: 2,
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.9)',
                },
              }}
            >
              <IconButton
                size="large"
                sx={{
                  color: 'white',
                  fontSize: '3rem',
                }}
              >
                ▶
              </IconButton>
            </Box>
          </PlayerSection>

          {/* Track Info */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" component="h1" fontWeight={700} gutterBottom>
              {track.title}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <Typography variant="body2" color="text.secondary">
                  {formatViews(track.views)} lượt nghe
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  •
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {track.uploadedAt}
                </Typography>
                {track.category && (
                  <>
                    <Typography variant="body2" color="text.secondary">
                      •
                    </Typography>
                    <Chip label={track.category} size="small" />
                  </>
                )}
              </Box>

              {/* Action buttons */}
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                <Tooltip title={liked ? 'Bỏ thích' : 'Thích'}>
                  <ActionButton
                    variant="outlined"
                    startIcon={liked ? <ThumbUp /> : <ThumbUpOutlined />}
                    onClick={handleLike}
                    color={liked ? 'primary' : 'inherit'}
                  >
                    {formatViews(track.likes)}
                  </ActionButton>
                </Tooltip>

                <Tooltip title={disliked ? 'Bỏ không thích' : 'Không thích'}>
                  <IconButton
                    onClick={handleDislike}
                    color={disliked ? 'primary' : 'inherit'}
                  >
                    {disliked ? <ThumbDown /> : <ThumbDownOutlined />}
                  </IconButton>
                </Tooltip>

                <Tooltip title="Chia sẻ">
                  <ActionButton
                    variant="outlined"
                    startIcon={<Share />}
                  >
                    Chia sẻ
                  </ActionButton>
                </Tooltip>

                <Tooltip title="Thêm vào playlist">
                  <IconButton>
                    <PlaylistAdd />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Thêm">
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Uploader Info */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
                onClick={() => navigate(`/channel/${track.uploaderId || 'channel-1'}`)}
              >
                <Avatar
                  src={track.uploaderAvatar}
                  sx={{ width: 48, height: 48 }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {track.uploader}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatViews(track.subscribers)} người đăng ký
                  </Typography>
                </Box>
              </Box>

              <Button
                variant={subscribed ? 'contained' : 'outlined'}
                startIcon={subscribed ? <NotificationsNone /> : <Subscriptions />}
                onClick={handleSubscribe}
                sx={{
                  borderRadius: 18,
                  textTransform: 'none',
                  fontWeight: 600,
                }}
                color={subscribed ? 'error' : 'primary'}
              >
                {subscribed ? 'Đã đăng ký' : 'Đăng ký'}
              </Button>
            </Box>

            {/* Description */}
            <Box
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 2,
                p: 2,
                mb: 3,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: 'pre-wrap',
                  mb: 2,
                }}
              >
                {track.description}
              </Typography>

              {/* Tags */}
              {track.tags && track.tags.length > 0 && (
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {track.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={`#${tag}`}
                      size="small"
                      clickable
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                      }}
                    />
                  ))}
                </Stack>
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Comments Section */}
            <Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {comments.length} bình luận
              </Typography>

              {/* Comment input */}
              <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'flex-start' }}>
                <Avatar sx={{ width: 40, height: 40 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <TextField
                    fullWidth
                    placeholder="Thêm bình luận công khai..."
                    multiline
                    maxRows={4}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    variant="outlined"
                    size="small"
                    sx={{
                      mb: 1,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button
                      variant="text"
                      onClick={() => setCommentText('')}
                      disabled={!commentText}
                    >
                      Hủy
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handlePostComment}
                      disabled={!commentText.trim()}
                      sx={{
                        borderRadius: 18,
                        textTransform: 'none',
                      }}
                    >
                      Bình luận
                    </Button>
                  </Box>
                </Box>
              </Box>

              {/* Comments list */}
              {comments.map((comment) => (
                <Box key={comment.id} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Avatar
                      src={comment.authorAvatar}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {comment.author}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          mb: 1,
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {comment.text}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                        <IconButton size="small">
                          <ThumbUpOutlined fontSize="small" />
                        </IconButton>
                        <Typography variant="caption" color="text.secondary">
                          {comment.likes}
                        </Typography>
                        <IconButton size="small">
                          <ThumbDownOutlined fontSize="small" />
                        </IconButton>
                        <Button
                          size="small"
                          startIcon={<Reply />}
                          sx={{
                            textTransform: 'none',
                            fontSize: '0.875rem',
                          }}
                        >
                          Phản hồi
                        </Button>
                        <Typography variant="caption" color="text.secondary">
                          {comment.postedAt}
                        </Typography>
                      </Box>
                      {comment.replies > 0 && (
                        <Button
                          size="small"
                          sx={{
                            textTransform: 'none',
                            fontSize: '0.75rem',
                            color: 'primary.main',
                          }}
                        >
                          Xem {comment.replies} phản hồi
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Sidebar - Suggested Tracks */}
        <Grid item xs={12} lg={4}>
          <Box sx={{ position: 'sticky', top: 80 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              Đề xuất cho bạn
            </Typography>
            <Stack spacing={1.5}>
              {suggestedTracks.map((suggestedTrack) => (
                <Box
                  key={suggestedTrack.id}
                  onClick={() => navigate(`/track/${suggestedTrack.id}`)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TrackListItem
                    track={suggestedTrack}
                    onClick={() => navigate(`/track/${suggestedTrack.id}`)}
                    onPlay={() => console.log('Play:', suggestedTrack.id)}
                  />
                </Box>
              ))}
            </Stack>

            {/* More suggested tracks */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
                Tracks khác từ {track.uploader}
              </Typography>
              <Grid container spacing={2}>
                {suggestedTracks.slice(0, 2).map((suggestedTrack) => (
                  <Grid item xs={6} key={suggestedTrack.id}>
                    <TrackCard
                      track={suggestedTrack}
                      onClick={() => navigate(`/track/${suggestedTrack.id}`)}
                      onPlay={() => console.log('Play:', suggestedTrack.id)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TrackDetail;

