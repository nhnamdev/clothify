import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const imgImage1 = "https://www.figma.com/api/mcp/asset/c9dcaf3c-410a-4907-a444-136c5e3a7c10";
const imgImage5 = "https://www.figma.com/api/mcp/asset/380ce4c5-813d-4d69-8365-f287f2e23da6";
const imgImage6 = "https://www.figma.com/api/mcp/asset/705a35b7-efcb-49cd-ad5b-26fafc648ef5";
const imgImage7 = "https://www.figma.com/api/mcp/asset/7c4890e3-7600-4344-82cb-09320ee1697f";
const imgImage8 = "https://www.figma.com/api/mcp/asset/16ae16d5-6139-4ef2-bf73-692309ea3ee1";
const imgImage9 = "https://www.figma.com/api/mcp/asset/3443f11c-07e7-4ea4-a9f7-d6050cd78dc3";
const imgImage10 = "https://www.figma.com/api/mcp/asset/7ccf8068-6fd2-4db8-9329-3f13b4a15dc2";
const imgFrame = "https://www.figma.com/api/mcp/asset/7b787a39-c662-4664-a10f-772e110675d0";
const imgFrame1 = "https://www.figma.com/api/mcp/asset/bfc9581d-72e7-4744-8c60-38a118f5a656";
const imgFrame2 = "https://www.figma.com/api/mcp/asset/676dd4a0-403d-4538-962e-16100c24d40f";
const imgFrame3 = "https://www.figma.com/api/mcp/asset/6e070ab3-8ba0-4e7d-8c92-36f7972b8b3c";
const imgFrame4 = "https://www.figma.com/api/mcp/asset/10ac645f-a270-44c9-8c6d-384ce492942b";
const imgFrame5 = "https://www.figma.com/api/mcp/asset/eefbde48-3aac-4aa5-959b-7bb796541e58";
const imgFrame6 = "https://www.figma.com/api/mcp/asset/cff8c3f5-f736-402e-9598-24210600b9c9";
const imgFrame7 = "https://www.figma.com/api/mcp/asset/87f54a71-54ae-42a8-94f6-07b9e12d7d76";
const imgFrame8 = "https://www.figma.com/api/mcp/asset/46aebd72-55d4-48d5-a741-19d3a56f6d63";
const imgFrame10 = "https://www.figma.com/api/mcp/asset/c28b24ef-0de3-428b-be95-0582c7c9a5ba";
const imgFrame11 = "https://www.figma.com/api/mcp/asset/e7c4a472-0eb8-466b-88cb-3960dde33b96";
const imgFrame12 = "https://www.figma.com/api/mcp/asset/44d236b0-27fb-4faa-a388-7e3e4347e1e8";
const imgFrame13 = "https://www.figma.com/api/mcp/asset/c8e06818-2da5-4fc3-82a1-6ce659aedd7c";
const imgFrame14 = "https://www.figma.com/api/mcp/asset/4dfeed79-13d1-4a7e-9ea1-3efe30ddc5f4";
const imgLine1 = "https://www.figma.com/api/mcp/asset/8e0bdf22-d7e1-449b-93d1-196b752107f7";
const imgLine5 = "https://www.figma.com/api/mcp/asset/45c660f3-aa02-49be-bcd6-b8f6b29e671f";
const imgLine7 = "https://www.figma.com/api/mcp/asset/7c105586-37ce-4941-942d-b8c34ac11a72";
const imgFrame77 = "https://www.figma.com/api/mcp/asset/84cf6f9c-f826-4aae-ade1-94ded5691053";
const imgFrame15 = "https://www.figma.com/api/mcp/asset/180824d7-e9c9-44f3-bdc2-c2e5eb7beda0";
const imgFrame9 = "https://www.figma.com/api/mcp/asset/d5ffbeb9-a79f-42c6-b3ba-f4553d0e50dc";
const imgFrame16 = "https://www.figma.com/api/mcp/asset/3da9b897-9b7f-4585-a0df-ade5fb12ad3c";
const imgFrame17 = "https://www.figma.com/api/mcp/asset/3567a1fa-35be-4b5a-b578-8e5764caf0ca";
const imgFrame18 = "https://www.figma.com/api/mcp/asset/4b425cff-5fef-42b6-939b-6ff966bab4d8";
const imgFrame19 = "https://www.figma.com/api/mcp/asset/108483e5-6514-44d3-8390-ae02f2242d63";
const imgFrame20 = "https://www.figma.com/api/mcp/asset/ed627d20-eec8-44c4-a940-d3ad7aabbea5";
const imgBg = "https://www.figma.com/api/mcp/asset/a47d535d-e160-4ac4-b8df-d96d55dd516e";
const imgGroup = "https://www.figma.com/api/mcp/asset/bfeed933-4b7a-4e92-80c1-a307f70556f7";
const imgBg1 = "https://www.figma.com/api/mcp/asset/db858378-0f53-472a-85a8-6a194e467f0b";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/42421dc4-1582-47ae-a8ba-7adbce9f86c9";
const imgGroup2 = "https://www.figma.com/api/mcp/asset/ca09059f-f75c-48cf-b249-438858f07eb7";
const imgGroup3 = "https://www.figma.com/api/mcp/asset/992862c2-f717-4481-9a15-987d66c685c6";
const imgBadge = "https://www.figma.com/api/mcp/asset/a98e71ab-37b4-4b5a-8935-65acdd7382a9";
const imgBadge1 = "https://www.figma.com/api/mcp/asset/adeadb95-c34a-4d68-af85-bf2de3ebd380";
const imgBadge2 = "https://www.figma.com/api/mcp/asset/b69e06b8-95b1-4b3a-9369-e251002aacf6";
const imgBadge3 = "https://www.figma.com/api/mcp/asset/a135de8d-6178-4017-9fc6-afce7b10ac36";
const imgBadge4 = "https://www.figma.com/api/mcp/asset/57100f7a-6534-49eb-9459-cb8f835b4334";

