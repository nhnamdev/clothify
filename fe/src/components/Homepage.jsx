import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const imgRectangle2 = "https://www.figma.com/api/mcp/asset/3684a1b3-dd09-426f-bb37-5b246b37374b";
const imgImage7 = "https://www.figma.com/api/mcp/asset/8a58f8e2-6c87-4daf-9f83-d1fab4392b3d";
const imgImage8 = "https://www.figma.com/api/mcp/asset/0ca290f4-497b-4ed1-979c-682840d4147d";
const imgImage9 = "https://www.figma.com/api/mcp/asset/55a74b2e-1053-438d-b877-00734e5c9ff2";
const imgImage10 = "https://www.figma.com/api/mcp/asset/588fd9a8-2a43-4b1b-b613-ef8d563fe886";
const imgImage11 = "https://www.figma.com/api/mcp/asset/587ef398-2634-4314-b1b8-6e994b90e57e";
const imgImage12 = "https://www.figma.com/api/mcp/asset/ac6ed922-5720-474e-b672-3b747b9794a2";
const imgImage13 = "https://www.figma.com/api/mcp/asset/07ad1466-cbbb-4b03-8dc8-bbec9ec26243";
const imgImage14 = "https://www.figma.com/api/mcp/asset/04ec8d17-a8ff-4b02-bf45-7941201cb1d2";
const imgImage15 = "https://www.figma.com/api/mcp/asset/4289293e-1d02-4875-8276-3d396424857e";
const imgImage16 = "https://www.figma.com/api/mcp/asset/c60d589c-5ea7-4a49-b64b-6594f4d7f372";
const imgImage17 = "https://www.figma.com/api/mcp/asset/4b567054-1788-487c-9a25-c1fb1576cd74";
const imgImage18 = "https://www.figma.com/api/mcp/asset/5b7a32c2-bcba-4ee9-964a-59a99cb42dee";
const imgVector = "https://www.figma.com/api/mcp/asset/1caeb131-7ebe-4305-9ee8-5a0b19e2e5f0";
const imgVector1 = "https://www.figma.com/api/mcp/asset/4f24d023-c969-4828-b786-e88f99c46d48";
const imgFrame = "https://www.figma.com/api/mcp/asset/4ab7a5fa-2d39-4da7-b499-d425fe5213ec";
const imgFrame1 = "https://www.figma.com/api/mcp/asset/7701ec5a-4892-4d57-82b9-f0bc3260ee70";
const imgFrame2 = "https://www.figma.com/api/mcp/asset/2782c078-7936-4809-936a-66d3876b366c";
const imgFrame3 = "https://www.figma.com/api/mcp/asset/a3818d6e-03f9-4a23-9837-06790e2ea1b9";
const imgFrame4 = "https://www.figma.com/api/mcp/asset/5004aff2-a100-41ad-91a7-7902dc7ff937";
const imgLine9 = "https://www.figma.com/api/mcp/asset/85caa726-839a-4e01-a74f-1edc9c93e959";
const imgGroup = "https://www.figma.com/api/mcp/asset/cfd990bd-1038-411d-a147-15970e7d3caa";
const imgZaraLogo11 = "https://www.figma.com/api/mcp/asset/dd7018be-7952-4861-8c7e-d31dadb3e9c8";
const imgGucciLogo11 = "https://www.figma.com/api/mcp/asset/592aed2c-c200-4f49-9d59-8152f22abe0b";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/6ee6adeb-9fdc-4541-be66-c234c9bc641d";
const imgGroup2 = "https://www.figma.com/api/mcp/asset/5fcedcdd-b691-45ac-b66a-bd7c108253bd";
const imgFrame10 = "https://www.figma.com/api/mcp/asset/ef0a6cac-a37c-4702-bc3d-78123fa4fdbe";
const imgFrame11 = "https://www.figma.com/api/mcp/asset/a0054677-315f-4117-ade6-526441f63c69";
const imgFrame12 = "https://www.figma.com/api/mcp/asset/89a213e4-a5f5-4bfd-ab61-d2410d7ecb10";
const imgFrame13 = "https://www.figma.com/api/mcp/asset/39add8f9-f4a5-4b40-a530-341f30bdb2f6";
const imgFrame14 = "https://www.figma.com/api/mcp/asset/0de3459e-c5d6-42a0-a660-98c0c1d5b0a5";
const imgLine4 = "https://www.figma.com/api/mcp/asset/1aa49331-a825-49b2-9635-cb4c3d7ee25f";
const imgFrame15 = "https://www.figma.com/api/mcp/asset/df1bf555-6686-44fe-9364-56b053553df6";
const imgFrame5 = "https://www.figma.com/api/mcp/asset/cabe6f10-03e9-4381-b94d-5275d79e39bd";
const imgArrowDownBold1 = "https://www.figma.com/api/mcp/asset/7bfe9de1-1342-46fe-b481-37f0c99253c1";
const imgArrowDownBold2 = "https://www.figma.com/api/mcp/asset/cb5ba67d-d299-438f-948f-f9cc83797647";
const imgFrame6 = "https://www.figma.com/api/mcp/asset/7df3b810-2fe7-4bf8-a7de-19c071002256";
const imgBg = "https://www.figma.com/api/mcp/asset/0c236f1b-cd57-4bac-906f-7174f42b93dc";
const imgGroup3 = "https://www.figma.com/api/mcp/asset/c8c153f1-b1ad-4488-bdbb-6a64933ff06c";
const imgBg1 = "https://www.figma.com/api/mcp/asset/b0c8d62d-ef22-4d11-a298-c211e9ea0de8";
const imgGroup4 = "https://www.figma.com/api/mcp/asset/0c5c8620-0f1c-4321-80aa-db26cf41f8aa";
const imgGroup5 = "https://www.figma.com/api/mcp/asset/fc850691-5968-4204-bc56-0a11d76046fd";
const imgGroup6 = "https://www.figma.com/api/mcp/asset/28ac79fb-a80b-475e-966e-95e4308808e7";
const imgBadge = "https://www.figma.com/api/mcp/asset/6b097fdd-211f-42a6-a9e5-eee75a7e7478";
const imgBadge1 = "https://www.figma.com/api/mcp/asset/8140aa0b-7ae9-4b22-9c64-f4aa7531fac2";
const imgBadge2 = "https://www.figma.com/api/mcp/asset/7d8e499b-f089-4178-ad5f-10d5dcadde83";
const imgBadge3 = "https://www.figma.com/api/mcp/asset/6c69de0e-30c4-4023-a9d3-7be6cc102fc1";
const imgBadge4 = "https://www.figma.com/api/mcp/asset/afe577dd-b46f-411e-87ec-3176031932c6";

