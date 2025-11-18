import React, { useState, useCallback } from 'react';
import { 
    Modal, 
    Box, 
    Typography, 
    Button, 
    Alert, 
    LinearProgress, 
    TextField,
    Stack,
    IconButton,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    Chip,
    SelectChangeEvent,
} from '@mui/material';
import { CloudUpload, Close, Add } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

// Định nghĩa các loại MIME âm thanh hợp lệ
const ACCEPTED_AUDIO_TYPES = [
    'audio/mpeg', // MP3
    'audio/wav',  // WAV
    'audio/flac', // FLAC
    'audio/ogg',  // OGG
];

// Định nghĩa kiểu dữ liệu cho form metadata dựa trên CreateTrackDto
interface TrackMetadata {
    title: string;
    description: string;
    status: string;
    channelId: number | '';
    categoryId: number | '';
    writerName: string;
    originalStoryName: string;
    tagNames: string[]; // Array of strings
}

interface TrackUploadModalProps {
    open: boolean;
    onClose: () => void;
}

// MOCK DATA cho Category và Channel (Bạn sẽ cần CALL API thực tế ở đây)
const mockCategories = [
    { id: 1, name: 'Tình cảm' },
    { id: 2, name: 'Phiêu lưu' },
    { id: 3, name: 'Kinh dị' },
];

const mockChannels = [
    { id: 101, name: 'Channel của bạn' },
    { id: 102, name: 'Channel Cộng đồng' },
];

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh',
    overflowY: 'auto',
};

