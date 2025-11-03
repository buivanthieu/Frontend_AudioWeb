import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const RegisterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 200px)',
  py: 4,
}));

const RegisterCard = styled(Box)(({ theme }) => ({
  bgcolor: 'background.paper',
  borderRadius: 3,
  p: 4,
  width: '100%',
  maxWidth: 450,
  boxShadow: theme.shadows[3],
}));

const SocialButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: 2,
  py: 1.5,
  fontWeight: 600,
  width: '100%',
}));

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (!agreedToTerms) {
      setError('Vui lòng đồng ý với điều khoản sử dụng');
      return;
    }

    setLoading(true);

    // TODO: API call to register
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful registration
      console.log('Register:', formData);

      // Navigate to home after successful registration
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    // TODO: Google OAuth
    console.log('Google register');
  };

  const handleFacebookRegister = () => {
    // TODO: Facebook OAuth
    console.log('Facebook register');
  };

  return (
    <Container maxWidth="sm">
        <RegisterContainer>
          <RegisterCard>
            <Typography
              variant="h4"
              component="h1"
              fontWeight={700}
              gutterBottom
              textAlign="center"
              sx={{
                background: 'linear-gradient(45deg, #6366f1, #ec4899)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              AudioStory
            </Typography>
            <Typography variant="h5" component="h2" fontWeight={600} textAlign="center" gutterBottom>
              Đăng ký
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
              Tạo tài khoản để bắt đầu nghe audio
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Tên người dùng"
                value={formData.username}
                onChange={handleChange('username')}
                required
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                required
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Mật khẩu"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange('password')}
                required
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Xác nhận mật khẩu"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                required
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                        size="small"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    size="small"
                  />
                }
                label={
                  <Typography variant="body2">
                    Tôi đồng ý với{' '}
                    <MuiLink
                      href="/terms"
                      sx={{
                        color: 'primary.main',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      Điều khoản sử dụng
                    </MuiLink>
                    {' '}và{' '}
                    <MuiLink
                      href="/privacy"
                      sx={{
                        color: 'primary.main',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      Chính sách bảo mật
                    </MuiLink>
                  </Typography>
                }
                sx={{ mb: 2 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                {loading ? 'Đang đăng ký...' : 'Đăng ký'}
              </Button>
            </form>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Hoặc
              </Typography>
            </Divider>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
              <SocialButton
                variant="outlined"
                onClick={handleGoogleRegister}
                sx={{
                  borderColor: 'divider',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <Box
                  component="img"
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  sx={{ width: 20, height: 20, mr: 1 }}
                />
                Đăng ký với Google
              </SocialButton>

              <SocialButton
                variant="outlined"
                onClick={handleFacebookRegister}
                sx={{
                  borderColor: 'divider',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: '#1877f2',
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: 20,
                    height: 20,
                    mr: 1,
                    bgcolor: '#1877f2',
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  f
                </Box>
                Đăng ký với Facebook
              </SocialButton>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Đã có tài khoản?{' '}
                <MuiLink
                  component={Link}
                  to="/login"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Đăng nhập ngay
                </MuiLink>
              </Typography>
            </Box>
          </RegisterCard>
        </RegisterContainer>
      </Container>
  );
};

export default Register;