export default function Homepage() {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="bg-white relative w-full min-h-screen overflow-x-hidden" data-name="Homepage">
      {/* Top Banner */}
      {showBanner && (
        <div className="absolute bg-black h-[38px] left-0 overflow-clip top-0 w-full z-50">
          <p className="absolute font-['Satoshi',sans-serif] font-normal leading-[0] left-[calc(50%-200px)] text-[14px] text-white top-[calc(50%-10px)]">
            <span className="leading-[normal]">{`Đăng ký và nhận giảm giá 20% cho đơn hàng đầu tiên. `}</span>
            <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] underline cursor-pointer">Đăng Ký Ngay</span>
          </p>
          <div 
            className="-translate-y-1/2 absolute right-[100px] size-[20px] top-1/2 cursor-pointer" 
            onClick={() => setShowBanner(false)}
            data-name="Frame"
          >
            <img alt="close" className="block max-w-none size-full" src={imgFrame} />
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className={`w-full transition-transform duration-300 ${showBanner ? '' : '-translate-y-[38px]'}`}>
        {/* Hero Background */}
        <div className="absolute h-[663px] left-0 top-[134px] w-full">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[#f2f0f1] inset-0" />
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute h-[152.05%] left-[49.58%] max-w-none top-[-6.95%] w-[46.66%]" src={imgRectangle2} />
          </div>
        </div>
      </div>
      
      {/* Header/Navigation */}
      <div className="absolute content-stretch flex gap-[40px] items-center justify-center left-0 right-0 mx-[100px] top-[62px]">
        <div className="flex flex-col font-['Integral_CF',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[32px] text-black whitespace-nowrap">
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
      
      {/* Hero Title */}
      <div className="-translate-y-1/2 absolute flex flex-col font-['Integral_CF',sans-serif] font-bold justify-center leading-[0] left-[100px] not-italic text-[64px] text-black top-[323.5px] max-w-[577px]">
        <p className="leading-[64px] whitespace-pre-wrap">TÌM QUẦN ÁO THEO PHONG CÁCH CỦA BẠN</p>
      </div>
      
      {/* Hero Description */}
      <p className="absolute font-['Satoshi',sans-serif] leading-[22px] left-[100px] not-italic text-[16px] text-[rgba(0,0,0,0.6)] top-[442px] max-w-[545px] whitespace-pre-wrap">
        Khám phá bộ sưu tập đa dạng của chúng tôi với những sản phẩm được chế tác tỉ mỉ, được thiết kế để tôn lên cá tính và phù hợp với phong cách riêng của bạn.
      </p>
      
      {/* Shop Now Button */}
      <button className="absolute bg-black content-stretch flex h-[52px] items-center justify-center left-[100px] overflow-clip px-[54px] py-[16px] rounded-[62px] top-[507px] w-[210px] cursor-pointer hover:bg-gray-800 transition-colors">
        <p className="font-['Satoshi',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-white">
          Mua Ngay
        </p>
      </button>
      
      {/* Stats */}
      <div className="absolute content-stretch flex gap-[32px] items-center left-[100px] top-[607px]">
        <div className="content-stretch flex flex-col items-start not-italic pb-[2px] relative shrink-0">
          <div className="flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] mb-[-2px] relative shrink-0 text-[40px] text-black whitespace-nowrap">
            <p className="leading-[normal]">200+</p>
          </div>
          <p className="font-['Satoshi',sans-serif] leading-[22px] relative shrink-0 text-[16px] text-[rgba(0,0,0,0.6)]">
            Thương Hiệu Quốc Tế
          </p>
        </div>
        <div className="flex flex-row items-center self-stretch">
          <div className="flex h-0 items-center justify-center relative self-center shrink-0 w-0">
            <div className="flex-none h-full rotate-90">
              <div className="h-full relative w-[74px]">
                <div className="absolute inset-[-1px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine9} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start not-italic pb-[2px] relative shrink-0">
          <div className="flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] mb-[-2px] relative shrink-0 text-[40px] text-black whitespace-nowrap">
            <p className="leading-[normal]">2,000+</p>
          </div>
          <p className="font-['Satoshi',sans-serif] leading-[22px] relative shrink-0 text-[16px] text-[rgba(0,0,0,0.6)]">
            Sản Phẩm Chất Lượng Cao
          </p>
        </div>
        <div className="flex flex-row items-center self-stretch">
          <div className="flex h-0 items-center justify-center relative self-center shrink-0 w-0">
            <div className="flex-none h-full rotate-90">
              <div className="h-full relative w-[74px]">
                <div className="absolute inset-[-1px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine9} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start not-italic pb-[2px] relative shrink-0">
          <div className="flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] mb-[-2px] relative shrink-0 text-[40px] text-black whitespace-nowrap">
            <p className="leading-[normal]">30,000+</p>
          </div>
          <p className="font-['Satoshi',sans-serif] leading-[22px] relative shrink-0 text-[16px] text-[rgba(0,0,0,0.6)]">
            Khách Hàng Hài Lòng
          </p>
        </div>
      </div>
      
      {/* Brand Bar */}
      <div className="absolute bg-black h-[122px] left-0 top-[797px] w-full" />
      
      <div className="absolute h-[38px] left-[calc(16.67%+132.48px)] top-[839px] w-[91px]" data-name="zara-logo-1 1">
        <img alt="Zara" className="block max-w-none size-full" src={imgZaraLogo11} />
      </div>
      <div className="absolute h-[36px] left-[calc(33.33%+89.48px)] top-[840px] w-[156px]" data-name="gucci-logo-1 1">
        <img alt="Gucci" className="block max-w-none size-full" src={imgGucciLogo11} />
      </div>
      <div className="absolute h-[32px] left-[calc(58.33%-8.52px)] overflow-clip top-[842px] w-[194px]" data-name="prada-logo-1 1">
        <div className="absolute inset-[1.26%_0]" data-name="Group">
          <div className="absolute inset-[-1.65%_-0.16%_-1.65%_-0.59%]">
            <img alt="Prada" className="block max-w-none size-full" src={imgGroup1} />
          </div>
        </div>
      </div>
      <div className="absolute inset-[19.24%_7.06%_79.99%_78.58%]" data-name="Group">
        <img alt="Calvin Klein" className="block max-w-none size-full" src={imgGroup2} />
      </div>
      
      {/* NEW ARRIVALS Section */}
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Integral_CF',sans-serif] font-bold justify-center leading-[0] left-[calc(50%-0.5px)] not-italic text-[48px] text-black text-center top-[1020px] whitespace-nowrap">
        <p className="leading-[normal]">HÀNG MỚI VỀ</p>
      </div>
      
      {/* New Arrivals Products */}
      <div className="absolute bg-[#f0eeed] h-[298px] left-[100px] overflow-clip rounded-[20px] top-[1104px] w-[295px] cursor-pointer" onClick={() => navigate('/product/1')}>
        <div className="absolute h-[444px] left-[-1px] top-[-73px] w-[296px]" data-name="image 7">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage7} />
        </div>
      </div>
      <div className="absolute bg-[#f0eeed] h-[298px] left-[calc(25%+55px)] overflow-clip rounded-[20px] top-[1104px] w-[295px] cursor-pointer" onClick={() => navigate('/product/2')}>
        <div className="absolute h-[402px] left-[14px] top-[-51px] w-[268px]" data-name="image 8">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage8} />
        </div>
      </div>
      <div className="absolute bg-[#f0eeed] h-[298px] left-[calc(50%+10px)] overflow-clip rounded-[20px] top-[1104px] w-[295px] cursor-pointer" onClick={() => navigate('/product/3')}>
        <div className="absolute h-[444px] left-0 top-[-73px] w-[296px]" data-name="image 9">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage9} />
        </div>
      </div>
      <div className="absolute bg-[#f0eeed] h-[298px] left-[calc(75%-35px)] overflow-clip rounded-[20px] top-[1104px] w-[295px] cursor-pointer" onClick={() => navigate('/product/4')}>
        <div className="absolute h-[444px] left-0 top-[-73px] w-[296px]" data-name="image 10">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage10} />
        </div>
      </div>
      
      {/* Product Names & Ratings */}
      <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] left-[100px] not-italic text-[20px] text-black top-[1431.5px] whitespace-nowrap">
        <p className="leading-[normal]">ÁO THUN CHI TIẾT BĂNG KEO</p>
      </div>
      <div className="absolute content-stretch flex gap-[13px] items-center left-[100px] top-[1453px]">
        <div className="h-[18.49px] relative shrink-0 w-[104px]">
          <img alt="" className="block max-w-none size-full" src={imgFrame10} />
        </div>
        <p className="font-['Satoshi',sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-black">
          <span className="leading-[normal]">4.5/</span>
          <span className="leading-[normal] text-[rgba(0,0,0,0.6)]">5</span>
        </p>
      </div>
      <div className="absolute content-stretch flex items-center left-[100px] top-[1480px]">
        <div className="flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black whitespace-nowrap">
          <p className="leading-[normal]">3.000.000₫</p>
        </div>
      </div>
      
      <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] left-[calc(25%+55px)] not-italic text-[20px] text-black top-[1431.5px] whitespace-nowrap">
        <p className="leading-[normal]">QUẦN JEANS ÔM</p>
      </div>
      <div className="absolute content-stretch flex gap-[13px] items-center left-[calc(25%+55px)] top-[1453px]">
        <div className="h-[18.49px] relative shrink-0 w-[80.198px]">
          <img alt="" className="block max-w-none size-full" src={imgFrame11} />
        </div>
        <p className="font-['Satoshi',sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-black">
          <span className="leading-[normal]">3.5/</span>
          <span className="leading-[normal] text-[rgba(0,0,0,0.6)]">5</span>
        </p>
      </div>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[calc(25%+55px)] top-[1480px]">
        <div className="flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black whitespace-nowrap">
          <p className="leading-[normal]">6.000.000₫</p>
        </div>
        <div className="flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-[rgba(0,0,0,0.4)] whitespace-nowrap">
          <p className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] line-through">6.500.000₫</p>
        </div>
        <div className="bg-[rgba(255,51,51,0.1)] content-stretch flex items-center justify-center overflow-clip px-[14px] py-[6px] relative rounded-[62px] shrink-0 w-[58px]">
          <p className="font-['Satoshi',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#f33] text-[12px]">
            -20%
          </p>
        </div>
      </div>
      
      <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] left-[calc(50%+10px)] not-italic text-[20px] text-black top-[1431.5px] whitespace-nowrap">
        <p className="leading-[normal]">SƠ MI KẾ Ô</p>
      </div>
      <div className="absolute content-stretch flex gap-[13px] items-center left-[calc(50%+10px)] top-[1453px]">
        <div className="h-[18.49px] relative shrink-0 w-[104px]">
          <img alt="" className="block max-w-none size-full" src={imgFrame10} />
        </div>
        <p className="font-['Satoshi',sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-black">
          <span className="leading-[normal]">4.5/</span>
          <span className="leading-[normal] text-[rgba(0,0,0,0.6)]">5</span>
        </p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] left-[calc(50%+10px)] not-italic text-[24px] text-black top-[1496px] whitespace-nowrap">
        <p className="leading-[normal]">4.500.000₫</p>
      </div>
      
      <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] left-[calc(75%-35px)] not-italic text-[20px] text-black top-[1431.5px] whitespace-nowrap">
        <p className="leading-[normal]">ÁO THUN TAY KẾ SỌC</p>
      </div>
      <div className="absolute content-stretch flex gap-[13px] items-center left-[calc(75%-35px)] top-[1453px]">
        <div className="h-[18.49px] relative shrink-0 w-[104px]">
          <img alt="" className="block max-w-none size-full" src={imgFrame10} />
        </div>
        <p className="font-['Satoshi',sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-black">
          <span className="leading-[normal]">4.5/</span>
          <span className="leading-[normal] text-[rgba(0,0,0,0.6)]">5</span>
        </p>
      </div>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[calc(75%-35px)] top-[1480px]">
        <div className="flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black whitespace-nowrap">
          <p className="leading-[normal]">3.250.000₫</p>
        </div>
        <div className="flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-[rgba(0,0,0,0.4)] whitespace-nowrap">
          <p className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] line-through">4.000.000₫</p>
        </div>
        <div className="bg-[rgba(255,51,51,0.1)] content-stretch flex items-center justify-center overflow-clip px-[14px] py-[6px] relative rounded-[62px] shrink-0 w-[58px]">
          <p className="font-['Satoshi',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#f33] text-[12px]">
            -30%
          </p>
        </div>
      </div>
      
      {/* View All Button */}
      <button className="-translate-x-1/2 absolute border border-[rgba(0,0,0,0.1)] border-solid content-stretch flex h-[52px] items-center justify-center left-1/2 overflow-clip px-[54px] py-[16px] rounded-[62px] top-[1548px] w-[218px] cursor-pointer hover:bg-gray-50 transition-colors">
        <p className="font-['Satoshi',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-black">
          Xem Tất Cả
        </p>
      </button>
      
      {/* Divider */}
      <div className="absolute h-0 left-[100px] right-[100px] top-[1664px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <img alt="" className="block max-w-none size-full" src={imgLine4} />
        </div>
      </div>
      
      {/* TOP SELLING Section */}
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Integral_CF',sans-serif] font-bold justify-center leading-[0] left-[calc(50%-1px)] not-italic text-[48px] text-black text-center top-[1757px] whitespace-nowrap">
        <p className="leading-[normal]">BÁN CHẠY NHẤT</p>
      </div>
      
      {/* Top Selling Products */}
      <div className="absolute bg-[#f0eeed] h-[298px] left-[100px] overflow-clip rounded-[20px] top-[1841px] w-[295px]">
        <div className="absolute h-[444px] left-[-1px] top-[-73px] w-[296px]" data-name="image 7">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage11} />
        </div>
      </div>
      <div className="absolute bg-[#f0eeed] h-[298px] left-[calc(25%+55px)] overflow-clip rounded-[20px] top-[1841px] w-[295px]">
        <div className="absolute h-[441px] left-px top-[-71px] w-[294px]" data-name="image 8">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage12} />
        </div>
      </div>
      <div className="absolute bg-[#f0eeed] h-[298px] left-[calc(50%+10px)] overflow-clip rounded-[20px] top-[1841px] w-[295px]">
        <div className="absolute h-[444px] left-0 top-[-73px] w-[296px]" data-name="image 9">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage13} />
        </div>
      </div>
      <div className="absolute bg-[#f0eeed] h-[298px] left-[calc(75%-35px)] overflow-clip rounded-[20px] top-[1841px] w-[295px]">
        <div className="absolute h-[378px] left-[22px] top-[-40px] w-[252px]" data-name="image 10">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
        </div>
      </div>
      
      {/* Top Selling Product Details */}
      <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] left-[100px] not-italic text-[20px] text-black top-[2168.5px] whitespace-nowrap">
        <p className="leading-[normal]">SƠ MI SỌC DỌC</p>
      </div>
      <div className="absolute content-stretch flex gap-[13px] items-center left-[100px] top-[2190px]">
        <div className="h-[18.49px] relative shrink-0 w-[113.697px]">
          <img alt="" className="block max-w-none size-full" src={imgFrame12} />
        </div>
        <p className="font-['Satoshi',sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-black">
          <span className="leading-[normal]">5.0/</span>
          <span className="leading-[normal] text-[rgba(0,0,0,0.6)]">5</span>
        </p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] left-[100px] not-italic text-[24px] text-black top-[2233px] whitespace-nowrap">
        <p className="leading-[normal]">5.300.000₫</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] left-[163px] not-italic text-[24px] text-[rgba(0,0,0,0.4)] top-[2233px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] line-through">5.800.000₫</p>
      </div>
      <div className="absolute bg-[rgba(255,51,51,0.1)] content-stretch flex items-center justify-center left-[calc(8.33%+111px)] overflow-clip px-[14px] py-[6px] rounded-[62px] top-[2219px] w-[58px]">
        <p className="font-['Satoshi',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#f33] text-[12px]">
          -20%
        </p>
      </div>
      
      <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] left-[calc(25%+55px)] not-italic text-[20px] text-black top-[2168.5px] whitespace-nowrap">
        <p className="leading-[normal]">ÁO THUN GRAPHIC COURAGE</p>
      </div>
      <div className="absolute content-stretch flex gap-[13px] items-center left-[calc(25%+55px)] top-[2190px]">
        <div className="h-[18.49px] relative shrink-0 w-[89.896px]">
          <img alt="" className="block max-w-none size-full" src={imgFrame13} />
        </div>
        <p className="font-['Satoshi',sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-black">
          <span className="leading-[normal]">4.0/</span>
          <span className="leading-[normal] text-[rgba(0,0,0,0.6)]">5</span>
        </p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] left-[calc(25%+55px)] not-italic text-[24px] text-black top-[2233px] whitespace-nowrap">
        <p className="leading-[normal]">3.625.000₫</p>
      </div>
      
      <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] left-[calc(50%+10px)] not-italic text-[20px] text-black top-[2168.5px] whitespace-nowrap">
        <p className="leading-[normal]">QUẦN SHORT BERMUDA RỘNG</p>
      </div>
      <div className="absolute content-stretch flex gap-[13px] items-center left-[calc(50%+10px)] top-[2190px]">
        <div className="h-[18.49px] relative shrink-0 w-[66.094px]">
          <img alt="" className="block max-w-none size-full" src={imgFrame14} />
        </div>
        <p className="font-['Satoshi',sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-black">
          <span className="leading-[normal]">3.0/</span>
          <span className="leading-[normal] text-[rgba(0,0,0,0.6)]">5</span>
        </p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] left-[calc(50%+10px)] not-italic text-[24px] text-black top-[2233px] whitespace-nowrap">
        <p className="leading-[normal]">2.000.000₫</p>
      </div>
      
      <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] left-[calc(75%-35px)] not-italic text-[20px] text-black top-[2168.5px] whitespace-nowrap">
        <p className="leading-[normal]">QUẦN JEANS ÔM PHỚI MÀU</p>
      </div>
      <div className="absolute content-stretch flex gap-[13px] items-center left-[calc(75%-35px)] top-[2190px]">
        <div className="h-[18.49px] relative shrink-0 w-[104px]">
          <img alt="" className="block max-w-none size-full" src={imgFrame10} />
        </div>
        <p className="font-['Satoshi',sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-black">
          <span className="leading-[normal]">4.5/</span>
          <span className="leading-[normal] text-[rgba(0,0,0,0.6)]">5</span>
        </p>
      </div>
      <div className="absolute content-stretch flex items-center left-[calc(75%-35px)] top-[2217px]">
        <div className="flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black whitespace-nowrap">
          <p className="leading-[normal]">5.250.000₫</p>
        </div>
      </div>
      
      {/* View All Button 2 */}
      <button className="-translate-x-1/2 absolute border border-[rgba(0,0,0,0.1)] border-solid content-stretch flex h-[52px] items-center justify-center left-1/2 overflow-clip px-[54px] py-[16px] rounded-[62px] top-[2285px] w-[218px] cursor-pointer hover:bg-gray-50 transition-colors">
        <p className="font-['Satoshi',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-black">
          Xem Tất Cả
        </p>
      </button>
      
      {/* BROWSE BY DRESS STYLE */}
      <div className="absolute bg-[#f0f0f0] h-[866px] left-[100px] right-[100px] overflow-clip rounded-[40px] top-[2417px]">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Integral_CF',sans-serif] font-bold justify-center leading-[0] left-1/2 not-italic text-[48px] text-black text-center top-[99px] whitespace-nowrap">
          <p className="leading-[normal]">KHÁM PHÁ THEO PHONG CÁCH</p>
        </div>
        <div className="absolute bg-white h-[289px] left-[64px] overflow-clip rounded-[20px] top-[192px] w-[407px] cursor-pointer hover:shadow-lg transition-shadow">
          <div className="absolute flex h-[649px] items-center justify-center left-[-347px] top-[-122px] w-[973px]">
            <div className="-scale-y-100 flex-none rotate-180">
              <div className="h-[649px] relative w-[973px]" data-name="image 11">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage15} />
              </div>
            </div>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] left-[36px] not-italic text-[36px] text-black top-[49.5px] whitespace-nowrap">
            <p className="leading-[normal]">Thường Ngày</p>
          </div>
        </div>
        <div className="absolute bg-white h-[289px] left-[768px] overflow-clip rounded-[20px] top-[501px] w-[407px] cursor-pointer hover:shadow-lg transition-shadow">
          <div className="absolute h-[677px] left-[53px] top-[-148px] w-[452px]" data-name="image 14">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage16} />
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] left-[36px] not-italic text-[36px] text-black top-[49.5px] whitespace-nowrap">
            <p className="leading-[normal]">Thể Thao</p>
          </div>
        </div>
        <div className="absolute bg-white h-[289px] left-[491px] overflow-clip rounded-[20px] top-[192px] w-[684px] cursor-pointer hover:shadow-lg transition-shadow">
          <div className="absolute h-[870px] left-0 top-[-146px] w-[1306px]" data-name="image 13">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage17} />
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] left-[36px] not-italic text-[36px] text-black top-[49.5px] whitespace-nowrap">
            <p className="leading-[normal]">Trang Trọng</p>
          </div>
        </div>
        <div className="absolute bg-white h-[289px] left-[64px] overflow-clip rounded-[20px] top-[501px] w-[684px] cursor-pointer hover:shadow-lg transition-shadow">
          <div className="absolute h-[616px] left-[42px] top-[-163px] w-[770px]" data-name="image 12">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage18} />
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi',sans-serif] font-bold justify-center leading-[0] left-[36px] not-italic text-[36px] text-black top-[49.5px] whitespace-nowrap">
            <p className="leading-[normal]">Tiệc Tùng</p>
          </div>
        </div>
      </div>
      
      {/* OUR HAPPY CUSTOMERS */}
      <div className="-translate-y-1/2 absolute flex flex-col font-['Integral_CF',sans-serif] font-bold justify-center leading-[0] left-[calc(29.17%-320px)] not-italic text-[48px] text-black top-[3392px] whitespace-nowrap">
        <p className="leading-[normal]">KHÁCH HÀNG HÀI LÒNG</p>
      </div>
      
      {/* Customer Reviews with Navigation */}
      <div className="absolute flex items-center justify-center left-[calc(91.67%-44px)] size-[24px] top-[3397px] cursor-pointer">
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="relative size-[24px]" data-name="arrow-down-bold 2">
            <img alt="prev" className="block max-w-none size-full" src={imgArrowDownBold2} />
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[calc(91.67%-4px)] size-[24px] top-[3397px] cursor-pointer">
        <div className="-rotate-90 flex-none">
          <div className="relative size-[24px]" data-name="arrow-down-bold 1">
            <img alt="next" className="block max-w-none size-full" src={imgArrowDownBold1} />
          </div>
        </div>
      </div>
      
      {/* Reviews Cards */}
      <div className="absolute border border-[rgba(0,0,0,0.1)] border-solid content-start flex flex-wrap gap-[24px] h-[240px] items-start left-[100px] overflow-clip px-[32px] py-[28px] rounded-[20px] top-[3461px] w-[400px]">
        <div className="content-stretch flex flex-[1_0_0] items-start justify-between min-h-px min-w-px relative">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[15px] items-start min-h-px min-w-px relative">
            <div className="h-[22.579px] relative shrink-0 w-[138.842px]">
              <img alt="" className="block max-w-none size-full" src={imgFrame15} />
            </div>
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                <p className="font-['Satoshi',sans-serif] font-bold leading-[22px] not-italic relative shrink-0 text-[20px] text-black">
                  Sarah M.
                </p>
                <div className="relative shrink-0 size-[24px]" data-name="Frame">
                  <img alt="verified" className="block max-w-none size-full" src={imgFrame5} />
                </div>
              </div>
              <p className="font-['Satoshi',sans-serif] leading-[22px] min-w-full not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.6)] w-[min-content] whitespace-pre-wrap">{`"Tôi rất ấn tượng với chất lượng và phong cách của những bộ quần áo tôi nhận được từ Clothify. Từ trang phục thường ngày đến những chiếc đầm thanh lịch, mỗi sản phẩm tôi mua đều vượt quá mong đợi của tôi."`}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute border border-[rgba(0,0,0,0.1)] border-solid content-start flex flex-wrap gap-[24px] items-start left-[calc(33.33%+40px)] overflow-clip px-[32px] py-[28px] rounded-[20px] top-[3461px] w-[400px]">
        <div className="content-stretch flex flex-[1_0_0] items-start justify-between min-h-px min-w-px relative">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[15px] items-start min-h-px min-w-px relative">
            <div className="h-[22.579px] relative shrink-0 w-[138.842px]">
              <img alt="" className="block max-w-none size-full" src={imgFrame15} />
            </div>
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                <p className="font-['Satoshi',sans-serif] font-bold leading-[22px] not-italic relative shrink-0 text-[20px] text-black">
                  Alex K.
                </p>
                <div className="relative shrink-0 size-[24px]" data-name="Frame">
                  <img alt="verified" className="block max-w-none size-full" src={imgFrame5} />
                </div>
              </div>
              <p className="font-['Satoshi',sans-serif] leading-[22px] min-w-full not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.6)] w-[min-content] whitespace-pre-wrap">{`"Việc tìm kiếm quần áo phù hợp với phong cách cá nhân từng là thách thức cho đến khi tôi khám phá ra Clothify. Sự đa dạng mà họ cung cấp thực sự đáng chú ý, phục vụ nhiều sở thích và dịp khác nhau."`}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute border border-[rgba(0,0,0,0.1)] border-solid content-start flex flex-wrap gap-[24px] items-start left-[calc(66.67%-20px)] overflow-clip px-[32px] py-[28px] rounded-[20px] top-[3461px] w-[400px]">
        <div className="content-stretch flex flex-[1_0_0] items-start justify-between min-h-px min-w-px relative">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[15px] items-start min-h-px min-w-px relative">
            <div className="h-[22.579px] relative shrink-0 w-[138.842px]">
              <img alt="" className="block max-w-none size-full" src={imgFrame15} />
            </div>
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                <p className="font-['Satoshi',sans-serif] font-bold leading-[22px] not-italic relative shrink-0 text-[20px] text-black">
                  James L.
                </p>
                <div className="relative shrink-0 size-[24px]" data-name="Frame">
                  <img alt="verified" className="block max-w-none size-full" src={imgFrame5} />
                </div>
              </div>
              <p className="font-['Satoshi',sans-serif] leading-[22px] min-w-full not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.6)] w-[min-content] whitespace-pre-wrap">{`"Với tư cách là người luôn tìm kiếm những món đồ thời trang độc đáo, tôi rất vui mừng khi tìm thấy Clothify. Bộ sưu tập quần áo không chỉ đa dạng mà còn bắt kịp xu hướng mới nhất."`}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <div className="absolute bg-black content-stretch flex items-center justify-between left-[100px] right-[100px] overflow-clip px-[64px] py-[36px] rounded-[20px] top-[3781px]">
        <p className="font-['Integral_CF',sans-serif] font-bold h-[94px] leading-[45px] not-italic relative shrink-0 text-[40px] text-white w-[551px] whitespace-pre-wrap">
          CẬP NHẬT ƯU ĐÃI MỚI NHẤT CỦA CHÚNG TÔI
        </p>
        <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0">
          <div className="bg-white content-stretch flex gap-[12px] items-start overflow-clip px-[16px] py-[12px] relative rounded-[62px] shrink-0 w-[349px]">
            <div className="relative shrink-0 size-[24px]" data-name="Frame">
              <img alt="" className="block max-w-none size-full" src={imgFrame6} />
            </div>
            <input type="email" placeholder="Nhập địa chỉ email của bạn" className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.4)] bg-transparent border-none outline-none w-full" />
          </div>
          <button className="bg-white content-stretch flex items-center justify-center overflow-clip px-[16px] py-[12px] relative rounded-[62px] shrink-0 w-[349px] cursor-pointer hover:bg-gray-100 transition-colors">
            <p className="font-['Satoshi',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-black">
              Đăng Ký Nhận Tin
            </p>
          </button>
        </div>
      </div>
      
      {/* Footer */}
     
      <div className="absolute content-stretch flex items-start justify-between left-[100px] right-[100px] top-[4011px]">
        <div className="content-stretch flex flex-col gap-[35px] items-start relative shrink-0">
          <div className="content-stretch flex flex-col gap-[25px] items-start not-italic relative shrink-0">
            <div className="flex flex-col font-['Integral_CF',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[33.455px] text-black whitespace-nowrap">
              <p className="leading-[normal]">Clothify</p>
            </div>
            <p className="font-['Satoshi',sans-serif] leading-[22px] relative shrink-0 text-[14px] text-[rgba(0,0,0,0.6)] w-[248px] whitespace-pre-wrap">
              Chúng tôi có những bộ quần áo phù hợp với phong cách của bạn và đáng để bạn tự hào khi mặc. Từ nữ giới đến nam giới.
            </p>
          </div>
          <div className="flex gap-3 items-center" data-name="Social">
            <a href="#" className="relative flex items-center justify-center size-[28px] rounded-full bg-white border border-[rgba(0,0,0,0.1)] hover:bg-gray-50 transition-colors cursor-pointer">
              <img alt="twitter" className="w-[11px] h-[9px]" src={imgGroup3} />
            </a>
            <a href="#" className="relative flex items-center justify-center size-[28px] rounded-full bg-black hover:bg-gray-800 transition-colors cursor-pointer">
              <img alt="facebook" className="w-[6px] h-[12px]" src={imgGroup4} />
            </a>
            <a href="#" className="relative flex items-center justify-center size-[28px] rounded-full bg-white border border-[rgba(0,0,0,0.1)] hover:bg-gray-50 transition-colors cursor-pointer">
              <img alt="instagram" className="w-[14px] h-[14px]" src={imgGroup5} />
            </a>
            <a href="#" className="relative flex items-center justify-center size-[28px] rounded-full bg-white border border-[rgba(0,0,0,0.1)] hover:bg-gray-50 transition-colors cursor-pointer">
              <img alt="github" className="w-[13px] h-[13px]" src={imgGroup6} />
            </a>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[26px] items-start not-italic relative shrink-0 text-[16px]">
          <p className="font-['Satoshi',sans-serif] font-medium leading-[18px] relative shrink-0 text-black tracking-[3px] uppercase">
            CÔNG TY
          </p>
          <div className="font-['Satoshi',sans-serif] leading-[19px] relative shrink-0 text-[rgba(0,0,0,0.6)] whitespace-nowrap cursor-pointer">
            <p className="mb-2 hover:text-black transition-colors">Giới Thiệu</p>
            <p className="mb-2 hover:text-black transition-colors">Tính Năng</p>
            <p className="mb-2 hover:text-black transition-colors">Dự Án</p>
            <p className="hover:text-black transition-colors">Tuyển Dụng</p>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[26px] items-start not-italic relative shrink-0 text-[16px]">
          <p className="font-['Satoshi',sans-serif] font-medium leading-[18px] relative shrink-0 text-black tracking-[3px] uppercase">
            HỖ TRỢ
          </p>
          <div className="font-['Satoshi',sans-serif] leading-[19px] relative shrink-0 text-[rgba(0,0,0,0.6)] whitespace-nowrap cursor-pointer">
            <p className="mb-2 hover:text-black transition-colors">Hỗ Trợ Khách Hàng</p>
            <p className="mb-2 hover:text-black transition-colors">Chi Tiết Giao Hàng</p>
            <p className="mb-2 hover:text-black transition-colors">Điều Khoản & Điều Kiện</p>
            <p className="hover:text-black transition-colors">Chính Sách Bảo Mật</p>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[26px] items-start not-italic relative shrink-0 text-[16px]">
          <p className="font-['Satoshi',sans-serif] font-medium leading-[18px] relative shrink-0 text-black tracking-[3px] uppercase">
            CÂU HỎI
          </p>
          <div className="font-['Satoshi',sans-serif] leading-[19px] relative shrink-0 text-[rgba(0,0,0,0.6)] w-[149px] whitespace-pre-wrap cursor-pointer">
            <p className="mb-2 hover:text-black transition-colors">Tài Khoản</p>
            <p className="mb-2 hover:text-black transition-colors">Quản Lý Giao Hàng</p>
            <p className="mb-2 hover:text-black transition-colors">Đơn Hàng</p>
            <p className="hover:text-black transition-colors">Thanh Toán</p>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[26px] items-start not-italic relative shrink-0 text-[16px]">
          <p className="font-['Satoshi',sans-serif] font-medium leading-[18px] relative shrink-0 text-black tracking-[3px] uppercase">
            TÀI NGUYÊN
          </p>
          <div className="font-['Satoshi',sans-serif] leading-[19px] relative shrink-0 text-[rgba(0,0,0,0.6)] whitespace-nowrap cursor-pointer">
            <p className="mb-2 hover:text-black transition-colors">Sách Điện Tử Miễn Phí</p>
            <p className="mb-2 hover:text-black transition-colors">Hướng Dẫn Lập Trình</p>
            <p className="mb-2 hover:text-black transition-colors">Blog Hướng Dẫn</p>
            <p className="hover:text-black transition-colors">Danh Sách Youtube</p>
          </div>
        </div>
      </div>
      
      {/* Divider Line */}
      <div className="absolute h-0 left-[100px] right-[100px] top-[4238px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <img alt="" className="block max-w-none size-full" src={imgLine4} />
        </div>
      </div>
      
      {/* Payment Methods */}
      <div className="absolute content-stretch flex gap-[12px] items-end left-[calc(75%-21px)] top-[4258px]">
        <div className="h-[30.03px] relative shrink-0 w-[46.614px]" data-name="Badge">
          <div className="absolute inset-[-15.67%_-19.71%_-45.52%_-19.71%]">
            <img alt="visa" className="block max-w-none size-full" src={imgBadge} />
          </div>
        </div>
        <div className="h-[30.03px] relative shrink-0 w-[46.614px]" data-name="Badge">
          <div className="absolute inset-[-15.67%_-19.71%_-45.52%_-19.71%]">
            <img alt="mastercard" className="block max-w-none size-full" src={imgBadge1} />
          </div>
        </div>
        <div className="h-[30.03px] relative shrink-0 w-[46.614px]" data-name="Badge">
          <div className="absolute inset-[-15.67%_-19.71%_-45.52%_-19.71%]">
            <img alt="paypal" className="block max-w-none size-full" src={imgBadge2} />
          </div>
        </div>
        <div className="h-[30.03px] relative shrink-0 w-[46.614px]" data-name="Badge">
          <div className="absolute inset-[-15.67%_-19.71%_-45.52%_-19.71%]">
            <img alt="applepay" className="block max-w-none size-full" src={imgBadge3} />
          </div>
        </div>
        <div className="h-[30.03px] relative shrink-0 w-[46.614px]" data-name="Badge">
          <div className="absolute inset-[-15.67%_-19.71%_-45.52%_-19.71%]">
            <img alt="googlepay" className="block max-w-none size-full" src={imgBadge4} />
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <p className="absolute font-['Satoshi',sans-serif] leading-[normal] left-[100px] not-italic text-[14px] text-[rgba(0,0,0,0.6)] text-left top-[4263px]">
        Clothify © 2000-2023, Bảo Lưu Mọi Quyền
      </p>
      </div>
    </div>
  );
}

