import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

// Image assets from Figma
const imgImage8 = "https://www.figma.com/api/mcp/asset/70737498-784f-4455-82d1-79082a9810d2";
const imgImage9 = "https://www.figma.com/api/mcp/asset/00299dcd-a8b3-431a-af31-8a796a263e43";
const imgImage10 = "https://www.figma.com/api/mcp/asset/1fb3bde3-fb42-42d0-b2ae-d3985b176e7f";
const imgImage11 = "https://www.figma.com/api/mcp/asset/56d91118-ef38-4aa8-a83c-20ad7404dd28";
const imgImage12 = "https://www.figma.com/api/mcp/asset/b1c7b664-cbd6-48e6-a359-c99f76b561fd";
const imgImage13 = "https://www.figma.com/api/mcp/asset/e4208669-84f7-4dff-9a67-dafc9fe41660";
const imgImage7 = "https://www.figma.com/api/mcp/asset/ed3d1469-e072-4890-9b16-f445472b05a0";
const imgImage14 = "https://www.figma.com/api/mcp/asset/a95549ca-6fe4-4df8-9133-3aa5675e752a";
const imgImage15 = "https://www.figma.com/api/mcp/asset/3ea3f34a-1ccb-469c-92a6-ffe0605579d0";
const imgFrame = "https://www.figma.com/api/mcp/asset/29c26cbc-ad62-4324-9578-48de946edcf0";
const imgFrame1 = "https://www.figma.com/api/mcp/asset/463454b2-d2d7-4350-9578-815dffb008c8";
const imgFrame2 = "https://www.figma.com/api/mcp/asset/93f6f41b-0021-4b9b-ab43-01573ab63762";
const imgFrame3 = "https://www.figma.com/api/mcp/asset/a43ae826-12c9-44fa-ac11-d7121fef7715";
const imgFrame4 = "https://www.figma.com/api/mcp/asset/5d383600-b0e6-4a28-bf7d-080619400595";
const imgFrame5 = "https://www.figma.com/api/mcp/asset/d684e447-c3e3-42e4-82d8-f90fde2b373c";
const imgLine4 = "https://www.figma.com/api/mcp/asset/bfcb755b-a9db-4366-a0f9-4e272b738f91";
const imgFrame6 = "https://www.figma.com/api/mcp/asset/4eca2aef-ccb8-45c1-b8b6-8bcc5c51a27a";
const imgBg = "https://www.figma.com/api/mcp/asset/7c1d3e1e-feee-4601-868a-ddf3694d842c";
const imgGroup = "https://www.figma.com/api/mcp/asset/7b304269-1362-44e2-9a21-9d774eb1f718";
const imgBg1 = "https://www.figma.com/api/mcp/asset/bcd82cba-e4a3-4e97-8944-b442243a0768";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/e29dd9a4-fc1c-4707-8a34-16f0d94dbc01";
const imgGroup2 = "https://www.figma.com/api/mcp/asset/9ce2a116-f25c-4ee3-a9c8-6a8c72537a84";
const imgGroup3 = "https://www.figma.com/api/mcp/asset/b7b8efc2-3332-40d9-b6c5-864d25336837";
const imgBadge = "https://www.figma.com/api/mcp/asset/00b77e93-381a-4de2-b892-71910e03864b";
const imgBadge1 = "https://www.figma.com/api/mcp/asset/64aeca7d-ac0d-48ff-8852-771808d70cf4";
const imgBadge2 = "https://www.figma.com/api/mcp/asset/c02123c2-05f1-44e5-a9d2-112a9f2207fb";
const imgBadge3 = "https://www.figma.com/api/mcp/asset/fe7a15ba-af6f-4c6f-86be-5e799536792e";
const imgBadge4 = "https://www.figma.com/api/mcp/asset/665d55df-0197-4d29-9141-1ae65f72eb06";
const imgFrame7 = "https://www.figma.com/api/mcp/asset/48c961b8-142f-4bfb-8d67-98b266d5ffd7";
const imgLine10 = "https://www.figma.com/api/mcp/asset/255f68bf-53c3-4efd-bafc-dcedde263642";
const imgFrame8 = "https://www.figma.com/api/mcp/asset/d5db161c-c281-4f1f-9733-7ef12e978b27";
const imgGroup6 = "https://www.figma.com/api/mcp/asset/0f4a28aa-7950-4ea6-bfd1-8fb219ef60ac";
const imgFrame77 = "https://www.figma.com/api/mcp/asset/3fe0d226-cefe-4fc8-8ca1-b84c036919a9";
const imgFrame78 = "https://www.figma.com/api/mcp/asset/55c259f9-d501-420d-b794-6e845997477c";

