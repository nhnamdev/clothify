import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu không khớp!');
      return;
    }

    if (!agreeTerms) {
      setError('Vui lòng đồng ý với điều khoản sử dụng!');
      return;
    }

    if (formData.password.length < 8) {
      setError('Mật khẩu phải có ít nhất 8 ký tự!');
      return;
    }

    setLoading(true);

    try {
      const result = await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      if (result.success) {
        setSuccessMessage(result.message || 'Đăng ký thành công!');
        
        // Navigate to home after successful registration (already logged in)
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setError(result.error || 'Đăng ký thất bại. Vui lòng thử lại.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError('');
    if (successMessage) setSuccessMessage('');
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-[1200px] w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="hidden md:flex flex-col justify-center">
          <div 
            className="font-['Integral_CF',sans-serif] font-bold text-[48px] text-black mb-6 cursor-pointer"
            onClick={() => navigate('/')}
          >
            Clothify
          </div>
          <p className="font-['Satoshi',sans-serif] text-[18px] text-[rgba(0,0,0,0.6)] leading-[28px] mb-8">
            Tạo tài khoản để trải nghiệm mua sắm tuyệt vời với hàng ngàn sản phẩm thời trang chất lượng cao.
          </p>
          <div className="bg-[#f2f0f1] rounded-[20px] p-12 mt-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-black rounded-full size-12 flex items-center justify-center text-white font-['Satoshi',sans-serif] font-bold text-[20px]">
                  🎁
                </div>
                <p className="font-['Satoshi',sans-serif] text-[16px] text-black">
                  Giảm 20% cho đơn hàng đầu tiên
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-black rounded-full size-12 flex items-center justify-center text-white font-['Satoshi',sans-serif] font-bold text-[20px]">
                  🚚
                </div>
                <p className="font-['Satoshi',sans-serif] text-[16px] text-black">
                  Miễn phí vận chuyển toàn quốc
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-black rounded-full size-12 flex items-center justify-center text-white font-['Satoshi',sans-serif] font-bold text-[20px]">
                  ⭐
                </div>
                <p className="font-['Satoshi',sans-serif] text-[16px] text-black">
                  Tích điểm mỗi lần mua hàng
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[20px] p-8 md:p-12">
          <h1 className="font-['Integral_CF',sans-serif] font-bold text-[32px] text-black mb-2">
            Đăng Ký
          </h1>
          <p className="font-['Satoshi',sans-serif] text-[16px] text-[rgba(0,0,0,0.6)] mb-8">
            Tạo tài khoản mới để bắt đầu mua sắm.
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-[20px] mb-6">
              <p className="font-['Satoshi',sans-serif] text-[14px]">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-[20px] mb-6">
              <p className="font-['Satoshi',sans-serif] text-[14px]">{successMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-['Satoshi',sans-serif] font-medium text-[14px] text-black block mb-2">
                  Họ
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Nhập họ"
                  required
                  className="w-full bg-[#f0f0f0] px-[16px] py-[14px] rounded-[62px] font-['Satoshi',sans-serif] text-[16px] text-black placeholder:text-[rgba(0,0,0,0.4)] outline-none focus:ring-2 focus:ring-black transition-all"
                />
              </div>

              <div>
                <label className="font-['Satoshi',sans-serif] font-medium text-[14px] text-black block mb-2">
                  Tên
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Nhập tên"
                  required
                  className="w-full bg-[#f0f0f0] px-[16px] py-[14px] rounded-[62px] font-['Satoshi',sans-serif] text-[16px] text-black placeholder:text-[rgba(0,0,0,0.4)] outline-none focus:ring-2 focus:ring-black transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="font-['Satoshi',sans-serif] font-medium text-[14px] text-black block mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập địa chỉ email của bạn"
                required
                className="w-full bg-[#f0f0f0] px-[16px] py-[14px] rounded-[62px] font-['Satoshi',sans-serif] text-[16px] text-black placeholder:text-[rgba(0,0,0,0.4)] outline-none focus:ring-2 focus:ring-black transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="font-['Satoshi',sans-serif] font-medium text-[14px] text-black block mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Tạo mật khẩu (tối thiểu 8 ký tự)"
                  required
                  minLength={8}
                  className="w-full bg-[#f0f0f0] px-[16px] py-[14px] rounded-[62px] font-['Satoshi',sans-serif] text-[16px] text-black placeholder:text-[rgba(0,0,0,0.4)] outline-none focus:ring-2 focus:ring-black transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(0,0,0,0.6)] hover:text-black transition-colors"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="font-['Satoshi',sans-serif] font-medium text-[14px] text-black block mb-2">
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Nhập lại mật khẩu của bạn"
                  required
                  minLength={8}
                  className="w-full bg-[#f0f0f0] px-[16px] py-[14px] rounded-[62px] font-['Satoshi',sans-serif] text-[16px] text-black placeholder:text-[rgba(0,0,0,0.4)] outline-none focus:ring-2 focus:ring-black transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(0,0,0,0.6)] hover:text-black transition-colors"
                >
                  {showConfirmPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div>
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="size-4 rounded border-[rgba(0,0,0,0.3)] text-black focus:ring-black cursor-pointer mt-1"
                />
                <span className="ml-2 font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)]">
                  Tôi đồng ý với{' '}
                  <button type="button" className="text-black font-medium underline hover:no-underline">
                    Điều khoản sử dụng
                  </button>
                  {' '}và{' '}
                  <button type="button" className="text-black font-medium underline hover:no-underline">
                    Chính sách bảo mật
                  </button>
                </span>
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading || !!successMessage}
              className="w-full bg-black text-white font-['Satoshi',sans-serif] font-medium text-[16px] py-[14px] rounded-[62px] hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Đang tạo tài khoản...' : successMessage ? 'Đang chuyển hướng...' : 'Tạo Tài Khoản'}
            </button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[rgba(0,0,0,0.1)]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)]">
                  Hoặc đăng ký với
                </span>
              </div>
            </div>

            {/* Social Register */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-3 bg-white border border-[rgba(0,0,0,0.1)] px-4 py-3 rounded-[62px] font-['Satoshi',sans-serif] font-medium text-[14px] text-black hover:bg-[#f0f0f0] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-3 bg-white border border-[rgba(0,0,0,0.1)] px-4 py-3 rounded-[62px] font-['Satoshi',sans-serif] font-medium text-[14px] text-black hover:bg-[#f0f0f0] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>

            {/* Login Link */}
            <p className="text-center font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] mt-6">
              Đã có tài khoản?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="font-medium text-black underline hover:no-underline"
              >
                Đăng nhập ngay
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
