import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    postalCode: '',
    phone: '',
    agreeMarketing: true,
    saveInfo: false
  });

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('qr');
  const [discountCode, setDiscountCode] = useState('');

  // Sample cart items
  const cartItems = [
    {
      id: 1,
      name: 'Áo Thun Họa Tiết One Life',
      size: 'L',
      quantity: 2,
      price: 260000,
      originalPrice: 300000,
      discount: 40,
      image: 'https://www.figma.com/api/mcp/asset/c9dcaf3c-410a-4907-a444-136c5e3a7c10'
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 50000;
  const savedAmount = cartItems.reduce((sum, item) => {
    const saved = item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0;
    return sum + saved;
  }, 0);
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle checkout logic here
    console.log('Checkout submitted', formData, paymentMethod);
  };

  return (
    <div className="bg-[#f7f7f7] min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-[rgba(0,0,0,0.1)]">
        <div className="px-[100px] py-[24px] flex items-center justify-between">
          <div className="flex items-center gap-[16px]">
            <h1 
              className="font-['Integral_CF',sans-serif] font-bold text-[28px] text-black cursor-pointer"
              onClick={() => navigate('/')}
            >
              Clothify
            </h1>
            <span className="text-[rgba(0,0,0,0.4)]">|</span>
            <h2 className="font-['Satoshi',sans-serif] text-[20px] text-[rgba(0,0,0,0.6)]">
              Thanh toán
            </h2>
          </div>
        </div>
      </header>

      <div className="max-w-[1240px] mx-auto px-[100px] py-[50px]">
        <div className="flex gap-[60px]">
          {/* Left Column - Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-[32px]">
              {/* Contact Information */}
              <section className="bg-white rounded-[20px] p-[32px]">
                <div className="flex items-center justify-between mb-[24px]">
                  <h2 className="font-['Satoshi',sans-serif] font-bold text-[24px] text-black">
                    Liên hệ
                  </h2>
                  <button 
                    type="button"
                    onClick={() => navigate('/login')}
                    className="font-['Satoshi',sans-serif] text-[16px] text-black hover:underline"
                  >
                    Đăng nhập
                  </button>
                </div>

                <div className="space-y-[20px]">
                  <div>
                    <label className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] mb-[8px] block">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Nhập địa chỉ email của bạn"
                      className="w-full px-[16px] py-[12px] border border-[rgba(0,0,0,0.2)] rounded-[8px] font-['Satoshi',sans-serif] text-[16px] outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="marketing"
                      checked={formData.agreeMarketing}
                      onChange={(e) => setFormData({...formData, agreeMarketing: e.target.checked})}
                      className="w-[18px] h-[18px] rounded border-[rgba(0,0,0,0.2)] mr-[12px]"
                    />
                    <label htmlFor="marketing" className="font-['Satoshi',sans-serif] text-[14px] text-black">
                      Gửi cho tôi tin tức và ưu đãi qua email
                    </label>
                  </div>
                </div>
              </section>

              {/* Delivery Information */}
              <section className="bg-white rounded-[20px] p-[32px]">
                <h2 className="font-['Satoshi',sans-serif] font-bold text-[24px] text-black mb-[8px]">
                  Thông tin giao hàng
                </h2>
                <p className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] mb-[24px]">
                  Địa chỉ này cũng sẽ được dùng làm địa chỉ thanh toán cho đơn hàng này.
                </p>

                <div className="space-y-[16px]">
                  <div>
                    <label className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] mb-[8px] block">
                      Quốc gia/Vùng
                    </label>
                    <select className="w-full px-[16px] py-[12px] border border-[rgba(0,0,0,0.2)] rounded-[8px] font-['Satoshi',sans-serif] text-[16px] outline-none focus:border-black transition-colors">
                      <option>Việt Nam</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-[16px]">
                    <div>
                      <label className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] mb-[8px] block">
                        Tên
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        placeholder="Tên"
                        className="w-full px-[16px] py-[12px] border border-[rgba(0,0,0,0.2)] rounded-[8px] font-['Satoshi',sans-serif] text-[16px] outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] mb-[8px] block">
                        Họ
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        placeholder="Họ"
                        className="w-full px-[16px] py-[12px] border border-[rgba(0,0,0,0.2)] rounded-[8px] font-['Satoshi',sans-serif] text-[16px] outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] mb-[8px] block">
                      Địa chỉ
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address1}
                      onChange={(e) => setFormData({...formData, address1: e.target.value})}
                      placeholder="Số nhà, tên đường"
                      className="w-full px-[16px] py-[12px] border border-[rgba(0,0,0,0.2)] rounded-[8px] font-['Satoshi',sans-serif] text-[16px] outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div>
                    <label className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] mb-[8px] block">
                      Phường/Xã, Quận/Huyện
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address2}
                      onChange={(e) => setFormData({...formData, address2: e.target.value})}
                      placeholder="Phường/Xã, Quận/Huyện"
                      className="w-full px-[16px] py-[12px] border border-[rgba(0,0,0,0.2)] rounded-[8px] font-['Satoshi',sans-serif] text-[16px] outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-[16px]">
                    <div>
                      <label className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] mb-[8px] block">
                        Thành phố
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        placeholder="Thành phố"
                        className="w-full px-[16px] py-[12px] border border-[rgba(0,0,0,0.2)] rounded-[8px] font-['Satoshi',sans-serif] text-[16px] outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] mb-[8px] block">
                        Mã bưu chính (không bắt buộc)
                      </label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                        placeholder="Mã bưu chính"
                        className="w-full px-[16px] py-[12px] border border-[rgba(0,0,0,0.2)] rounded-[8px] font-['Satoshi',sans-serif] text-[16px] outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] mb-[8px] block">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Số điện thoại"
                      className="w-full px-[16px] py-[12px] border border-[rgba(0,0,0,0.2)] rounded-[8px] font-['Satoshi',sans-serif] text-[16px] outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="saveInfo"
                      checked={formData.saveInfo}
                      onChange={(e) => setFormData({...formData, saveInfo: e.target.checked})}
                      className="w-[18px] h-[18px] rounded border-[rgba(0,0,0,0.2)] mr-[12px]"
                    />
                    <label htmlFor="saveInfo" className="font-['Satoshi',sans-serif] text-[14px] text-black">
                      Lưu lại thông tin này cho lần sau
                    </label>
                  </div>
                </div>
              </section>

              {/* Shipping Method */}
              <section className="bg-white rounded-[20px] p-[32px]">
                <h2 className="font-['Satoshi',sans-serif] font-bold text-[24px] text-black mb-[24px]">
                  Phương thức vận chuyển
                </h2>

                <div 
                  className={`border ${shippingMethod === 'standard' ? 'border-black' : 'border-[rgba(0,0,0,0.2)]'} rounded-[12px] p-[20px] cursor-pointer transition-colors`}
                  onClick={() => setShippingMethod('standard')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[12px]">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="w-[20px] h-[20px]"
                      />
                      <div>
                        <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-black">
                          Giao hàng tiêu chuẩn
                        </p>
                        <p className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)]">
                          Thời gian nhận: 3-5 ngày
                        </p>
                      </div>
                    </div>
                    <p className="font-['Satoshi',sans-serif] font-bold text-[18px] text-black">
                      50.000₫
                    </p>
                  </div>
                </div>
              </section>

              {/* Payment Method */}
              <section className="bg-white rounded-[20px] p-[32px]">
                <h2 className="font-['Satoshi',sans-serif] font-bold text-[24px] text-black mb-[8px]">
                  Phương thức thanh toán
                </h2>
                <p className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] mb-[24px]">
                  Địa chỉ thanh toán phải khớp với địa chỉ giao hàng. Toàn bộ giao dịch được bảo mật và mã hóa.
                </p>

                <div className="space-y-[12px]">
                  <div 
                    className={`border ${paymentMethod === 'qr' ? 'border-black' : 'border-[rgba(0,0,0,0.2)]'} rounded-[12px] p-[20px] cursor-pointer transition-colors`}
                    onClick={() => setPaymentMethod('qr')}
                  >
                    <div className="flex items-center gap-[12px]">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'qr'}
                        onChange={() => setPaymentMethod('qr')}
                        className="w-[20px] h-[20px]"
                      />
                      <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-black">
                        Thanh toán QR Code
                      </p>
                    </div>
                  </div>

                  <div 
                    className={`border ${paymentMethod === 'card' ? 'border-black' : 'border-[rgba(0,0,0,0.2)]'} rounded-[12px] p-[20px] cursor-pointer transition-colors`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="flex items-center gap-[12px]">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="w-[20px] h-[20px]"
                      />
                      <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-black">
                        Thanh toán thẻ (Credit/ATM Card)
                      </p>
                    </div>
                  </div>

                  <div 
                    className={`border ${paymentMethod === 'cod' ? 'border-black' : 'border-[rgba(0,0,0,0.2)]'} rounded-[12px] p-[20px] cursor-pointer transition-colors`}
                    onClick={() => setPaymentMethod('cod')}
                  >
                    <div className="flex items-center gap-[12px]">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="w-[20px] h-[20px]"
                      />
                      <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-black">
                        Thanh toán khi nhận hàng (COD)
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white font-['Satoshi',sans-serif] font-medium text-[18px] py-[16px] rounded-[62px] hover:bg-gray-800 transition-colors"
              >
                Thanh toán ngay
              </button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-[450px]">
            <div className="bg-white rounded-[20px] p-[32px] sticky top-[20px]">
              <h2 className="font-['Satoshi',sans-serif] font-bold text-[24px] text-black mb-[24px]">
                Tổng quan đơn hàng
              </h2>

              {/* Cart Items */}
              <div className="space-y-[20px] mb-[24px] pb-[24px] border-b border-[rgba(0,0,0,0.1)]">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-[16px]">
                    <div className="relative w-[80px] h-[80px] rounded-[12px] overflow-hidden bg-[#f0f0f0] flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-[-4px] right-[-4px] bg-black text-white rounded-full w-[24px] h-[24px] flex items-center justify-center text-[12px] font-bold">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-['Satoshi',sans-serif] font-medium text-[16px] text-black mb-[4px]">
                        {item.name}
                      </h4>
                      <p className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] mb-[8px]">
                        Size: {item.size}
                      </p>
                      <div className="flex items-center gap-[8px]">
                        <p className="font-['Satoshi',sans-serif] font-bold text-[16px] text-black">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                        </p>
                        {item.originalPrice && (
                          <p className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.4)] line-through">
                            {(item.originalPrice * item.quantity).toLocaleString('vi-VN')}₫
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Discount Code */}
              <div className="mb-[24px] pb-[24px] border-b border-[rgba(0,0,0,0.1)]">
                <label className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] mb-[8px] block">
                  Mã giảm giá
                </label>
                <div className="flex gap-[8px]">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Nhập mã giảm giá"
                    className="flex-1 px-[16px] py-[12px] border border-[rgba(0,0,0,0.2)] rounded-[8px] font-['Satoshi',sans-serif] text-[16px] outline-none focus:border-black transition-colors"
                  />
                  <button
                    type="button"
                    className="px-[24px] py-[12px] bg-black text-white font-['Satoshi',sans-serif] font-medium text-[16px] rounded-[8px] hover:bg-gray-800 transition-colors"
                  >
                    Áp dụng
                  </button>
                </div>
              </div>

              {/* Cost Summary */}
              <div className="space-y-[16px]">
                <div className="flex items-center justify-between">
                  <p className="font-['Satoshi',sans-serif] text-[16px] text-[rgba(0,0,0,0.6)]">
                    Tạm tính
                  </p>
                  <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-black">
                    {subtotal.toLocaleString('vi-VN')}₫
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="font-['Satoshi',sans-serif] text-[16px] text-[rgba(0,0,0,0.6)]">
                    Phí vận chuyển
                  </p>
                  <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-black">
                    {shipping.toLocaleString('vi-VN')}₫
                  </p>
                </div>

                {savedAmount > 0 && (
                  <div className="flex items-center justify-between text-[#ff3333]">
                    <p className="font-['Satoshi',sans-serif] text-[16px]">
                      Tiết kiệm được
                    </p>
                    <p className="font-['Satoshi',sans-serif] font-medium text-[16px]">
                      -{savedAmount.toLocaleString('vi-VN')}₫
                    </p>
                  </div>
                )}

                <div className="pt-[16px] border-t border-[rgba(0,0,0,0.1)]">
                  <div className="flex items-center justify-between">
                    <p className="font-['Satoshi',sans-serif] font-bold text-[20px] text-black">
                      Tổng cộng
                    </p>
                    <p className="font-['Satoshi',sans-serif] font-bold text-[24px] text-black">
                      {total.toLocaleString('vi-VN')}₫
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-[rgba(0,0,0,0.1)] py-[24px]">
        <div className="max-w-[1240px] mx-auto px-[100px]">
          <div className="flex items-center justify-center gap-[32px]">
            <button className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] hover:text-black">
              Chính sách hoàn tiền
            </button>
            <button className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] hover:text-black">
              Vận chuyển
            </button>
            <button className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] hover:text-black">
              Chính sách quyền riêng tư
            </button>
            <button className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] hover:text-black">
              Điều khoản dịch vụ
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
