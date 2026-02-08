import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

// Image assets from Figma
const imgImage8 = "https://www.figma.com/api/mcp/asset/0338fd14-294f-4b94-bc1f-5330b76266c1";
const imgImage9 = "https://www.figma.com/api/mcp/asset/9a6702fa-a587-449b-ae02-085164635564";
const imgImage10 = "https://www.figma.com/api/mcp/asset/d1e6d43d-ee47-48d8-a895-bb804ad68bbb";
const imgFrame = "https://www.figma.com/api/mcp/asset/8a22389c-5ea1-45a1-8a6a-c4696b31052a";
const imgFrame1 = "https://www.figma.com/api/mcp/asset/da65edb5-42a4-4f2b-91d9-1ddde8b0e9cf";
const imgFrame2 = "https://www.figma.com/api/mcp/asset/93339174-3ff5-4953-9c43-9952e9c4b44e";
const imgFrame3 = "https://www.figma.com/api/mcp/asset/bc5f690c-88f3-48fd-b717-bae4bd829264";
const imgFrame4 = "https://www.figma.com/api/mcp/asset/803fe5fe-7b6f-4b8b-baab-15dd9e94dd19";
const imgFrame5 = "https://www.figma.com/api/mcp/asset/8af35970-9f0b-47a3-bfc8-313d898d682e";
const imgLine4 = "https://www.figma.com/api/mcp/asset/5443415a-858b-4510-a580-98652a74ab43";
const imgFrame6 = "https://www.figma.com/api/mcp/asset/e3a10a84-d08b-45ea-a40c-c5d09908a038";
const imgBg = "https://www.figma.com/api/mcp/asset/c2ad18c0-c967-42d6-8cdb-06afc1bcbd21";
const imgGroup = "https://www.figma.com/api/mcp/asset/e101f727-5ba8-410f-b732-33987f4f8954";
const imgBg1 = "https://www.figma.com/api/mcp/asset/e6344611-8c73-4df4-a8f1-21425870860d";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/88a3d390-24e9-4841-9e4a-67e3ed031008";
const imgGroup2 = "https://www.figma.com/api/mcp/asset/136381ec-1b10-46ea-9f9f-3a33642251d8";
const imgGroup3 = "https://www.figma.com/api/mcp/asset/f88b7a06-0900-4d10-83de-aa7fd923f0b5";
const imgBadge = "https://www.figma.com/api/mcp/asset/e5e83fdf-48c8-4085-bdff-60fe32705899";
const imgBadge1 = "https://www.figma.com/api/mcp/asset/1a33dfe7-4f84-4ea0-9dc8-6521d4561ece";
const imgBadge2 = "https://www.figma.com/api/mcp/asset/486cbb85-a7ad-4aeb-8728-6ce7709491b2";
const imgBadge3 = "https://www.figma.com/api/mcp/asset/0a7ea066-4d3d-4b0d-9107-0d4fb2615206";
const imgBadge4 = "https://www.figma.com/api/mcp/asset/9c740a53-0caa-45ca-a375-ad9f35815901";
const imgFrame7 = "https://www.figma.com/api/mcp/asset/47f6831e-64ac-4be7-9370-3180d3ffe154";
const imgFrame8 = "https://www.figma.com/api/mcp/asset/b2d4b6ff-654e-4268-9264-92b16a2d753d";
const imgFrame9 = "https://www.figma.com/api/mcp/asset/361a75db-bef0-4ee1-9f30-5e9b06f981e2";
const imgLine5 = "https://www.figma.com/api/mcp/asset/47f16e12-6d32-4cf2-85d1-e39d804a0d60";
const imgLine6 = "https://www.figma.com/api/mcp/asset/666861b3-0959-4f8e-963d-1e9818df6d0f";
const imgFrame10 = "https://www.figma.com/api/mcp/asset/41c40b6f-9299-4b5a-80e8-20f2c4a85609";
const imgArrowDownBold1 = "https://www.figma.com/api/mcp/asset/3bf03480-c3b5-4dd8-86a6-813cb81b400f";

