import React, { useState } from 'react';
import { 
    Modal, 
    Box, 
    Typography, 
    TextField, 
    Button, 
    Tabs, 
    Tab, 
    Stack,
    Alert,
} from '@mui/material';

interface AuthModalProps {
    open: boolean;
    onClose: () => void;
    onLoginSuccess: () => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

// Component Form Đăng nhập
const LoginForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        // [CALL API: LOGIN]
        // Gửi email và password đến Backend
        console.log('Đang đăng nhập:', { email, password });

        try {
            // Giả lập API call
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            
            if (email === 'test@example.com' && password === '123456') {
                onSuccess();
            } else {
                setError('Email hoặc mật khẩu không đúng. Vui lòng thử lại.');
            }
        } catch (err) {
            setError('Đã xảy ra lỗi khi kết nối máy chủ.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack component="form" spacing={2} onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
            />
            <TextField
                label="Mật khẩu"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
            />
            <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                disabled={loading}
                fullWidth
            >
                {loading ? 'Đang xử lý...' : 'Đăng nhập'}
            </Button>
        </Stack>
    );
};

// Component Form Đăng ký
const RegisterForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // [CALL API: REGISTER]
        // Gửi thông tin đăng ký đến Backend
        console.log('Đang đăng ký:', { email, password, username });
        
        try {
            // Giả lập API call
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            
            // Giả định đăng ký thành công
            alert('Đăng ký thành công! Vui lòng đăng nhập.');
            onSuccess(); // Chuyển về tab Đăng nhập
        } catch (err) {
            setError('Đã xảy ra lỗi khi kết nối máy chủ.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack component="form" spacing={2} onSubmit={handleSubmit} sx={{ mt: 3 }}>
             {error && <Alert severity="error">{error}</Alert>}
             <TextField
                label="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                fullWidth
            />
            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
            />
            <TextField
                label="Mật khẩu"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
            />
            <Button 
                type="submit" 
                variant="contained" 
                color="secondary" 
                disabled={loading}
                fullWidth
            >
                {loading ? 'Đang xử lý...' : 'Đăng ký'}
            </Button>
        </Stack>
    );
};


const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, onLoginSuccess }) => {
    const [tab, setTab] = useState(0); // 0: Đăng nhập, 1: Đăng ký

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };
    
    // Đăng nhập thành công, đóng modal và báo cho Home.tsx
    const handleLoginSuccess = () => {
        onLoginSuccess();
        onClose();
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h5" component="h2" mb={1} textAlign="center">
                    Xác thực người dùng
                </Typography>
                
                <Tabs value={tab} onChange={handleTabChange} variant="fullWidth">
                    <Tab label="Đăng nhập" />
                    <Tab label="Đăng ký" />
                </Tabs>

                {tab === 0 && <LoginForm onSuccess={handleLoginSuccess} />}
                {tab === 1 && <RegisterForm onSuccess={() => setTab(0)} />}
            </Box>
        </Modal>
    );
};

export default AuthModal;