// src/pages/Profile/UserTrackManagementPage.tsx (Đã chỉnh sửa)

import React from 'react';
import { Container, Typography, Box, Button, List } from '@mui/material';
import { Add } from '@mui/icons-material';
import TrackListItem from '../../components/Track/TrackListItem';
import TrackUploadModal from '../../components/Track/TrackUploadModal'; // <-- IMPORT MỚI
import { TrackList } from '../../types/Track';

// MOCK DATA cho tracks của User đã upload
const mockUserTracks: TrackList[] = [
    // ... dữ liệu mock cũ
];


const UserTrackManagementPage: React.FC = () => {
    // 1. Quản lý trạng thái Modal
    const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false); 

    const handleOpenUpload = () => setIsUploadModalOpen(true);
    const handleCloseUpload = () => setIsUploadModalOpen(false);

    // Hàm xử lý Edit/Delete
    const handleEdit = (id: number) => console.log(`Edit track ${id}`);
    const handleDelete = (id: number) => console.log(`Delete track ${id}`);

    return (
        <Container maxWidth="lg" sx={{ pb: 12, pt: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight={700}>
                    Quản lý Track đã Upload
                </Typography>
                <Button 
                    variant="contained" 
                    startIcon={<Add />} 
                    // 2. Kích hoạt Modal khi nhấn nút
                    onClick={handleOpenUpload}
                >
                    Upload Track mới
                </Button>
            </Box>

            <List disablePadding>
                {mockUserTracks.map((t, index) => (
                    // Tái sử dụng TrackListItem
                    <TrackListItem
                        key={t.id}
                        track={t}
                        index={index}
                        // Khi click vào list item sẽ dẫn đến trang Sửa
                        onClick={() => handleEdit(t.id)} 
                        
                        // Đây là phần thay thế SecondaryAction để thêm nút Sửa/Xóa
                        // LƯU Ý: Để đoạn này hoạt động, bạn cần chỉnh sửa TrackListItem.tsx 
                        // để nó chấp nhận một Custom SecondaryAction.
                        // Hiện tại, ta sẽ dùng một Box đơn giản để minh họa:
                        secondaryActionContent={
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button size="small" variant="outlined" onClick={(e) => { e.stopPropagation(); handleEdit(t.id); }}>Sửa</Button>
                                <Button size="small" color="error" onClick={(e) => { e.stopPropagation(); handleDelete(t.id); }}>Xóa</Button>
                            </Box>
                        }
                    />
                ))}
            </List>

            {/* 3. Thêm Component Modal Upload */}
            <TrackUploadModal 
                open={isUploadModalOpen} 
                onClose={handleCloseUpload} 
            />
            
            {/* ... (Phần empty state cũ) ... */}
            {mockUserTracks.length === 0 && (
                <Typography variant="body1" color="text.secondary" textAlign="center" mt={5}>
                    Bạn chưa upload track nào. Hãy upload ngay!
                </Typography>
            )}
        </Container>
    );
};

export default UserTrackManagementPage;
 