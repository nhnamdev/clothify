import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserProfile, updateUserProfile, logoutUser } from '../services/api';
import Header from './Header';

export default function Account() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // User profile data from backend
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthday: ''
  });

  // Load user profile from backend
  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) {
      return;
    }

    // If not logged in after loading, redirect to login
    if (!user) {
      navigate('/login');
      return;
    }

    loadUserProfile();
  }, [user, authLoading, navigate]);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const result = await getUserProfile();
      
      if (result.success) {
        const profile = result.data;
        setUserInfo({
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          email: user.email || profile.email || '',
          phone: profile.phone || '',
          birthday: profile.dateOfBirth || ''
        });
      } else {
        // Nếu chưa có profile, dùng email từ auth
        setUserInfo(prev => ({
          ...prev,
          email: user.email || ''
        }));
      }
    } catch (err) {
      console.error('Error loading profile:', err);
      setError('Không thể tải thông tin tài khoản');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      setError('');
      
      const result = await updateUserProfile({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        phone: userInfo.phone,
        dateOfBirth: userInfo.birthday
      });

      if (result.success) {
        alert('Cập nhật thông tin thành công!');
      } else {
        setError(result.error || 'Không thể cập nhật thông tin');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Có lỗi xảy ra khi cập nhật thông tin');
    } finally {
      setLoading(false);
    }
  };

  const orders = [
    {
      id: '#ORD-2024-001',
      date: '15/01/2026',
      status: 'Đã giao',
      total: 520000,
      items: 2,
      image: 'https://www.figma.com/api/mcp/asset/c9dcaf3c-410a-4907-a444-136c5e3a7c10'
    },
    {
      id: '#ORD-2024-002',
      date: '20/01/2026',
      status: 'Đang giao',
      total: 780000,
      items: 3,
      image: 'https://www.figma.com/api/mcp/asset/c9dcaf3c-410a-4907-a444-136c5e3a7c10'
    },
    {
      id: '#ORD-2024-003',
      date: '25/01/2026',
      status: 'Đang xử lý',
      total: 340000,
      items: 1,
      image: 'https://www.figma.com/api/mcp/asset/c9dcaf3c-410a-4907-a444-136c5e3a7c10'
    }
  ];

  const favorites = [
    {
      id: 1,
      name: 'Áo Thun Họa Tiết One Life',
      price: 260000,
      image: 'https://www.figma.com/api/mcp/asset/c9dcaf3c-410a-4907-a444-136c5e3a7c10',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Áo Polo Kẻ Sọc',
      price: 212000,
      oldPrice: 242000,
      discount: 20,
      image: 'https://www.figma.com/api/mcp/asset/c9dcaf3c-410a-4907-a444-136c5e3a7c10',
      rating: 4.0
    },
    {
      id: 3,
      name: 'Áo Sơ Mi Denim Kiểu',
      price: 180000,
      image: 'https://www.figma.com/api/mcp/asset/c9dcaf3c-410a-4907-a444-136c5e3a7c10',
      rating: 4.5
    }
  ];

  const addresses = [
    {
      id: 1,
      type: 'Mặc định',
      name: 'Nguyễn Văn A',
      phone: '0912345678',
      address: '123 Đường Nguyễn Huệ',
      ward: 'Phường Bến Nghé',
      district: 'Quận 1',
      city: 'TP. Hồ Chí Minh',
      isDefault: true
    },
    {
      id: 2,
      type: 'Văn phòng',
      name: 'Nguyễn Văn A',
      phone: '0912345678',
      address: '456 Đường Lê Lợi',
      ward: 'Phường Bến Thành',
      district: 'Quận 1',
      city: 'TP. Hồ Chí Minh',
      isDefault: false
    }
  ];

  const handleLogout = async () => {
    try {
      const result = await logoutUser();
      if (result.success) {
        navigate('/login');
      }
    } catch (err) {
      console.error('Logout error:', err);
      // Navigate anyway
      navigate('/login');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Đã giao': return 'text-green-600 bg-green-50';
      case 'Đang giao': return 'text-blue-600 bg-blue-50';
      case 'Đang xử lý': return 'text-orange-600 bg-orange-50';
      case 'Đã hủy': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />
      
      {/* Main Content - với margin-top để tránh header */}
      <div className="pt-[180px] pb-[50px]">
        <div className="max-w-[1240px] mx-auto px-[100px]">
          <h1 className="font-['Integral_CF',sans-serif] font-bold text-[40px] mb-[40px]">
            Tài Khoản Của Tôi
          </h1>

          {(authLoading || loading) ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
              <p className="mt-4 font-['Satoshi',sans-serif] text-[16px] text-[rgba(0,0,0,0.6)]">
                Đang tải thông tin...
              </p>
            </div>
          ) : (
            <div className="flex gap-[40px]">
          {/* Sidebar Menu */}
          <div className="w-[280px] flex-shrink-0">
            <div className="bg-white rounded-[20px] p-[24px] sticky top-[20px]">
              <nav className="space-y-[8px]">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-[20px] py-[14px] rounded-[12px] font-['Satoshi',sans-serif] text-[16px] transition-all ${
                    activeTab === 'profile' 
                      ? 'bg-black text-white font-medium' 
                      : 'text-[rgba(0,0,0,0.6)] hover:bg-[#f0f0f0]'
                  }`}
                >
                  Thông tin cá nhân
                </button>
                
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-[20px] py-[14px] rounded-[12px] font-['Satoshi',sans-serif] text-[16px] transition-all ${
                    activeTab === 'orders' 
                      ? 'bg-black text-white font-medium' 
                      : 'text-[rgba(0,0,0,0.6)] hover:bg-[#f0f0f0]'
                  }`}
                >
                  Đơn hàng của bạn
                </button>
                
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`w-full text-left px-[20px] py-[14px] rounded-[12px] font-['Satoshi',sans-serif] text-[16px] transition-all ${
                    activeTab === 'favorites' 
                      ? 'bg-black text-white font-medium' 
                      : 'text-[rgba(0,0,0,0.6)] hover:bg-[#f0f0f0]'
                  }`}
                >
                  Sản phẩm yêu thích
                </button>
                
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full text-left px-[20px] py-[14px] rounded-[12px] font-['Satoshi',sans-serif] text-[16px] transition-all ${
                    activeTab === 'addresses' 
                      ? 'bg-black text-white font-medium' 
                      : 'text-[rgba(0,0,0,0.6)] hover:bg-[#f0f0f0]'
                  }`}
                >
                  Địa chỉ giao hàng
                </button>
                
                <button
                  onClick={() => setActiveTab('membership')}
                  className={`w-full text-left px-[20px] py-[14px] rounded-[12px] font-['Satoshi',sans-serif] text-[16px] transition-all ${
                    activeTab === 'membership' 
                      ? 'bg-black text-white font-medium' 
                      : 'text-[rgba(0,0,0,0.6)] hover:bg-[#f0f0f0]'
                  }`}
                >
                  Chính sách Membership
                </button>
                
                <div className="pt-[16px] mt-[16px] border-t border-[rgba(0,0,0,0.1)]">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-[20px] py-[14px] rounded-[12px] font-['Satoshi',sans-serif] text-[16px] text-red-600 hover:bg-red-50 transition-all"
                  >
                    Đăng xuất
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {/* Thông tin cá nhân */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-[20px] p-[40px]">
                <h2 className="font-['Integral_CF',sans-serif] font-bold text-[28px] mb-[32px]">
                  Thông Tin Cá Nhân
                </h2>
                
                <div className="space-y-[24px]">
                  <div className="grid grid-cols-2 gap-[20px]">
                    <div>
                      <label className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] mb-[8px] block">
                        Họ
                      </label>
                      <input
                        type="text"
                        value={userInfo.firstName}
                        onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}
                        className="w-full px-[16px] py-[12px] border border-[rgba(0,0,0,0.2)] rounded-[12px] font-['Satoshi',sans-serif] text-[16px] outline-none focus:border-black transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] mb-[8px] block">
                        Tên
                      </label>
                      <input
                        type="text"
                        value={userInfo.lastName}
                        onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}
                        className="w-full px-[16px] py-[12px] border border-[rgba(0,0,0,0.2)] rounded-[12px] font-['Satoshi',sans-serif] text-[16px] outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] mb-[8px] block">
                      Email
                    </label>
                    <input
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                      className="w-full px-[16px] py-[12px] border border-[rgba(0,0,0,0.2)] rounded-[12px] font-['Satoshi',sans-serif] text-[16px] outline-none focus:border-black transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] mb-[8px] block">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                      className="w-full px-[16px] py-[12px] border border-[rgba(0,0,0,0.2)] rounded-[12px] font-['Satoshi',sans-serif] text-[16px] outline-none focus:border-black transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] mb-[8px] block">
                      Ngày sinh
                    </label>
                    <input
                      type="date"
                      value={userInfo.birthday}
                      onChange={(e) => setUserInfo({...userInfo, birthday: e.target.value})}
                      className="w-full px-[16px] py-[12px] border border-[rgba(0,0,0,0.2)] rounded-[12px] font-['Satoshi',sans-serif] text-[16px] outline-none focus:border-black transition-colors"
                    />
                  </div>
                  
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-[12px]">
                      <p className="font-['Satoshi',sans-serif] text-[14px]">{error}</p>
                    </div>
                  )}

                  <button 
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="w-full bg-black text-white font-['Satoshi',sans-serif] font-medium text-[16px] py-[14px] rounded-[62px] hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                  </button>
                </div>
              </div>
            )}

            {/* Đơn hàng */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-[20px] p-[40px]">
                <h2 className="font-['Integral_CF',sans-serif] font-bold text-[28px] mb-[32px]">
                  Đơn Hàng Của Bạn
                </h2>
                
                <div className="space-y-[16px]">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-[rgba(0,0,0,0.1)] rounded-[16px] p-[24px] hover:border-black transition-colors">
                      <div className="flex items-start justify-between mb-[16px]">
                        <div>
                          <p className="font-['Satoshi',sans-serif] font-bold text-[18px] text-black mb-[4px]">
                            {order.id}
                          </p>
                          <p className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)]">
                            Ngày đặt: {order.date}
                          </p>
                        </div>
                        <span className={`px-[16px] py-[6px] rounded-[20px] font-['Satoshi',sans-serif] text-[14px] font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-[16px] border-t border-[rgba(0,0,0,0.1)]">
                        <div className="flex items-center gap-[12px]">
                          <img src={order.image} alt="Product" className="w-[60px] h-[60px] rounded-[8px] object-cover" />
                          <div>
                            <p className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)]">
                              {order.items} sản phẩm
                            </p>
                            <p className="font-['Satoshi',sans-serif] font-bold text-[18px] text-black">
                              {order.total.toLocaleString('vi-VN')}₫
                            </p>
                          </div>
                        </div>
                        <button className="px-[24px] py-[10px] border border-black rounded-[62px] font-['Satoshi',sans-serif] font-medium text-[14px] hover:bg-black hover:text-white transition-colors">
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sản phẩm yêu thích */}
            {activeTab === 'favorites' && (
              <div className="bg-white rounded-[20px] p-[40px]">
                <h2 className="font-['Integral_CF',sans-serif] font-bold text-[28px] mb-[32px]">
                  Sản Phẩm Yêu Thích
                </h2>
                
                <div className="grid grid-cols-3 gap-[20px]">
                  {favorites.map((product) => (
                    <div key={product.id} className="group cursor-pointer">
                      <div className="relative mb-[12px] rounded-[20px] overflow-hidden bg-[#f0f0f0] aspect-square">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.discount && (
                          <div className="absolute top-[12px] left-[12px] bg-red-500 text-white px-[10px] py-[5px] rounded-[62px] text-[12px] font-bold">
                            -{product.discount}%
                          </div>
                        )}
                        <button className="absolute top-[12px] right-[12px] w-[36px] h-[36px] bg-white rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 17.5C9.7 17.5 9.4 17.4 9.2 17.2C8.7 16.8 8.2 16.4 7.7 16C5.9 14.5 4.3 13.1 3.2 11.7C1.8 10 1 8.4 1 6.5C1 3.4 3.4 1 6.5 1C7.8 1 9 1.5 10 2.4C11 1.5 12.2 1 13.5 1C16.6 1 19 3.4 19 6.5C19 8.4 18.2 10 16.8 11.7C15.7 13.1 14.1 14.5 12.3 16C11.8 16.4 11.3 16.8 10.8 17.2C10.6 17.4 10.3 17.5 10 17.5Z"/>
                          </svg>
                        </button>
                      </div>
                      <h3 className="font-['Satoshi',sans-serif] font-bold text-[16px] mb-[8px] line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-[6px] mb-[8px]">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill={i < Math.floor(product.rating) ? "#FFC633" : "#e0e0e0"}>
                            <path d="M8 0L10.163 5.38L16 6.19L12 10.07L12.965 16L8 13.38L3.035 16L4 10.07L0 6.19L5.837 5.38L8 0Z"/>
                          </svg>
                        ))}
                        <span className="font-['Satoshi',sans-serif] text-[14px]">
                          {product.rating}/5
                        </span>
                      </div>
                      <div className="flex items-center gap-[8px]">
                        <p className="font-['Satoshi',sans-serif] font-bold text-[20px]">
                          {product.price.toLocaleString('vi-VN')}₫
                        </p>
                        {product.oldPrice && (
                          <>
                            <p className="font-['Satoshi',sans-serif] text-[20px] line-through text-[rgba(0,0,0,0.4)]">
                              {product.oldPrice.toLocaleString('vi-VN')}₫
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Địa chỉ giao hàng */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-[20px] p-[40px]">
                <div className="flex items-center justify-between mb-[32px]">
                  <h2 className="font-['Integral_CF',sans-serif] font-bold text-[28px]">
                    Địa Chỉ Giao Hàng
                  </h2>
                  <button className="px-[24px] py-[12px] bg-black text-white font-['Satoshi',sans-serif] font-medium text-[16px] rounded-[62px] hover:bg-gray-800 transition-colors">
                    + Thêm địa chỉ mới
                  </button>
                </div>
                
                <div className="space-y-[16px]">
                  {addresses.map((address) => (
                    <div key={address.id} className={`border ${address.isDefault ? 'border-black' : 'border-[rgba(0,0,0,0.1)]'} rounded-[16px] p-[24px]`}>
                      <div className="flex items-start justify-between mb-[16px]">
                        <div>
                          <div className="flex items-center gap-[12px] mb-[8px]">
                            <h3 className="font-['Satoshi',sans-serif] font-bold text-[18px] text-black">
                              {address.name}
                            </h3>
                            {address.isDefault && (
                              <span className="px-[12px] py-[4px] bg-black text-white rounded-[20px] font-['Satoshi',sans-serif] text-[12px] font-medium">
                                Mặc định
                              </span>
                            )}
                            <span className="px-[12px] py-[4px] bg-[#f0f0f0] text-[rgba(0,0,0,0.6)] rounded-[20px] font-['Satoshi',sans-serif] text-[12px]">
                              {address.type}
                            </span>
                          </div>
                          <p className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] mb-[4px]">
                            {address.phone}
                          </p>
                          <p className="font-['Satoshi',sans-serif] text-[16px] text-black">
                            {address.address}, {address.ward}, {address.district}, {address.city}
                          </p>
                        </div>
                        <div className="flex gap-[8px]">
                          <button className="px-[16px] py-[8px] border border-[rgba(0,0,0,0.2)] rounded-[8px] font-['Satoshi',sans-serif] text-[14px] hover:border-black transition-colors">
                            Sửa
                          </button>
                          <button className="px-[16px] py-[8px] border border-red-500 text-red-500 rounded-[8px] font-['Satoshi',sans-serif] text-[14px] hover:bg-red-500 hover:text-white transition-colors">
                            Xóa
                          </button>
                        </div>
                      </div>
                      {!address.isDefault && (
                        <button className="text-black underline font-['Satoshi',sans-serif] text-[14px] hover:no-underline">
                          Đặt làm địa chỉ mặc định
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chính sách Membership */}
            {activeTab === 'membership' && (
              <div className="bg-white rounded-[20px] p-[40px]">
                <h2 className="font-['Integral_CF',sans-serif] font-bold text-[28px] mb-[32px]">
                  Chính Sách Membership
                </h2>
                
                <div className="space-y-[24px]">
                  {/* Current Status */}
                  <div className="bg-gradient-to-r from-black to-gray-800 rounded-[20px] p-[32px] text-white">
                    <div className="flex items-center justify-between mb-[24px]">
                      <div>
                        <h3 className="font-['Integral_CF',sans-serif] font-bold text-[24px] mb-[8px]">
                          SILVER MEMBER
                        </h3>
                        <p className="font-['Satoshi',sans-serif] text-[16px] opacity-80">
                          ID: CLT-2024-00123
                        </p>
                      </div>
                      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                        <circle cx="30" cy="30" r="28" stroke="white" strokeWidth="2"/>
                        <path d="M30 15L35 25L45 26L37.5 33L39.5 43L30 37.5L20.5 43L22.5 33L15 26L25 25L30 15Z" fill="white"/>
                      </svg>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-['Satoshi',sans-serif] text-[14px] opacity-60 mb-[4px]">
                          Tổng chi tiêu
                        </p>
                        <p className="font-['Satoshi',sans-serif] font-bold text-[20px]">
                          2.450.000₫
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-['Satoshi',sans-serif] text-[14px] opacity-60 mb-[4px]">
                          Còn thiếu để lên GOLD
                        </p>
                        <p className="font-['Satoshi',sans-serif] font-bold text-[20px]">
                          550.000₫
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="font-['Satoshi',sans-serif] font-bold text-[20px] mb-[16px]">
                      Quyền lợi hiện tại
                    </h3>
                    <div className="grid grid-cols-2 gap-[16px]">
                      <div className="border border-[rgba(0,0,0,0.1)] rounded-[12px] p-[20px]">
                        <div className="w-[48px] h-[48px] bg-black rounded-full flex items-center justify-center mb-[12px]">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/>
                            <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/>
                            <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/>
                          </svg>
                        </div>
                        <h4 className="font-['Satoshi',sans-serif] font-bold text-[16px] mb-[4px]">
                          Giảm giá 5%
                        </h4>
                        <p className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)]">
                          Cho mọi đơn hàng
                        </p>
                      </div>

                      <div className="border border-[rgba(0,0,0,0.1)] rounded-[12px] p-[20px]">
                        <div className="w-[48px] h-[48px] bg-black rounded-full flex items-center justify-center mb-[12px]">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                            <line x1="1" y1="10" x2="23" y2="10"/>
                          </svg>
                        </div>
                        <h4 className="font-['Satoshi',sans-serif] font-bold text-[16px] mb-[4px]">
                          Miễn phí ship
                        </h4>
                        <p className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)]">
                          Đơn hàng từ 500.000₫
                        </p>
                      </div>

                      <div className="border border-[rgba(0,0,0,0.1)] rounded-[12px] p-[20px]">
                        <div className="w-[48px] h-[48px] bg-black rounded-full flex items-center justify-center mb-[12px]">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 6v6l4 2"/>
                          </svg>
                        </div>
                        <h4 className="font-['Satoshi',sans-serif] font-bold text-[16px] mb-[4px]">
                          Ưu tiên hỗ trợ
                        </h4>
                        <p className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)]">
                          Xử lý nhanh chóng
                        </p>
                      </div>

                      <div className="border border-[rgba(0,0,0,0.1)] rounded-[12px] p-[20px]">
                        <div className="w-[48px] h-[48px] bg-black rounded-full flex items-center justify-center mb-[12px]">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <circle cx="9" cy="21" r="1"/>
                            <circle cx="20" cy="21" r="1"/>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                          </svg>
                        </div>
                        <h4 className="font-['Satoshi',sans-serif] font-bold text-[16px] mb-[4px]">
                          Tích điểm x1.5
                        </h4>
                        <p className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)]">
                          Cho mỗi giao dịch
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Membership Tiers */}
                  <div>
                    <h3 className="font-['Satoshi',sans-serif] font-bold text-[20px] mb-[16px]">
                      Các hạng thành viên
                    </h3>
                    <div className="space-y-[12px]">
                      <div className="border border-[rgba(0,0,0,0.1)] rounded-[12px] p-[20px] flex items-center justify-between">
                        <div>
                          <h4 className="font-['Satoshi',sans-serif] font-bold text-[18px] mb-[4px]">
                            BRONZE
                          </h4>
                          <p className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)]">
                            Tổng chi tiêu: 0₫ - 999.999₫
                          </p>
                        </div>
                        <span className="font-['Satoshi',sans-serif] font-medium text-[14px] text-[rgba(0,0,0,0.6)]">
                          Giảm 0%
                        </span>
                      </div>

                      <div className="border-2 border-black rounded-[12px] p-[20px] flex items-center justify-between bg-[rgba(0,0,0,0.02)]">
                        <div>
                          <h4 className="font-['Satoshi',sans-serif] font-bold text-[18px] mb-[4px]">
                            SILVER (Hiện tại)
                          </h4>
                          <p className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)]">
                            Tổng chi tiêu: 1.000.000₫ - 2.999.999₫
                          </p>
                        </div>
                        <span className="font-['Satoshi',sans-serif] font-bold text-[16px]">
                          Giảm 5%
                        </span>
                      </div>

                      <div className="border border-[rgba(0,0,0,0.1)] rounded-[12px] p-[20px] flex items-center justify-between">
                        <div>
                          <h4 className="font-['Satoshi',sans-serif] font-bold text-[18px] mb-[4px]">
                            GOLD
                          </h4>
                          <p className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)]">
                            Tổng chi tiêu: 3.000.000₫ - 4.999.999₫
                          </p>
                        </div>
                        <span className="font-['Satoshi',sans-serif] font-medium text-[14px] text-[rgba(0,0,0,0.6)]">
                          Giảm 10%
                        </span>
                      </div>

                      <div className="border border-[rgba(0,0,0,0.1)] rounded-[12px] p-[20px] flex items-center justify-between">
                        <div>
                          <h4 className="font-['Satoshi',sans-serif] font-bold text-[18px] mb-[4px]">
                            PLATINUM
                          </h4>
                          <p className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)]">
                            Tổng chi tiêu: Từ 5.000.000₫
                          </p>
                        </div>
                        <span className="font-['Satoshi',sans-serif] font-medium text-[14px] text-[rgba(0,0,0,0.6)]">
                          Giảm 15%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </div>

    {/* Footer */}
    <div className="bg-[#f0f0f0] w-full">
      <div className="px-[100px] pt-[50px] pb-[40px]">
        <div className="flex items-center justify-between">
          <p className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)]">
            Clothify © 2000-2026, Bảo lưu mọi quyền
          </p>
        </div>
      </div>
    </div>
  </div>
);
}
