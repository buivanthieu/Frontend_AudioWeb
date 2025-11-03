import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import {
  ThumbUp,
  ThumbUpOutlined,
  ThumbDown,
  ThumbDownOutlined,
  Reply,
  MoreVert,
} from '@mui/icons-material';

interface CommentItemProps {
  comment: {
    id: string;
    author: string;
    authorAvatar?: string;
    text: string;
    likes: number;
    replies?: number;
    postedAt: string;
    repliesList?: CommentItemProps['comment'][];
  };
  onReply?: (commentId: string, replyText: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onReply }) => {
  const [liked, setLiked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleReply = () => {
    if (replyText.trim() && onReply) {
      onReply(comment.id, replyText);
      setReplyText('');
      setShowReplyInput(false);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Avatar
          src={comment.authorAvatar}
          sx={{ width: 40, height: 40 }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography variant="subtitle2" fontWeight={600}>
              {comment.author}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {comment.postedAt}
            </Typography>
          </Box>

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
            <IconButton size="small" onClick={handleLike} color={liked ? 'primary' : 'inherit'}>
              {liked ? <ThumbUp fontSize="small" /> : <ThumbUpOutlined fontSize="small" />}
            </IconButton>
            <Typography variant="caption" color="text.secondary">
              {comment.likes + (liked ? 1 : 0)}
            </Typography>

            <IconButton size="small">
              <ThumbDownOutlined fontSize="small" />
            </IconButton>

            <Button
              size="small"
              startIcon={<Reply />}
              onClick={() => setShowReplyInput(!showReplyInput)}
              sx={{
                textTransform: 'none',
                fontSize: '0.875rem',
              }}
            >
              Phản hồi
            </Button>

            <IconButton size="small">
              <MoreVert fontSize="small" />
            </IconButton>
          </Box>

          {/* Reply input */}
          {showReplyInput && (
            <Box sx={{ ml: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <Avatar sx={{ width: 32, height: 32 }} />
                <TextField
                  fullWidth
                  placeholder="Thêm phản hồi..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  size="small"
                  multiline
                  maxRows={3}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, ml: 6 }}>
                <Button
                  size="small"
                  variant="text"
                  onClick={() => {
                    setShowReplyInput(false);
                    setReplyText('');
                  }}
                >
                  Hủy
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleReply}
                  disabled={!replyText.trim()}
                  sx={{
                    borderRadius: 18,
                    textTransform: 'none',
                  }}
                >
                  Phản hồi
                </Button>
              </Box>
            </Box>
          )}

          {/* Replies */}
          {comment.replies && comment.replies > 0 && (
            <Button
              size="small"
              onClick={() => setShowReplies(!showReplies)}
              sx={{
                textTransform: 'none',
                fontSize: '0.75rem',
                color: 'primary.main',
                mb: 1,
              }}
            >
              {showReplies ? 'Ẩn' : `Xem ${comment.replies} phản hồi`}
              <Typography component="span" sx={{ ml: 0.5 }}>
                ▼
              </Typography>
            </Button>
          )}

          {/* Replies list */}
          {showReplies && comment.repliesList && comment.repliesList.length > 0 && (
            <Box sx={{ ml: 2, mt: 2, pl: 2, borderLeft: '2px solid', borderColor: 'divider' }}>
              <Stack spacing={2}>
                {comment.repliesList.map((reply) => (
                  <CommentItem key={reply.id} comment={reply} />
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CommentItem;