const TrackUploadModal: React.FC<TrackUploadModalProps> = ({ open, onClose }) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [tempFileUrl, setTempFileUrl] = useState<string | null>(null); 
    const [tempFileKey, setTempFileKey] = useState<string | null>(null); // Key/ID để xóa file tạm thời trên Terabox/R2
    const [error, setError] = useState<string | null>(null);
    const [currentTagInput, setCurrentTagInput] = useState(''); // State cho ô nhập tag

    // State cho metadata
    const [metadata, setMetadata] = useState<TrackMetadata>({
        title: '',
        description: '',
        status: 'Public', // Giá trị mặc định
        channelId: '',
        categoryId: '',
        writerName: '',
        originalStoryName: '',
        tagNames: [],
    });
    
    // Kiểm tra các trường bắt buộc
    const isFormValid = metadata.title.trim() !== '' && metadata.categoryId !== '' && metadata.channelId !== '';

    // Logic xử lý Tags
    const handleAddTag = () => {
        const newTag = currentTagInput.trim();
        if (newTag && !metadata.tagNames.includes(newTag)) {
            setMetadata(prev => ({ 
                ...prev, 
                tagNames: [...prev.tagNames, newTag] 
            }));
            setCurrentTagInput('');
        }
    };

    const handleDeleteTag = (tagToDelete: string) => {
        setMetadata(prev => ({ 
            ...prev, 
            tagNames: prev.tagNames.filter(tag => tag !== tagToDelete) 
        }));
    };

    // Logic cho Dropzone
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setError(null);
        if (acceptedFiles.length === 0) return;

        const selectedFile = acceptedFiles[0];
        
        if (!ACCEPTED_AUDIO_TYPES.includes(selectedFile.type)) {
            setError('Định dạng file không hợp lệ. Vui lòng chọn file âm thanh.');
            setFile(null);
            return;
        }

        setFile(selectedFile);
        setMetadata(prev => ({ ...prev, title: selectedFile.name.replace(/\.(mp3|wav|flac|ogg)$/i, '') })); // Đặt tên file làm tiêu đề mặc định
        handleUploadFile(selectedFile);
    }, []);
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, 
        multiple: false,
        accept: ACCEPTED_AUDIO_TYPES.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    });

    // -------------------------------------------------------------------------
    // LOGIC UPLOAD FILE (Backend: POST /api/upload-temp-track)
    // -------------------------------------------------------------------------
    const handleUploadFile = async (fileToUpload: File) => {
        setIsUploading(true);
        setError(null);
        setUploadProgress(0);

        // [CALL API: UPLOAD TẠM THỜI] 
        // Gửi file đến backend. Backend xử lý upload lên Terabox/R2.
        
        try {
            // Giả lập quá trình upload
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                setUploadProgress(progress);
                if (progress >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    // Giả lập URL và KEY trả về từ Backend/Terabox
                    const mockUrl = `https://terabox.com/temp/track-${Date.now()}.mp3`; 
                    const mockKey = `temp-key-${Date.now()}`;
                    setTempFileUrl(mockUrl);
                    setTempFileKey(mockKey); // Lưu Key để xóa nếu người dùng hủy
                }
            }, 200);

        } catch (err) {
            setError('Lỗi khi tải file lên máy chủ. Vui lòng thử lại.');
            setIsUploading(false);
        }
    };
    
    // -------------------------------------------------------------------------
    // LOGIC HOÀN TẤT VÀ LƯU VÀO DB (Backend: POST /api/tracks)
    // -------------------------------------------------------------------------
    const handleSaveTrack = async () => {
        if (!tempFileUrl || !isFormValid) {
            setError("Vui lòng upload file và điền đầy đủ thông tin bắt buộc.");
            return;
        }
        
        // [CALL API: LƯU VĨNH VIỄN] 
        // Gửi metadata và tempFileUrl/tempFileKey đến backend.
        // Backend lưu vào DB và chuyển file tạm thời thành vĩnh viễn (hoặc xóa khỏi TempFiles).
        
        try {
            console.log('Finalizing track details and saving to DB...');
            const trackData = {
                ...metadata,
                audioUrl: tempFileUrl,
                // Các trường còn lại như UploadedAt, Status, Status Id sẽ được Backend xử lý
            };
            console.log('Data sent to Backend:', trackData);
            
            // Sau khi lưu thành công:
            resetAndClose();
        } catch (error) {
            setError('Lỗi khi lưu thông tin track. Vui lòng kiểm tra lại.');
        }
    };
    
    // -------------------------------------------------------------------------
    // LOGIC HỦY BỎ/ĐÓNG MODAL (Backend: DELETE /api/delete-temp-track)
    // -------------------------------------------------------------------------
    const handleDeleteTempFile = () => {
        if (tempFileKey) {
            // [CALL API: XÓA TẠM THỜI] 
            // Gọi API Backend để xóa file TẠM THỜI trên Terabox/R2 bằng tempFileKey.
            console.log(`[CALL API] Xóa file tạm thời với Key: ${tempFileKey}`); 
        }
        resetAndClose();
    };

    const resetAndClose = () => {
        setFile(null);
        setUploadProgress(0);
        setIsUploading(false);
        setTempFileUrl(null);
        setTempFileKey(null);
        setError(null);
        setMetadata({
            title: '',
            description: '',
            status: 'Public',
            channelId: '',
            categoryId: '',
            writerName: '',
            originalStoryName: '',
            tagNames: [],
        });
        onClose();
    }

    return (
        <Modal open={open} onClose={handleDeleteTempFile}>
            <Box sx={style}>
                <Typography variant="h5" component="h2" mb={2}>
                    Upload Track mới
                </Typography>
                
                {/* Nút đóng (hủy) */}
                <IconButton 
                    onClick={handleDeleteTempFile} 
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <Close />
                </IconButton>

                <Stack spacing={2}>
                    {/* -------------------- 1. KHU VỰC KÉO/THẢ FILE -------------------- */}
                    {(!tempFileUrl || isUploading) && (
                        <Box 
                            {...getRootProps()} 
                            sx={{ 
                                border: `2px dashed ${isDragActive ? 'primary.main' : 'grey.400'}`,
                                p: 4, 
                                borderRadius: 1, 
                                textAlign: 'center',
                                cursor: 'pointer',
                                bgcolor: isDragActive ? 'grey.50' : 'inherit',
                            }}
                        >
                            <input {...getInputProps()} />
                            <CloudUpload color="primary" sx={{ fontSize: 40, mb: 1 }} />
                            <Typography>
                                Kéo thả file âm thanh (mp3, wav, flac) vào đây, hoặc **Nhấn để chọn file**
                            </Typography>
                            {file && (
                                <Typography variant="body2" color="text.secondary" mt={1}>
                                    Đã chọn file: **{file.name}** ({Math.round(file.size / 1024)} KB)
                                </Typography>
                            )}
                        </Box>
                    )}

                    {/* TRẠNG THÁI UPLOAD */}
                    {isUploading && (
                        <Box sx={{ width: '100%', mt: 1 }}>
                            <Typography variant="caption" mb={1}>Đang tải lên...</Typography>
                            <LinearProgress variant="determinate" value={uploadProgress} />
                        </Box>
                    )}
                    
                    {/* THÔNG BÁO LỖI */}
                    {error && <Alert severity="error">{error}</Alert>}

                    {/* -------------------- 2. FORM METADATA -------------------- */}
                    {tempFileUrl && !isUploading && (
                        <>
                            <Alert severity="success">
                                File đã được tải lên tạm thời. Audio URL: **{tempFileUrl}**
                            </Alert>
                            
                            {/* Tiêu đề */}
                            <TextField
                                label="Tiêu đề Track (*)"
                                value={metadata.title}
                                onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
                                fullWidth
                                required
                            />
                            
                            {/* Mô tả */}
                            <TextField
                                label="Mô tả"
                                value={metadata.description}
                                onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
                                fullWidth
                                multiline
                                rows={3}
                            />
                            
                            <Stack direction="row" spacing={2}>
                                {/* Category */}
                                <FormControl fullWidth required>
                                    <InputLabel>Category (*)</InputLabel>
                                    <Select
                                        label="Category (*)"
                                        value={metadata.categoryId}
                                        onChange={(e: SelectChangeEvent<number | ''>) => setMetadata({ ...metadata, categoryId: e.target.value as number })}
                                    >
                                        {/* [CALL API] Lấy danh sách Category thực tế */}
                                        {mockCategories.map(c => (
                                            <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                
                                {/* Channel */}
                                <FormControl fullWidth required>
                                    <InputLabel>Channel (*)</InputLabel>
                                    <Select
                                        label="Channel (*)"
                                        value={metadata.channelId}
                                        onChange={(e: SelectChangeEvent<number | ''>) => setMetadata({ ...metadata, channelId: e.target.value as number })}
                                    >
                                        {/* [CALL API] Lấy danh sách Channel thực tế */}
                                        {mockChannels.map(c => (
                                            <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Stack>

                            {/* Thông tin Truyện gốc */}
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    label="Tên Truyện gốc"
                                    value={metadata.originalStoryName}
                                    onChange={(e) => setMetadata({ ...metadata, originalStoryName: e.target.value })}
                                    fullWidth
                                />
                                <TextField
                                    label="Tên Tác giả"
                                    value={metadata.writerName}
                                    onChange={(e) => setMetadata({ ...metadata, writerName: e.target.value })}
                                    fullWidth
                                />
                            </Stack>

                            {/* Tags */}
                            <Box>
                                <Typography variant="subtitle1" mb={1}>Tags:</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                                    {metadata.tagNames.map((tag) => (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            onDelete={() => handleDeleteTag(tag)}
                                        />
                                    ))}
                                </Box>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <TextField
                                        label="Thêm Tag"
                                        value={currentTagInput}
                                        onChange={(e) => setCurrentTagInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddTag();
                                            }
                                        }}
                                        fullWidth
                                    />
                                    <Button onClick={handleAddTag} variant="outlined" startIcon={<Add />}>
                                        Thêm
                                    </Button>
                                </Stack>
                            </Box>

                            {/* Status (Dùng để thay thế cho status: public/private/draft) */}
                            <FormControl fullWidth>
                                <InputLabel>Trạng thái (Status)</InputLabel>
                                <Select
                                    label="Trạng thái (Status)"
                                    value={metadata.status}
                                    onChange={(e: SelectChangeEvent<string>) => setMetadata({ ...metadata, status: e.target.value })}
                                >
                                    <MenuItem value="Public">Public (Công khai)</MenuItem>
                                    <MenuItem value="Private">Private (Riêng tư)</MenuItem>
                                    <MenuItem value="Draft">Draft (Nháp)</MenuItem>
                                </Select>
                            </FormControl>
                        </>
                    )}
                    
                    {/* NÚT HOÀN TẤT */}
                    <Button
                        variant="contained"
                        onClick={handleSaveTrack}
                        disabled={!tempFileUrl || isUploading || !isFormValid}
                        sx={{ mt: 2 }}
                    >
                        {tempFileUrl ? 'Lưu Track' : 'Đang chờ file...'}
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
};

export default TrackUploadModal;