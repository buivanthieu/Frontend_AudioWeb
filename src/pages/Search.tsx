import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Chip,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList,
  Clear,
  ViewModule,
  ViewList,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import TrackCard from '../components/TrackCard/TrackCard';
import TrackListItem from '../components/TrackListItem/TrackListItem';

const SearchContainer = styled(Box)(({ theme }) => ({
  bgcolor: 'background.paper',
  borderRadius: 2,
  p: 3,
  mb: 3,
}));

const FilterSection = styled(Box)(({ theme }) => ({
  bgcolor: 'background.paper',
  borderRadius: 2,
  p: 2,
  mb: 3,
}));

const categories = [
  'Tất cả',
  'Tình cảm',
  'Phiêu lưu',
  'Kinh dị',
  'Lịch sử',
  'Khoa học viễn tưởng',
  'Giáo dục',
  'Hài hước',
  'Tâm lý',
  'Tội phạm',
];

const tags = [
  'audio',
  'truyện',
  'tuyển tập',
  'hay nhất',
  'mới nhất',
  'trending',
  'classic',
  'bestseller',
  'award',
  'recommended',
];

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'Tất cả'
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    const tagsParam = searchParams.get('tags');
    return tagsParam ? tagsParam.split(',') : [];
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Mock search results - sẽ thay bằng API call
  const searchResults = [
    {
      id: '1',
      title: 'Tuyển tập truyện audio hay nhất - Tập 1',
      uploader: 'Channel Audio Story',
      uploaderId: 'channel-1',
      thumbnail: '/placeholder-track.jpg',
      duration: '25:30',
      views: 125000,
      uploadedAt: '2 ngày trước',
      audioUrl: '/sample-audio.mp3',
    },
    {
      id: '2',
      title: 'Cuộc phiêu lưu kỳ thú - Phần 1',
      uploader: 'Người kể chuyện',
      uploaderId: 'channel-2',
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
      uploaderId: 'channel-3',
      thumbnail: '/placeholder-track.jpg',
      duration: '30:15',
      views: 156000,
      uploadedAt: '3 ngày trước',
      audioUrl: '/sample-audio.mp3',
    },
  ];

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (selectedCategory && selectedCategory !== 'Tất cả') {
      params.set('category', selectedCategory);
    }
    if (selectedTags.length > 0) {
      params.set('tags', selectedTags.join(','));
    }
    setSearchParams(params, { replace: true });
  }, [searchTerm, selectedCategory, selectedTags, setSearchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger search - có thể gọi API ở đây
    console.log('Searching:', { searchTerm, selectedCategory, selectedTags });
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Tất cả');
    setSelectedTags([]);
  };

  const hasActiveFilters =
    searchTerm ||
    (selectedCategory && selectedCategory !== 'Tất cả') ||
    selectedTags.length > 0;

  return (
    <Container maxWidth="xl" sx={{ py: 3, pb: 20 }}>
      <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
        Tìm kiếm
      </Typography>

      {/* Search Input */}
      <SearchContainer>
        <form onSubmit={handleSearch}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <TextField
              fullWidth
              placeholder="Tìm kiếm tracks, playlists, channels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="outlined"
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                endAdornment: searchTerm && (
                  <IconButton
                    size="small"
                    onClick={() => setSearchTerm('')}
                    sx={{ mr: 1 }}
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{
                minWidth: 120,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                py: 1.5,
              }}
            >
              Tìm kiếm
            </Button>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => setShowFilters(!showFilters)}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                borderColor: showFilters ? 'primary.main' : 'divider',
                color: showFilters ? 'primary.main' : 'inherit',
              }}
            >
              Bộ lọc
            </Button>
          </Box>
        </form>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <Box sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography variant="body2" color="text.secondary">
              Đang lọc:
            </Typography>
            {selectedCategory && selectedCategory !== 'Tất cả' && (
              <Chip
                label={`Thể loại: ${selectedCategory}`}
                onDelete={() => setSelectedCategory('Tất cả')}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
            {selectedTags.map((tag) => (
              <Chip
                key={tag}
                label={`#${tag}`}
                onDelete={() => handleTagToggle(tag)}
                size="small"
                color="primary"
                variant="outlined"
              />
            ))}
            <Button
              size="small"
              startIcon={<Clear />}
              onClick={handleClearFilters}
              sx={{
                textTransform: 'none',
                fontSize: '0.75rem',
              }}
            >
              Xóa tất cả
            </Button>
          </Box>
        )}
      </SearchContainer>

      {/* Filters Panel */}
      {showFilters && (
        <FilterSection>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              Bộ lọc
            </Typography>
            <IconButton size="small" onClick={() => setShowFilters(false)}>
              <Clear />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={3}>
            {/* Category Filter */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Thể loại</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  input={<OutlinedInput label="Thể loại" />}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Tags Filter */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Tags
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={`#${tag}`}
                    onClick={() => handleTagToggle(tag)}
                    onDelete={
                      selectedTags.includes(tag)
                        ? () => handleTagToggle(tag)
                        : undefined
                    }
                    color={selectedTags.includes(tag) ? 'primary' : 'default'}
                    variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
                    clickable
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={handleClearFilters}
              sx={{ textTransform: 'none' }}
            >
              Xóa tất cả
            </Button>
            <Button
              variant="contained"
              onClick={() => setShowFilters(false)}
              sx={{ textTransform: 'none' }}
            >
              Áp dụng
            </Button>
          </Box>
        </FilterSection>
      )}

      {/* Results Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {searchResults.length} kết quả
          {hasActiveFilters && (
            <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              cho "{searchTerm || 'tất cả'}"
            </Typography>
          )}
        </Typography>

        {/* View Mode Toggle */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            onClick={() => setViewMode('grid')}
            color={viewMode === 'grid' ? 'primary' : 'default'}
            size="small"
          >
            <ViewModule />
          </IconButton>
          <IconButton
            onClick={() => setViewMode('list')}
            color={viewMode === 'list' ? 'primary' : 'default'}
            size="small"
          >
            <ViewList />
          </IconButton>
        </Box>
      </Box>

      {/* Search Results */}
      {searchResults.length > 0 ? (
        viewMode === 'grid' ? (
          <Grid container spacing={3}>
            {searchResults.map((track) => (
              <Grid item xs={6} sm={4} md={3} lg={2.4} key={track.id}>
                <TrackCard
                  track={track}
                  onClick={(id) => navigate(`/track/${id}`)}
                  onPlay={(id) => console.log('Play:', id)}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 1 }}>
            {searchResults.map((track, index) => (
              <TrackListItem
                key={track.id}
                track={track}
                index={index}
                onClick={(id) => navigate(`/track/${id}`)}
                onPlay={(id) => console.log('Play:', id)}
              />
            ))}
          </Box>
        )
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            bgcolor: 'background.paper',
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Không tìm thấy kết quả
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Thử thay đổi từ khóa hoặc bộ lọc của bạn
          </Typography>
          <Button
            variant="outlined"
            onClick={handleClearFilters}
            startIcon={<Clear />}
          >
            Xóa bộ lọc
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Search;