export default function Cart() {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  
  // Cart items state
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Gradient Graphic T-shirt',
      size: 'Large',
      color: 'White',
      price: 145,
      quantity: 1,
      image: imgImage8
    },
    {
      id: 2,
      name: 'CHECKERED SHIRT',
      size: 'Medium',
      color: 'Red',
      price: 180,
      quantity: 1,
      image: imgImage9
    },
    {
      id: 3,
      name: 'SKINNY FIT JEANS',
      size: 'Large',
      color: 'Blue',
      price: 240,
      quantity: 1,
      image: imgImage10
    }
  ]);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="bg-white relative w-full min-h-screen" data-name="Cart">
      <Header />

      {/* Breadcrumb */}
      <div className="content-stretch flex gap-[12px] items-center px-[100px] py-[24px] pt-[158px]">
          <div className="content-stretch flex gap-[4px] items-center cursor-pointer" onClick={() => navigate('/')}>
            <p className="font-['Satoshi',sans-serif] leading-[normal] text-[16px] text-[rgba(0,0,0,0.6)]">
              Trang Chủ
            </p>
            <div className="flex items-center justify-center size-[16px]">
              <div className="-rotate-90 flex-none">
                <div className="size-[16px]">
                  <img alt="" className="block max-w-none size-full" src={imgFrame5} />
                </div>
              </div>
            </div>
          </div>
          <p className="font-['Satoshi',sans-serif] leading-[normal] text-[16px] text-black">
            Giỏ Hàng
          </p>
        </div>

        {/* Page Title */}
        <div className="px-[100px] py-[20px]">
          <h1 className="font-['Integral_CF',sans-serif] font-bold text-[40px] text-black">
            Giỏ Hàng Của Bạn
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex gap-[20px] px-[100px] pb-[120px]">
          {/* Cart Items */}
          <div className="border border-[rgba(0,0,0,0.1)] border-solid flex flex-col gap-[24px] flex-1 px-[24px] py-[20px] rounded-[20px]">
            {cartItems.map((item, index) => (
              <div key={item.id}>
                <div className="flex gap-[16px] items-center w-full">
                  <div className="bg-[#f0eeed] overflow-clip rounded-[8.658px] shrink-0 size-[124px]">
                    <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                  </div>
                  <div className="flex flex-1 items-center justify-between">
                    <div className="flex flex-col h-[118px] justify-between">
                      <div className="flex flex-col gap-[2px]">
                        <p className="font-['Satoshi',sans-serif] font-bold text-[20px] text-black">
                          {item.name}
                        </p>
                        <div className="flex flex-col font-['Satoshi',sans-serif] gap-[4px] text-[14px]">
                          <p>
                            <span className="text-black">Kích cỡ: </span>
                            <span className="text-[rgba(0,0,0,0.6)]">{item.size}</span>
                          </p>
                          <p>
                            <span className="text-black">Màu: </span>
                            <span className="text-[rgba(0,0,0,0.6)]">{item.color}</span>
                          </p>
                        </div>
                      </div>
                      <p className="font-['Satoshi',sans-serif] font-bold text-[24px] text-black">
                        ${item.price}
                      </p>
                    </div>
                    <div className="flex flex-col h-[124px] items-end justify-between w-[225px]">
                      <div 
                        className="size-[24px] cursor-pointer"
                        onClick={() => removeItem(item.id)}
                      >
                        <img alt="remove" className="block max-w-none size-full" src={imgFrame7} />
                      </div>
                      <div className="bg-[#f0f0f0] flex gap-[20px] items-center justify-center px-[20px] py-[12px] rounded-[62px]">
                        <div 
                          className="size-[20px] cursor-pointer"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <img alt="decrease" className="block max-w-none size-full" src={imgFrame8} />
                        </div>
                        <p className="font-['Satoshi',sans-serif] font-medium text-[14px] text-black">
                          {item.quantity}
                        </p>
                        <div 
                          className="size-[20px] cursor-pointer"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <img alt="increase" className="block max-w-none size-full" src={imgFrame9} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {index < cartItems.length - 1 && (
                  <div className="h-0 w-full mt-[24px]">
                    <div className="h-[1px] w-full">
                      <img alt="" className="block max-w-none w-full h-full" src={imgLine5} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border border-[rgba(0,0,0,0.1)] border-solid flex flex-col gap-[24px] h-fit px-[24px] py-[20px] rounded-[20px] w-[505px]">
            <h2 className="font-['Satoshi',sans-serif] font-bold text-[24px] text-black">
              Tổng Đơn Hàng
            </h2>
            <div className="flex flex-col gap-[20px] w-full">
              <div className="flex items-center justify-between text-[20px] w-full">
                <p className="font-['Satoshi',sans-serif] text-[rgba(0,0,0,0.6)]">
                  Tạm tính
                </p>
                <p className="font-['Satoshi',sans-serif] font-bold text-black text-right">
                  ${subtotal}
                </p>
              </div>
              <div className="flex items-center justify-between text-[20px] w-full">
                <p className="font-['Satoshi',sans-serif] text-[rgba(0,0,0,0.6)]">
                  Giảm giá (-20%)
                </p>
                <p className="font-['Satoshi',sans-serif] font-bold text-[#f33] text-right">
                  -${discount}
                </p>
              </div>
              <div className="flex items-center justify-between text-[20px] w-full">
                <p className="font-['Satoshi',sans-serif] text-[rgba(0,0,0,0.6)]">
                  Phí giao hàng
                </p>
                <p className="font-['Satoshi',sans-serif] font-bold text-black text-right">
                  ${deliveryFee}
                </p>
              </div>
              <div className="h-0 w-full">
                <div className="h-[1px] w-full">
                  <img alt="" className="block max-w-none w-full h-full" src={imgLine6} />
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <p className="font-['Satoshi',sans-serif] text-[20px] text-black">
                  Tổng cộng
                </p>
                <p className="font-['Satoshi',sans-serif] font-bold text-[24px] text-black text-right">
                  ${total}
                </p>
              </div>
            </div>
            <div className="flex gap-[12px] items-center justify-center w-full">
              <div className="bg-[#f0f0f0] flex flex-1 gap-[12px] items-start px-[16px] py-[12px] rounded-[62px]">
                <div className="size-[24px]">
                  <img alt="" className="block max-w-none size-full" src={imgFrame10} />
                </div>
                <input
                  type="text"
                  placeholder="Nhập mã giảm giá"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="font-['Satoshi',sans-serif] bg-transparent leading-[normal] text-[16px] text-black placeholder:text-[rgba(0,0,0,0.4)] flex-1 outline-none"
                />
              </div>
              <button className="bg-black flex items-center justify-center px-[16px] py-[12px] rounded-[62px] w-[119px]">
                <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-white">
                  Áp dụng
                </p>
              </button>
            </div>
            <button className="bg-black flex gap-[12px] h-[60px] items-center justify-center px-[54px] py-[16px] rounded-[62px] w-full">
              <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-white">
                Thanh Toán
              </p>
              <div className="flex items-center justify-center size-[24px]">
                <div className="-rotate-90 flex-none">
                  <div className="size-[24px]">
                    <img alt="" className="block max-w-none size-full" src={imgArrowDownBold1} />
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-black mx-[100px] flex items-center justify-between px-[64px] py-[36px] rounded-[20px] mb-[90px]">
          <p className="font-['Integral_CF',sans-serif] font-bold leading-[45px] text-[40px] text-white w-[551px] whitespace-pre-wrap">
            ĐĂNG KÝ ĐỂ NHẬN THÔNG TIN VỀ ƯU ĐÃI MỚI NHẤT
          </p>
          <div className="flex flex-col gap-[14px]">
            <div className="bg-white flex gap-[12px] items-start px-[16px] py-[12px] rounded-[62px] w-[349px]">
              <div className="size-[24px]">
                <img alt="" className="block max-w-none size-full" src={imgFrame6} />
              </div>
              <input
                type="email"
                placeholder="Nhập địa chỉ email của bạn"
                className="font-['Satoshi',sans-serif] bg-transparent leading-[normal] text-[16px] text-black placeholder:text-[rgba(0,0,0,0.4)] flex-1 outline-none"
              />
            </div>
            <button className="bg-white flex items-center justify-center px-[16px] py-[12px] rounded-[62px] w-[349px]">
              <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-black">
                Đăng Ký Nhận Tin
              </p>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f0f0f0] w-full">
          <div className="px-[100px] pt-[140px] pb-[88px]">
            <div className="flex items-start justify-between w-full mb-[50px]">
              <div className="flex flex-col gap-[35px]">
                <div className="flex flex-col gap-[25px]">
                  <div className="font-['Integral_CF',sans-serif] font-bold text-[33.455px] text-black">
                    <p>Clothify</p>
                  </div>
                  <p className="font-['Satoshi',sans-serif] leading-[22px] text-[14px] text-[rgba(0,0,0,0.6)] w-[248px] whitespace-pre-wrap">
                    Chúng tôi có quần áo phù hợp với phong cách của bạn và bạn tự hào khi mặc. Từ phụ nữ đến nam giới.
                  </p>
                </div>
                <div className="flex gap-[12px]">
                  <div className="size-[28px] cursor-pointer">
                    <img alt="" className="block max-w-none size-full" src={imgBg} />
                  </div>
                  <div className="size-[28px] cursor-pointer">
                    <img alt="" className="block max-w-none size-full" src={imgBg1} />
                  </div>
                  <div className="size-[28px] cursor-pointer">
                    <img alt="" className="block max-w-none size-full" src={imgBg} />
                  </div>
                  <div className="size-[28px] cursor-pointer">
                    <img alt="" className="block max-w-none size-full" src={imgBg} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[26px] text-[16px]">
                <p className="font-['Satoshi',sans-serif] font-medium leading-[18px] text-black tracking-[3px] uppercase">
                  Công ty
                </p>
                <div className="font-['Satoshi',sans-serif] leading-[19px] text-[rgba(0,0,0,0.6)]">
                  <p className="mb-2 cursor-pointer">Về chúng tôi</p>
                  <p className="mb-2 cursor-pointer">Tính năng</p>
                  <p className="mb-2 cursor-pointer">Hoạt động</p>
                  <p className="cursor-pointer">Nghề nghiệp</p>
                </div>
              </div>
              <div className="flex flex-col gap-[26px] text-[16px]">
                <p className="font-['Satoshi',sans-serif] font-medium leading-[18px] text-black tracking-[3px] uppercase">
                  Trợ giúp
                </p>
                <div className="font-['Satoshi',sans-serif] leading-[19px] text-[rgba(0,0,0,0.6)]">
                  <p className="mb-2 cursor-pointer">Hỗ trợ khách hàng</p>
                  <p className="mb-2 cursor-pointer">Chi tiết giao hàng</p>
                  <p className="mb-2 cursor-pointer">Điều khoản & Điều kiện</p>
                  <p className="cursor-pointer">Chính sách bảo mật</p>
                </div>
              </div>
              <div className="flex flex-col gap-[26px] text-[16px]">
                <p className="font-['Satoshi',sans-serif] font-medium leading-[18px] text-black tracking-[3px] uppercase">
                  FAQ
                </p>
                <div className="font-['Satoshi',sans-serif] leading-[19px] text-[rgba(0,0,0,0.6)]">
                  <p className="mb-2 cursor-pointer">Tài khoản</p>
                  <p className="mb-2 cursor-pointer">Quản lý giao hàng</p>
                  <p className="mb-2 cursor-pointer">Đơn hàng</p>
                  <p className="cursor-pointer">Thanh toán</p>
                </div>
              </div>
              <div className="flex flex-col gap-[26px] text-[16px]">
                <p className="font-['Satoshi',sans-serif] font-medium leading-[18px] text-black tracking-[3px] uppercase">
                  Tài nguyên
                </p>
                <div className="font-['Satoshi',sans-serif] leading-[19px] text-[rgba(0,0,0,0.6)]">
                  <p className="mb-2 cursor-pointer">eBooks miễn phí</p>
                  <p className="mb-2 cursor-pointer">Hướng dẫn phát triển</p>
                  <p className="mb-2 cursor-pointer">Blog hướng dẫn</p>
                  <p className="cursor-pointer">Danh sách Youtube</p>
                </div>
              </div>
            </div>
            <div className="h-[1px] w-full mb-[25px]">
              <img alt="" className="block max-w-none w-full h-full" src={imgLine4} />
            </div>
            <div className="flex items-center justify-between">
              <p className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)]">
                Clothify © 2000-2026, Bảo lưu mọi quyền
              </p>
              <div className="flex gap-[12px] items-end">
                <img alt="payment" className="h-[30.03px] w-[46.614px]" src={imgBadge} />
                <img alt="payment" className="h-[30.03px] w-[46.614px]" src={imgBadge1} />
                <img alt="payment" className="h-[30.03px] w-[46.614px]" src={imgBadge2} />
                <img alt="payment" className="h-[30.03px] w-[46.614px]" src={imgBadge3} />
                <img alt="payment" className="h-[30.03px] w-[46.614px]" src={imgBadge4} />
              </div>
            </div>
          </div>
        </div>
      </div>
   
  );
}