export default function Category() {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(true);
  const [selectedSize, setSelectedSize] = useState('L');
  const [priceRange, setPriceRange] = useState([50, 200]);

  const products = [
    { id: 1, name: 'Áo Thun Họa Tiết Chuyển Màu', price: 145000, image: imgImage8, rating: 3.5 },
    { id: 2, name: 'Áo Polo Chi Tiết Tipping', price: 180000, image: imgImage9, rating: 4.5 },
    { id: 3, name: 'Áo Thun Sọc Đen', price: 120000, oldPrice: 150000, discount: 30, image: imgImage10, rating: 5.0 },
    { id: 4, name: 'Quần Jeans Skinny Fit', price: 240000, oldPrice: 260000, discount: 20, image: imgImage11, rating: 3.5 },
    { id: 5, name: 'Áo Sơ Mi Kẻ Caro', price: 180000, image: imgImage12, rating: 4.5 },
    { id: 6, name: 'Áo Thun Sọc Tay Áo', price: 130000, oldPrice: 160000, discount: 30, image: imgImage13, rating: 4.5 },
    { id: 7, name: 'Áo Sơ Mi Sọc Dọc', price: 212000, oldPrice: 232000, discount: 20, image: imgImage7, rating: 5.0 },
    { id: 8, name: 'Áo Thun Họa Tiết Dũng Cảm', price: 145000, image: imgImage14, rating: 4.0 },
    { id: 9, name: 'Quần Short Bermuda Rộng', price: 80000, image: imgImage15, rating: 3.0 },
  ];

  const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];
  const categories = ['Áo Thun', 'Quần Short', 'Áo Sơ Mi', 'Áo Hoodie', 'Quần Jeans'];
  const dressStyles = ['Thường Ngày', 'Lịch Sự', 'Tiệc Tụng', 'Thể Thao'];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">⯨</span>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }
    
    return stars;
  };

  return (
    <div className="bg-white relative w-full min-h-screen" data-name="Category Page">
      <Header />

      {/* Breadcrumb & Category Title */}
      <div className="px-[100px] py-[24px] pt-[158px]">
        <div className="flex gap-[12px] items-center mb-[20px]">
          <div className="flex gap-[4px] items-center cursor-pointer" onClick={() => navigate('/')}>
            <p className="font-['Satoshi',sans-serif] leading-[normal] text-[16px] text-[rgba(0,0,0,0.6)]">
              Trang Chủ
            </p>
            <div className="flex items-center justify-center size-[16px]">
              <div className="-rotate-90">
                <div className="size-[16px]">
                  <img alt="" className="block max-w-none size-full" src={imgFrame5} />
                </div>
              </div>
            </div>
          </div>
          <p className="font-['Satoshi',sans-serif] leading-[normal] text-[16px] text-black">
            Thời Trang Thường Ngày
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-[20px] px-[100px] pb-[50px]">
          {/* Filter Sidebar */}
          <div className="border border-[rgba(0,0,0,0.1)] border-solid flex flex-col gap-[24px] h-fit px-[24px] py-[20px] rounded-[20px] w-[295px] sticky top-[20px]">
            <div className="flex items-center justify-between w-full">
              <h2 className="font-['Satoshi',sans-serif] font-bold text-[20px] text-black">
                Bộ Lọc
              </h2>
              <div className="size-[24px] cursor-pointer">
                <img alt="" className="block max-w-none size-full" src={imgFrame7} />
              </div>
            </div>
            
            <div className="h-[1px] w-full">
              <img alt="" className="block max-w-none w-full h-full" src={imgLine10} />
            </div>

            {/* Categories */}
            <div className="flex flex-col gap-[20px] w-full">
              {categories.map((category) => (
                <div key={category} className="flex items-center justify-between w-full cursor-pointer">
                  <p className="font-['Satoshi',sans-serif] text-[16px] text-[rgba(0,0,0,0.6)] hover:text-black">
                    {category}
                  </p>
                  <div className="flex items-center justify-center size-[16px]">
                    <div className="-rotate-90">
                      <div className="size-[16px]">
                        <img alt="" className="block max-w-none size-full" src={imgFrame5} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-[1px] w-full">
              <img alt="" className="block max-w-none w-full h-full" src={imgLine10} />
            </div>

            {/* Price Range */}
            <div className="flex flex-col gap-[20px] w-full">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-['Satoshi',sans-serif] font-bold text-[20px] text-black">
                  Giá
                </h3>
                <div className="flex items-center justify-center">
                  <div className="rotate-180">
                    <div className="size-[16px]">
                      <img alt="" className="block max-w-none size-full" src={imgFrame8} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="h-[20px] w-full">
                  <img alt="" className="block max-w-none size-full" src={imgGroup6} />
                </div>
                <div className="flex justify-between mt-[4px]">
                  <p className="font-['Satoshi',sans-serif] font-medium text-[14px] text-black">
                    {priceRange[0]}K
                  </p>
                  <p className="font-['Satoshi',sans-serif] font-medium text-[14px] text-black">
                    {priceRange[1]}K
                  </p>
                </div>
              </div>
            </div>

            <div className="h-[1px] w-full">
              <img alt="" className="block max-w-none w-full h-full" src={imgLine10} />
            </div>

            {/* Colors */}
            <div className="flex flex-col gap-[20px] w-full">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-['Satoshi',sans-serif] font-bold text-[20px] text-black">
                  Màu Sắc
                </h3>
                <div className="rotate-180">
                  <div className="size-[16px]">
                    <img alt="" className="block max-w-none size-full" src={imgFrame8} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[16px]">
                <div className="h-[37px] w-full">
                  <img alt="" className="block max-w-none size-full" src={imgFrame77} />
                </div>
                <div className="h-[37px] w-full">
                  <img alt="" className="block max-w-none size-full" src={imgFrame78} />
                </div>
              </div>
            </div>

            <div className="h-[1px] w-full">
              <img alt="" className="block max-w-none w-full h-full" src={imgLine10} />
            </div>

            {/* Size */}
            <div className="flex flex-col gap-[20px] w-full">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-['Satoshi',sans-serif] font-bold text-[20px] text-black">
                  Kích Cỡ
                </h3>
                <div className="rotate-180">
                  <div className="size-[16px]">
                    <img alt="" className="block max-w-none size-full" src={imgFrame8} />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-[8px]">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-[20px] py-[10px] rounded-[62px] ${
                      selectedSize === size
                        ? 'bg-black text-white font-medium'
                        : 'bg-[#f0f0f0] text-[rgba(0,0,0,0.6)]'
                    } font-['Satoshi',sans-serif] text-[14px]`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-[1px] w-full">
              <img alt="" className="block max-w-none w-full h-full" src={imgLine10} />
            </div>

            {/* Dress Style */}
            <div className="flex flex-col gap-[20px] w-full">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-['Satoshi',sans-serif] font-bold text-[20px] text-black">
                  Phong Cách
                </h3>
                <div className="rotate-180">
                  <div className="size-[16px]">
                    <img alt="" className="block max-w-none size-full" src={imgFrame8} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
                {dressStyles.map((style) => (
                  <div key={style} className="flex items-center justify-between w-full cursor-pointer">
                    <p className="font-['Satoshi',sans-serif] text-[16px] text-[rgba(0,0,0,0.6)] hover:text-black">
                      {style}
                    </p>
                    <div className="flex items-center justify-center size-[16px]">
                      <div className="-rotate-90">
                        <div className="size-[16px]">
                          <img alt="" className="block max-w-none size-full" src={imgFrame5} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="bg-black flex h-[48px] items-center justify-center px-[54px] py-[16px] rounded-[62px] w-full">
              <p className="font-['Satoshi',sans-serif] font-medium text-[14px] text-white">
                Áp Dụng Bộ Lọc
              </p>
            </button>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-[30px]">
              <h1 className="font-['Satoshi',sans-serif] font-bold text-[32px] text-black">
                Thời Trang Thường Ngày
              </h1>
              <div className="flex items-center gap-[12px]">
                <p className="font-['Satoshi',sans-serif] text-[16px] text-[rgba(0,0,0,0.6)]">
                  Hiển thị 1-10 trong 100 Sản Phẩm
                </p>
                <div className="flex gap-[4px] items-center cursor-pointer">
                  <p className="font-['Satoshi',sans-serif] text-[16px] text-[rgba(0,0,0,0.6)]">
                    Sắp xếp: <span className="font-medium text-black">Phổ Biến Nhất</span>
                  </p>
                  <div className="size-[16px]">
                    <img alt="" className="block max-w-none size-full" src={imgFrame1} />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-3 gap-[20px] mb-[50px]">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="bg-[#f0eeed] h-[298px] overflow-clip rounded-[20px] mb-[16px]">
                    <img 
                      alt={product.name} 
                      className="w-full h-full object-cover" 
                      src={product.image} 
                    />
                  </div>
                  <h3 className="font-['Satoshi',sans-serif] font-bold text-[20px] text-black mb-[8px]">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-[13px] mb-[8px]">
                    <div className="flex text-[18px]">
                      {renderStars(product.rating)}
                    </div>
                    <p className="font-['Satoshi',sans-serif] text-[14px] text-black">
                      {product.rating}<span className="text-[rgba(0,0,0,0.6)]">/5</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <p className="font-['Satoshi',sans-serif] font-bold text-[24px] text-black">
                      {product.price.toLocaleString('vi-VN')}₫
                    </p>
                    {product.oldPrice && (
                      <>
                        <p className="font-['Satoshi',sans-serif] font-bold text-[24px] text-[rgba(0,0,0,0.4)] line-through">
                          {product.oldPrice.toLocaleString('vi-VN')}₫
                        </p>
                        <div className="bg-[rgba(255,51,51,0.1)] px-[14px] py-[6px] rounded-[62px]">
                          <p className="font-['Satoshi',sans-serif] font-medium text-[12px] text-[#f33]">
                            -{product.discount}%
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-[8px] mb-[50px]">
              <button className="px-[14px] py-[8px] border border-[#7f56d9] rounded-[8px] bg-[#7f56d9] text-white font-['Inter',sans-serif] font-medium text-[14px]">
                ← Trước
              </button>
              <button className="size-[40px] flex items-center justify-center rounded-[8px] bg-[#f9f5ff] text-[#7f56d9] font-['Inter',sans-serif] font-medium text-[14px]">
                1
              </button>
              <button className="size-[40px] flex items-center justify-center rounded-[8px] text-[#667085] font-['Inter',sans-serif] font-medium text-[14px]">
                2
              </button>
              <button className="size-[40px] flex items-center justify-center rounded-[8px] text-[#667085] font-['Inter',sans-serif] font-medium text-[14px]">
                3
              </button>
              <button className="size-[40px] flex items-center justify-center rounded-[8px] text-[#667085] font-['Inter',sans-serif] font-medium text-[14px]">
                ...
              </button>
              <button className="size-[40px] flex items-center justify-center rounded-[8px] text-[#667085] font-['Inter',sans-serif] font-medium text-[14px]">
                10
              </button>
              <button className="px-[14px] py-[8px] border border-[#7f56d9] rounded-[8px] bg-[#7f56d9] text-white font-['Inter',sans-serif] font-medium text-[14px]">
                Sau →
              </button>
            </div>
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