export default function ProductDetail() {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(true);
  const [selectedSize, setSelectedSize] = useState('Large');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const sizes = ['Small', 'Medium', 'Large', 'X-Large'];
  const images = [imgImage1, imgImage5, imgImage6];

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="bg-white relative w-full min-h-screen overflow-x-hidden" data-name="Product Detail Page">
      {/* Top Banner */}
      {showBanner && (
        <div className="absolute bg-black h-[38px] left-0 overflow-clip top-0 w-full z-50">
          <p className="absolute font-['Satoshi',sans-serif] leading-[0] left-[calc(50%-176px)] not-italic text-[14px] text-white top-[calc(50%-10px)]">
            <span className="font-normal leading-[normal]">{`Đăng ký và nhận giảm giá 20% cho đơn hàng đầu tiên. `}</span>
            <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] underline cursor-pointer">Đăng Ký Ngay</span>
          </p>
          <div 
            className="-translate-y-1/2 absolute left-[1320px] size-[20px] top-1/2 cursor-pointer" 
            onClick={() => setShowBanner(false)}
            data-name="Frame"
          >
            <img alt="close" className="block max-w-none size-full" src={imgFrame} />
          </div>
        </div>
      )}
      
      {/* Header/Navigation */}
      <div className="absolute content-stretch flex gap-[40px] items-center justify-center left-[100px] top-[62px] w-[1240px]">
        <div 
          className="flex flex-col font-['Integral_CF',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[32px] text-black whitespace-nowrap cursor-pointer"
          onClick={() => navigate('/')}
        >
          <p className="leading-[normal]">Clothify</p>
        </div>
        <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0 cursor-pointer">
            <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-black">
              Cửa Hàng
            </p>
            <div className="relative shrink-0 size-[16px]" data-name="Frame">
              <img alt="" className="block max-w-none size-full" src={imgFrame1} />
            </div>
          </div>
          <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-black cursor-pointer">
            Khuyến Mãi
          </p>
          <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-black cursor-pointer">
            Hàng Mới Về
          </p>
          <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-black cursor-pointer">
            Thương Hiệu
          </p>
        </div>
        <div className="bg-[#f0f0f0] content-stretch flex flex-[1_0_0] gap-[12px] items-start min-h-px min-w-px overflow-clip px-[16px] py-[12px] relative rounded-[62px]">
          <div className="relative shrink-0 size-[24px]" data-name="Frame">
            <img alt="" className="block max-w-none size-full" src={imgFrame2} />
          </div>
          <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.4)]">
            Tìm kiếm sản phẩm...
          </p>
        </div>
        <div className="content-stretch flex gap-[14px] items-start relative shrink-0">
          <div className="relative shrink-0 size-[24px] cursor-pointer" data-name="Frame">
            <img alt="cart" className="block max-w-none size-full" src={imgFrame3} />
          </div>
          <div className="relative shrink-0 size-[24px] cursor-pointer" data-name="Frame">
            <img alt="user" className="block max-w-none size-full" src={imgFrame4} />
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="absolute h-0 left-[100px] top-[134px] w-[1240px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <img alt="" className="block max-w-none size-full" src={imgLine5} />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="absolute content-stretch flex gap-[12px] items-center left-[100px] top-[158px]">
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0 cursor-pointer" onClick={() => navigate('/')}>
          <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.6)]">
            Trang Chủ
          </p>
          <div className="flex items-center justify-center relative shrink-0 size-[16px]">
            <div className="-rotate-90 flex-none">
              <div className="relative size-[16px]" data-name="Frame">
                <img alt="" className="block max-w-none size-full" src={imgFrame8} />
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0 cursor-pointer">
          <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.6)]">
            Cửa Hàng
          </p>
          <div className="flex items-center justify-center relative shrink-0 size-[16px]">
            <div className="-rotate-90 flex-none">
              <div className="relative size-[16px]" data-name="Frame">
                <img alt="" className="block max-w-none size-full" src={imgFrame8} />
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0 cursor-pointer">
          <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.6)]">
            Nam
          </p>
          <div className="flex items-center justify-center relative shrink-0 size-[16px]">
            <div className="-rotate-90 flex-none">
              <div className="relative size-[16px]" data-name="Frame">
                <img alt="" className="block max-w-none size-full" src={imgFrame8} />
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-black">
          Áo Thun
        </p>
      </div>

      {/* Product Images - Left Side */}
      <div className="absolute left-[100px] top-[216px]">
        {/* Thumbnail Images */}
        <div className="flex flex-col gap-[14px]">
          {images.map((img, idx) => (
            <div 
              key={idx}
              className={`h-[167px] w-[152px] rounded-[20px] cursor-pointer ${selectedImage === idx ? 'border-2 border-black' : ''}`}
              onClick={() => setSelectedImage(idx)}
            >
              <img alt="" className="w-full h-full object-cover rounded-[20px]" src={img} />
            </div>
          ))}
        </div>
      </div>

      {/* Main Product Image */}
      <div className="absolute h-[530px] left-[270px] rounded-[20px] top-[216px] w-[444px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[20px]">
          <div className="absolute bg-[#f0eeed] inset-0 rounded-[20px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[20px]">
            <img alt="" className="absolute h-full w-full object-cover" src={images[selectedImage]} />
          </div>
        </div>
      </div>

      {/* Product Info - Right Side */}
      <div className="absolute left-[calc(50%+30px)] top-[216px] w-[590px]">
        {/* Product Title */}
        <h1 className="font-['Integral_CF',sans-serif] font-bold text-[40px] text-black leading-[48px] mb-[16px]">
          Áo Thun Họa Tiết One Life
        </h1>

        {/* Rating */}
        <div className="flex gap-[16px] items-center mb-[16px]">
          <div className="h-[24.712px] w-[139px]">
            <img alt="" className="block max-w-none size-full" src={imgFrame10} />
          </div>
          <p className="font-['Satoshi',sans-serif] text-[16px] text-black">
            <span>4.5/</span>
            <span className="text-[rgba(0,0,0,0.6)]">5</span>
          </p>
        </div>

        {/* Price */}
        <div className="flex gap-[12px] items-center mb-[20px]">
          <span className="font-['Satoshi',sans-serif] font-bold text-[32px] text-black">$260</span>
          <span className="font-['Satoshi',sans-serif] font-bold text-[32px] text-[rgba(0,0,0,0.3)] line-through">$300</span>
          <div className="bg-[rgba(255,51,51,0.1)] px-[14px] py-[6px] rounded-[62px]">
            <span className="font-['Satoshi',sans-serif] font-medium text-[16px] text-[#f33]">-40%</span>
          </div>
        </div>

        {/* Description */}
        <p className="font-['Satoshi',sans-serif] text-[16px] text-[rgba(0,0,0,0.6)] leading-[22px] mb-[20px]">
          Chiếc áo thun họa tiết này hoàn hảo cho mọi dịp. Được làm từ chất liệu mềm mại và thoáng khí, mang đến sự thoải mái và phong cách tuyệt vời.
        </p>

        {/* Separator */}
        <div className="w-full border-t border-[rgba(0,0,0,0.1)] mb-[20px]"></div>

        {/* Color Selection */}
        <p className="font-['Satoshi',sans-serif] text-[16px] text-[rgba(0,0,0,0.6)] mb-[16px]">
          Chọn Màu
        </p>
        <div className="h-[37px] mb-[20px]">
          <img alt="" style={{width : "140px"}} className="block h-full" src={imgFrame77} />
        </div>

        {/* Separator */}
        <div className="w-full border-t border-[rgba(0,0,0,0.1)] mb-[20px]"></div>

        {/* Size Selection */}
        <p className="font-['Satoshi',sans-serif] text-[16px] text-[rgba(0,0,0,0.6)] mb-[16px]">
          Chọn Size
        </p>
        <div className="flex gap-[12px] mb-[20px]">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-[24px] py-[12px] rounded-[62px] text-[16px] font-['Satoshi',sans-serif] transition-colors ${
                selectedSize === size
                  ? 'bg-black text-white font-medium'
                  : 'bg-[#f0f0f0] text-[rgba(0,0,0,0.6)]'
              }`}
            >
              {size === 'Small' ? 'Nhỏ' : size === 'Medium' ? 'Vừa' : size === 'Large' ? 'Lớn' : 'Rất Lớn'}
            </button>
          ))}
        </div>

        {/* Separator */}
        <div className="w-full border-t border-[rgba(0,0,0,0.1)] mb-[24px]"></div>

        {/* Quantity and Add to Cart */}
        <div className="flex gap-[20px]">
          {/* Quantity Selector */}
          <div className="bg-[#f0f0f0] flex h-[52px] items-center justify-between px-[20px] py-[16px] rounded-[62px] w-[170px]">
            <div className="relative shrink-0 size-[24px] cursor-pointer" onClick={() => handleQuantityChange(-1)}>
              <img alt="decrease" className="block max-w-none size-full" src={imgFrame5} />
            </div>
            <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-black">
              {quantity}
            </p>
            <div className="relative shrink-0 size-[24px] cursor-pointer" onClick={() => handleQuantityChange(1)}>
              <img alt="increase" className="block max-w-none size-full" src={imgFrame6} />
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="bg-black flex h-[52px] items-center justify-center px-[54px] py-[16px] rounded-[62px] flex-1 hover:bg-gray-800 transition-colors">
            <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-white">
              Thêm Vào Giỏ
            </p>
          </button>
        </div>
      </div>

      {/* Rating & Reviews Section */}
      <div className="absolute left-[100px] top-[826px] w-[1240px]">
        {/* Tabs */}
        <div className="relative flex justify-between mb-[14px]">
          <p className="font-['Satoshi',sans-serif] text-[20px] text-[rgba(0,0,0,0.6)] cursor-pointer">
            Chi Tiết Sản Phẩm
          </p>
          <p className="font-['Satoshi',sans-serif] font-medium text-[20px] text-black text-center cursor-pointer">
            Đánh Giá & Nhận Xét
          </p>
          <p className="font-['Satoshi',sans-serif] text-[20px] text-[rgba(0,0,0,0.6)] text-right cursor-pointer">
            Câu Hỏi Thường Gặp
          </p>
        </div>

        {/* Separator */}
        <div className="relative h-0 w-full mb-[32px]">
          
          {/* Active tab indicator */}
          <div className="absolute h-0 left-[calc(50%-207px)] top-0 w-[414px]">
            <img alt="" className=" h-px block w-full" src={imgLine7} />
          </div>
        </div>

        {/* Reviews Header */}
        <div className="flex items-center justify-between mb-[32px]">
          <div className="flex items-center gap-[8px]">
            <h2 className="font-['Satoshi',sans-serif] font-bold text-[24px] text-black">
              Tất Cả Đánh Giá
            </h2>
            <p className="font-['Satoshi',sans-serif] text-[16px] text-[rgba(0,0,0,0.6)]">
              (451)
            </p>
          </div>
          <div className="flex gap-[10px]">
            <div className="bg-[#f0f0f0] flex h-[48px] items-center justify-between px-[20px] py-[16px] rounded-[62px] size-[48px] cursor-pointer">
              <img alt="" className="w-[16px] h-[24px]" src={imgFrame7} />
            </div>
            <div className="bg-[#f0f0f0] flex h-[48px] items-center gap-[8px] px-[20px] py-[16px] rounded-[62px] w-[120px] cursor-pointer">
              <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-black">
                Mới Nhất
              </p>
              <img alt="" className="size-[16px]" src={imgFrame1} />
            </div>
            <button className="bg-black flex h-[48px] items-center px-[20px] py-[16px] rounded-[62px] w-[166px] hover:bg-gray-800 transition-colors">
              <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-white">
                Viết Đánh Giá
              </p>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-2 gap-[20px] mb-[36px]">
          {/* Review 1 */}
          <div className="border border-[rgba(0,0,0,0.1)] rounded-[20px] p-[32px]">
            <div className="h-[22.579px] w-[127px] mb-[15px]">
              <img alt="" className="block size-full" src={imgFrame15} />
            </div>
            <div className="flex items-center gap-[4px] mb-[12px]">
              <p className="font-['Satoshi',sans-serif] font-bold text-[20px] text-black">
                Samantha D.
              </p>
              <img alt="" className="size-[24px]" src={imgFrame9} />
            </div>
            <p className="font-['Satoshi',sans-serif] text-[16px] text-[rgba(0,0,0,0.6)] leading-[22px] mb-[24px]">
              "Tôi thực sự yêu thích chiếc áo này! Thiết kế độc đáo và chất liệu cực kỳ thoải mái. Là một nhà thiết kế, tôi đánh giá cao sự chú ý đến từng chi tiết. Đây đã trở thành chiếc áo yêu thích của tôi."
            </p>
            <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-[rgba(0,0,0,0.6)]">
              Đăng vào 14 tháng 8, 2023
            </p>
          </div>

          {/* Review 2 */}
          <div className="border border-[rgba(0,0,0,0.1)] rounded-[20px] p-[32px]">
            <div className="h-[22.579px] w-[109.776px] mb-[15px]">
              <img alt="" className="block size-full" src={imgFrame18} />
            </div>
            <div className="flex items-center gap-[4px] mb-[12px]">
              <p className="font-['Satoshi',sans-serif] font-bold text-[20px] text-black">
                Alex M.
              </p>
              <img alt="" className="size-[24px]" src={imgFrame9} />
            </div>
            <p className="font-['Satoshi',sans-serif] text-[16px] text-[rgba(0,0,0,0.6)] leading-[22px] mb-[24px]">
              "Chiếc áo vượt quá mong đợi của tôi! Màu sắc rực rỡ và chất lượng in ấn hàng đầu. Là một nhà thiết kế UI/UX, tôi khá kỹ tính về tính thẩm mỹ, và chiếc áo này chắc chắn được tôi đánh giá cao."
            </p>
            <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-[rgba(0,0,0,0.6)]">
              Đăng vào 15 tháng 8, 2023
            </p>
          </div>

          {/* Review 3 */}
          <div className="border border-[rgba(0,0,0,0.1)] rounded-[20px] p-[32px]">
            <div className="h-[22.579px] w-[97.934px] mb-[15px]">
              <img alt="" className="block size-full" src={imgFrame17} />
            </div>
            <div className="flex items-center gap-[4px] mb-[12px]">
              <p className="font-['Satoshi',sans-serif] font-bold text-[20px] text-black">
                Ethan R.
              </p>
              <img alt="" className="size-[24px]" src={imgFrame9} />
            </div>
            <p className="font-['Satoshi',sans-serif] text-[16px] text-[rgba(0,0,0,0.6)] leading-[22px] mb-[24px]">
              "Chiếc áo này là món đồ không thể thiếu cho những ai yêu thích thiết kế đẹp. Họa tiết tối giản nhưng phong cách đã thu hút ánh nhìn của tôi, và form dáng hoàn hảo."
            </p>
            <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-[rgba(0,0,0,0.6)]">
              Đăng vào 16 tháng 8, 2023
            </p>
          </div>

          {/* Review 4 */}
          <div className="border border-[rgba(0,0,0,0.1)] rounded-[20px] p-[32px]">
            <div className="h-[22.579px] w-[109.776px] mb-[15px]">
              <img alt="" className="block size-full" src={imgFrame19} />
            </div>
            <div className="flex items-center gap-[4px] mb-[12px]">
              <p className="font-['Satoshi',sans-serif] font-bold text-[20px] text-black">
                Olivia P.
              </p>
              <img alt="" className="size-[24px]" src={imgFrame9} />
            </div>
            <p className="font-['Satoshi',sans-serif] text-[16px] text-[rgba(0,0,0,0.6)] leading-[22px] mb-[24px]">
              "Là một người đam mê UI/UX, tôi đánh giá cao sự đơn giản và chức năng. Chiếc áo này không chỉ thể hiện những nguyên tắc đó mà còn rất thoải mái khi mặc."
            </p>
            <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-[rgba(0,0,0,0.6)]">
              Đăng vào 17 tháng 8, 2023
            </p>
          </div>

          {/* Review 5 */}
          <div className="border border-[rgba(0,0,0,0.1)] rounded-[20px] p-[32px]">
            <div className="h-[22.579px] w-[109.776px] mb-[15px]">
              <img alt="" className="block size-full" src={imgFrame18} />
            </div>
            <div className="flex items-center gap-[4px] mb-[12px]">
              <p className="font-['Satoshi',sans-serif] font-bold text-[20px] text-black">
                Liam K.
              </p>
              <img alt="" className="size-[24px]" src={imgFrame9} />
            </div>
            <p className="font-['Satoshi',sans-serif] text-[16px] text-[rgba(0,0,0,0.6)] leading-[22px] mb-[24px]">
              "Chiếc áo này là sự kết hợp giữa sự thoải mái và sáng tạo. Chất liệu mềm mại, và thiết kế nói lên kỹ năng của nhà thiết kế. Giống như mặc một tác phẩm nghệ thuật."
            </p>
            <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-[rgba(0,0,0,0.6)]">
              Đăng vào 18 tháng 8, 2023
            </p>
          </div>

          {/* Review 6 */}
          <div className="border border-[rgba(0,0,0,0.1)] rounded-[20px] p-[32px]">
            <div className="h-[22.579px] w-[127px] mb-[15px]">
              <img alt="" className="block size-full" src={imgFrame15} />
            </div>
            <div className="flex items-center gap-[4px] mb-[12px]">
              <p className="font-['Satoshi',sans-serif] font-bold text-[20px] text-black">
                Ava H.
              </p>
              <img alt="" className="size-[24px]" src={imgFrame9} />
            </div>
            <p className="font-['Satoshi',sans-serif] text-[16px] text-[rgba(0,0,0,0.6)] leading-[22px] mb-[24px]">
              "Tôi không chỉ mặc một chiếc áo; tôi đang mặc một triết lý thiết kế. Các chi tiết tinh tế và cách bố trí suy nghĩ khiến chiếc áo này trở thành điểm khởi đầu cuộc trò chuyện."
            </p>
            <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-[rgba(0,0,0,0.6)]">
              Đăng vào 19 tháng 8, 2023
            </p>
          </div>
        </div>

        {/* Load More Button */}
        <div className="flex justify-center">
          <button className="border border-[rgba(0,0,0,0.1)] flex h-[52px] items-center justify-center px-[54px] py-[16px] rounded-[62px] w-[330px] hover:bg-gray-50 transition-colors">
            <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-black">
              Xem Thêm Đánh Giá
            </p>
          </button>
        </div>
      </div>

      {/* You Might Also Like Section */}
      <div className="absolute left-[100px] top-[1907px] w-[1240px]">
        <h2 className="font-['Integral_CF',sans-serif] font-bold text-[48px] text-black text-center mb-[55px]">
          Bạn Có Thể Thích
        </h2>

        <div className="grid grid-cols-4 gap-[20px]">
          {/* Product 1 */}
          <div className="cursor-pointer">
            <div className="bg-[#f0eeed] h-[298px] rounded-[20px] overflow-hidden mb-[16px]">
              <img alt="" className="w-full h-full object-cover" src={imgImage7} />
            </div>
            <h3 className="font-['Satoshi',sans-serif] font-bold text-[20px] text-black mb-[8px]">
              Áo Polo Viền Tương Phản
            </h3>
            <div className="flex items-center gap-[13px] mb-[8px]">
              <div className="h-[18.49px] w-[89.896px]">
                <img alt="" className="block size-full" src={imgFrame11} />
              </div>
              <p className="font-['Satoshi',sans-serif] text-[14px] text-black">
                <span>4.0/</span>
                <span className="text-[rgba(0,0,0,0.6)]">5</span>
              </p>
            </div>
            <div className="flex items-center gap-[10px]">
              <span className="font-['Satoshi',sans-serif] font-bold text-[24px] text-black">$212</span>
              <span className="font-['Satoshi',sans-serif] font-bold text-[24px] text-[rgba(0,0,0,0.4)] line-through">$242</span>
              <div className="bg-[rgba(255,51,51,0.1)] px-[14px] py-[6px] rounded-[62px]">
                <span className="font-['Satoshi',sans-serif] font-medium text-[12px] text-[#f33]">-20%</span>
              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div className="cursor-pointer">
            <div className="bg-[#f0eeed] h-[298px] rounded-[20px] overflow-hidden mb-[16px]">
              <img alt="" className="w-full h-full object-cover" src={imgImage8} />
            </div>
            <h3 className="font-['Satoshi',sans-serif] font-bold text-[20px] text-black mb-[8px]">
              Áo Thun Họa Tiết Chuyển Màu
            </h3>
            <div className="flex items-center gap-[13px] mb-[8px]">
              <div className="h-[18.49px] w-[80.198px]">
                <img alt="" className="block size-full" src={imgFrame12} />
              </div>
              <p className="font-['Satoshi',sans-serif] text-[14px] text-black">
                <span>3.5/</span>
                <span className="text-[rgba(0,0,0,0.6)]">5</span>
              </p>
            </div>
            <span className="font-['Satoshi',sans-serif] font-bold text-[24px] text-black">$145</span>
          </div>

          {/* Product 3 */}
          <div className="cursor-pointer">
            <div className="bg-[#f0eeed] h-[298px] rounded-[20px] overflow-hidden mb-[16px]">
              <img alt="" className="w-full h-full object-cover" src={imgImage9} />
            </div>
            <h3 className="font-['Satoshi',sans-serif] font-bold text-[20px] text-black mb-[8px]">
              Áo Polo Chi Tiết Tipping
            </h3>
            <div className="flex items-center gap-[13px] mb-[8px]">
              <div className="h-[18.49px] w-[104px]">
                <img alt="" className="block size-full" src={imgFrame13} />
              </div>
              <p className="font-['Satoshi',sans-serif] text-[14px] text-black">
                <span>4.5/</span>
                <span className="text-[rgba(0,0,0,0.6)]">5</span>
              </p>
            </div>
            <span className="font-['Satoshi',sans-serif] font-bold text-[24px] text-black">$180</span>
          </div>

          {/* Product 4 */}
          <div className="cursor-pointer">
            <div className="bg-[#f0eeed] h-[298px] rounded-[20px] overflow-hidden mb-[16px]">
              <img alt="" className="w-full h-full object-cover" src={imgImage10} />
            </div>
            <h3 className="font-['Satoshi',sans-serif] font-bold text-[20px] text-black mb-[8px]">
              Áo Thun Sọc Đen
            </h3>
            <div className="flex items-center gap-[13px] mb-[8px]">
              <div className="h-[18.49px] w-[113.697px]">
                <img alt="" className="block size-full" src={imgFrame14} />
              </div>
              <p className="font-['Satoshi',sans-serif] text-[14px] text-black">
                <span>5.0/</span>
                <span className="text-[rgba(0,0,0,0.6)]">5</span>
              </p>
            </div>
            <div className="flex items-center gap-[10px]">
              <span className="font-['Satoshi',sans-serif] font-bold text-[24px] text-black">$120</span>
              <span className="font-['Satoshi',sans-serif] font-bold text-[24px] text-[rgba(0,0,0,0.4)] line-through">$150</span>
              <div className="bg-[rgba(255,51,51,0.1)] px-[14px] py-[6px] rounded-[62px]">
                <span className="font-['Satoshi',sans-serif] font-medium text-[12px] text-[#f33]">-30%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="absolute bg-black left-[100px] top-[2477px] w-[1240px] rounded-[20px] px-[64px] py-[36px] flex items-center justify-between">
        <p className="font-['Integral_CF',sans-serif] font-bold text-[40px] text-white leading-[45px] w-[551px]">
          CẬP NHẬT THÔNG TIN VỀ CÁC ƯU ĐÃI MỚI NHẤT
        </p>
        <div className="flex flex-col gap-[14px]">
          <div className="bg-white flex gap-[12px] items-center px-[16px] py-[12px] rounded-[62px] w-[349px]">
            <img alt="" className="size-[24px]" src={imgFrame20} />
            <input 
              type="email"
              placeholder="Nhập địa chỉ email của bạn"
              className="font-['Satoshi',sans-serif] text-[16px] text-[rgba(0,0,0,0.4)] border-none outline-none flex-1 bg-transparent"
            />
          </div>
          <button className="bg-white flex items-center justify-center px-[16px] py-[12px] rounded-[62px] w-[349px] hover:bg-gray-100 transition-colors">
            <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-black">
              Đăng Ký Nhận Tin
            </p>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute left-[100px] top-[2707px] w-[1240px] flex justify-between pb-[88px]">
        {/* Company Info */}
        <div className="flex flex-col gap-[35px]">
          <div className="flex flex-col gap-[25px]">
            <h3 className="font-['Integral_CF',sans-serif] font-bold text-[33.455px] text-black">
              Clothify
            </h3>
            <p className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)] leading-[22px] w-[248px]">
              Chúng tôi có quần áo phù hợp với phong cách của bạn và bạn tự hào khi mặc. Từ phụ nữ đến nam giới.
            </p>
          </div>
          <div className="flex gap-[12px]">
            <div className="size-[28px] cursor-pointer">
              <div className="relative size-full">
                <img alt="" className="block size-full" src={imgBg} />
                <div className="absolute left-[9.03px] top-[9.94px]">
                  <img alt="" className="block w-[11.174px] h-[9.032px]" src={imgGroup} />
                </div>
              </div>
            </div>
            <div className="size-[28px] cursor-pointer">
              <div className="relative size-full">
                <img alt="" className="block size-full" src={imgBg1} />
                <div className="absolute left-[10.84px] top-[8.13px]">
                  <img alt="" className="block w-[6.323px] h-[12.175px]" src={imgGroup1} />
                </div>
              </div>
            </div>
            <div className="size-[28px] cursor-pointer">
              <div className="relative size-full">
                <img alt="" className="block size-full" src={imgBg} />
                <div className="absolute left-[7.23px] top-[7.23px]">
                  <img alt="" className="block w-[13.548px] h-[13.549px]" src={imgGroup2} />
                </div>
              </div>
            </div>
            <div className="size-[28px] cursor-pointer">
              <div className="relative size-full">
                <img alt="" className="block size-full" src={imgBg} />
                <div className="absolute left-[8.13px] top-[7.23px]">
                  <img alt="" className="block w-[12.96px] h-[12.645px]" src={imgGroup3} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Links */}
        <div className="flex flex-col gap-[26px]">
          <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-black tracking-[3px] uppercase">
            Công Ty
          </p>
          <div className="font-['Satoshi',sans-serif] text-[16px] text-[rgba(0,0,0,0.6)] flex flex-col gap-[16px]">
            <p className="cursor-pointer hover:text-black">Về Chúng Tôi</p>
            <p className="cursor-pointer hover:text-black">Tính Năng</p>
            <p className="cursor-pointer hover:text-black">Dự Án</p>
            <p className="cursor-pointer hover:text-black">Tuyển Dụng</p>
          </div>
        </div>

        {/* Help Links */}
        <div className="flex flex-col gap-[26px]">
          <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-black tracking-[3px] uppercase">
            Trợ Giúp
          </p>
          <div className="font-['Satoshi',sans-serif] text-[16px] text-[rgba(0,0,0,0.6)] flex flex-col gap-[16px]">
            <p className="cursor-pointer hover:text-black">Hỗ Trợ Khách Hàng</p>
            <p className="cursor-pointer hover:text-black">Chi Tiết Giao Hàng</p>
            <p className="cursor-pointer hover:text-black">Điều Khoản & Điều Kiện</p>
            <p className="cursor-pointer hover:text-black">Chính Sách Bảo Mật</p>
          </div>
        </div>

        {/* FAQ Links */}
        <div className="flex flex-col gap-[26px]">
          <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-black tracking-[3px] uppercase">
            FAQ
          </p>
          <div className="font-['Satoshi',sans-serif] text-[16px] text-[rgba(0,0,0,0.6)] flex flex-col gap-[16px]">
            <p className="cursor-pointer hover:text-black">Tài Khoản</p>
            <p className="cursor-pointer hover:text-black">Quản Lý Giao Hàng</p>
            <p className="cursor-pointer hover:text-black">Đơn Hàng</p>
            <p className="cursor-pointer hover:text-black">Thanh Toán</p>
          </div>
        </div>

        {/* Resources Links */}
        <div className="flex flex-col gap-[26px]">
          <p className="font-['Satoshi',sans-serif] font-medium text-[16px] text-black tracking-[3px] uppercase">
            Tài Nguyên
          </p>
          <div className="font-['Satoshi',sans-serif] text-[16px] text-[rgba(0,0,0,0.6)] flex flex-col gap-[16px]">
            <p className="cursor-pointer hover:text-black">Sách Điện Tử Miễn Phí</p>
            <p className="cursor-pointer hover:text-black">Hướng Dẫn Phát Triển</p>
            <p className="cursor-pointer hover:text-black">Blog Hướng Dẫn</p>
            <p className="cursor-pointer hover:text-black">Danh Sách Youtube</p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="absolute left-0 top-[2934px] w-full h-0">
        <img alt="" className="block w-[1240px] mx-auto" src={imgLine5} />
      </div>

      <div className="absolute left-[100px] top-[2954px] w-[1240px] flex items-end justify-between">
        <p className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)]">
          Clothify © 2000-2023, Đã Đăng Ký Bản Quyền
        </p>
        <div className="flex gap-[12px]">
          <div className="h-[30.03px] w-[46.614px]">
            <img alt="" className="block size-full" src={imgBadge} />
          </div>
          <div className="h-[30.03px] w-[46.614px]">
            <img alt="" className="block size-full" src={imgBadge1} />
          </div>
          <div className="h-[30.03px] w-[46.614px]">
            <img alt="" className="block size-full" src={imgBadge2} />
          </div>
          <div className="h-[30.03px] w-[46.614px]">
            <img alt="" className="block size-full" src={imgBadge3} />
          </div>
          <div className="h-[30.03px] w-[46.614px]">
            <img alt="" className="block size-full" src={imgBadge4} />
          </div>
        </div>
      </div>
    </div>
  );
}
