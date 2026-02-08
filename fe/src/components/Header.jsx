import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const imgFrame = "https://www.figma.com/api/mcp/asset/4ab7a5fa-2d39-4da7-b499-d425fe5213ec";
const imgFrame1 = "https://www.figma.com/api/mcp/asset/7701ec5a-4892-4d57-82b9-f0bc3260ee70";
const imgFrame2 = "https://www.figma.com/api/mcp/asset/2782c078-7936-4809-936a-66d3876b366c";
const imgFrame3 = "https://www.figma.com/api/mcp/asset/a3818d6e-03f9-4a23-9837-06790e2ea1b9";
const imgFrame4 = "https://www.figma.com/api/mcp/asset/5004aff2-a100-41ad-91a7-7902dc7ff937";

export default function Header() {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [placeholder, setPlaceholder] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const placeholders = [
    "Tìm áo hoodie...",
    "Tìm giày Nike...",
    "Tìm quần jeans...",
    "Tìm áo thun..."
  ];

  useEffect(() => {
    const typeSpeed = isDeleting ? 40 : 60;
    const currentText = placeholders[placeholderIndex];

    if (!isDeleting && charIndex === currentText.length) {
      // Finished typing, wait then start deleting
      setTimeout(() => setIsDeleting(true), 1200);
      return;
    }

    if (isDeleting && charIndex === 0) {
      // Finished deleting, move to next placeholder
      setIsDeleting(false);
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
      return;
    }

    const timeout = setTimeout(() => {
      setPlaceholder(currentText.substring(0, charIndex + (isDeleting ? -1 : 1)));
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, placeholderIndex]);

  return (
    <>
      {/* Top Banner */}
      {showBanner && (
        <div className="absolute bg-black h-[38px] left-0 overflow-clip top-0 w-full z-50">
          <p className="absolute font-['Satoshi',sans-serif] font-normal leading-[0] left-[calc(50%-200px)] text-[14px] text-white top-[calc(50%-10px)]">
            <span className="leading-[normal]">{`Đăng ký và nhận giảm giá 20% cho đơn hàng đầu tiên. `}</span>
            <span 
              className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] underline cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Đăng Ký Ngay
            </span>
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
      
      {/* Header/Navigation */}
      <div className="absolute content-stretch flex gap-[40px] items-center justify-center left-0 right-0 mx-[100px] top-[62px] z-40">
        <div 
          className="flex flex-col font-['Integral_CF',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[32px] text-black whitespace-nowrap cursor-pointer"
          onClick={() => navigate('/')}
        >
          <p className="leading-[normal]">Clothify</p>
        </div>
        <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
          <div 
            className="relative"
            onMouseEnter={() => setShowProductDropdown(true)}
            onMouseLeave={() => setShowProductDropdown(false)}
          >
            <div 
              className="content-stretch flex gap-[4px] items-center relative shrink-0 cursor-pointer"
              onClick={() => navigate('/category')}
            >
              <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-black">
                Sản Phẩm
              </p>
              <div className="relative shrink-0 size-[16px]" data-name="Frame">
                <img alt="" className="block max-w-none size-full" src={imgFrame1} />
              </div>
            </div>

            {/* Dropdown Menu */}
            {showProductDropdown && (
              <div className="absolute top-[20px] left-0 bg-white rounded-[8px] shadow-lg pt-[18px] pb-[12px] min-w-[160px] z-50 border border-[rgba(0,0,0,0.1)]">
                <div 
                  className="relative px-[20px] py-[10px] hover:bg-[#f0f0f0] cursor-pointer flex items-center justify-between group"
                  onMouseEnter={() => setActiveSubmenu('ao')}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <p className="font-['Satoshi',sans-serif] text-[14px] text-black">ÁO</p>
                  <span className="text-[12px] text-[rgba(0,0,0,0.4)] group-hover:text-black">&lt;</span>
                  
                  {/* ÁO Submenu */}
                  {activeSubmenu === 'ao' && (
                    <div className="absolute left-full top-0 ml-[-1px] bg-white rounded-[8px] shadow-lg py-[12px] min-w-[140px] border border-[rgba(0,0,0,0.1)]">
                      <div 
                        className="px-[20px] py-[10px] hover:bg-[#f0f0f0] cursor-pointer"
                        onClick={() => { navigate('/category/ao-polo'); setShowProductDropdown(false); setActiveSubmenu(null); }}
                      >
                        <p className="font-['Satoshi',sans-serif] text-[14px] text-black">ÁO POLO</p>
                      </div>
                      <div 
                        className="px-[20px] py-[10px] hover:bg-[#f0f0f0] cursor-pointer"
                        onClick={() => { navigate('/category/ao-thun'); setShowProductDropdown(false); setActiveSubmenu(null); }}
                      >
                        <p className="font-['Satoshi',sans-serif] text-[14px] text-black">ÁO THUN</p>
                      </div>
                      <div 
                        className="px-[20px] py-[10px] hover:bg-[#f0f0f0] cursor-pointer"
                        onClick={() => { navigate('/category/ao-so-mi'); setShowProductDropdown(false); setActiveSubmenu(null); }}
                      >
                        <p className="font-['Satoshi',sans-serif] text-[14px] text-black">ÁO SƠ MI</p>
                      </div>
                      <div 
                        className="px-[20px] py-[10px] hover:bg-[#f0f0f0] cursor-pointer"
                        onClick={() => { navigate('/category/ao-khoac'); setShowProductDropdown(false); setActiveSubmenu(null); }}
                      >
                        <p className="font-['Satoshi',sans-serif] text-[14px] text-black">ÁO KHOÁC</p>
                      </div>
                      <div 
                        className="px-[20px] py-[10px] hover:bg-[#f0f0f0] cursor-pointer"
                        onClick={() => { navigate('/category/ao-len'); setShowProductDropdown(false); setActiveSubmenu(null); }}
                      >
                        <p className="font-['Satoshi',sans-serif] text-[14px] text-black">ÁO LEN</p>
                      </div>
                      <div 
                        className="px-[20px] py-[10px] hover:bg-[#f0f0f0] cursor-pointer"
                        onClick={() => { navigate('/category/ao-blouse'); setShowProductDropdown(false); setActiveSubmenu(null); }}
                      >
                        <p className="font-['Satoshi',sans-serif] text-[14px] text-black">ÁO BLOUSE</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div 
                  className="relative px-[20px] py-[10px] hover:bg-[#f0f0f0] cursor-pointer flex items-center justify-between group"
                  onMouseEnter={() => setActiveSubmenu('quan')}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <p className="font-['Satoshi',sans-serif] text-[14px] text-black">QUẦN</p>
                  <span className="text-[12px] text-[rgba(0,0,0,0.4)] group-hover:text-black">&lt;</span>
                  
                  {/* QUẦN Submenu */}
                  {activeSubmenu === 'quan' && (
                    <div className="absolute left-full top-0 ml-[-1px] bg-white rounded-[8px] shadow-lg py-[12px] min-w-[160px] border border-[rgba(0,0,0,0.1)]">
                      <div 
                        className="px-[20px] py-[10px] hover:bg-[#f0f0f0] cursor-pointer"
                        onClick={() => { navigate('/category/quan-tay'); setShowProductDropdown(false); setActiveSubmenu(null); }}
                      >
                        <p className="font-['Satoshi',sans-serif] text-[14px] text-black">QUẦN TÂY</p>
                      </div>
                      <div 
                        className="px-[20px] py-[10px] hover:bg-[#f0f0f0] cursor-pointer"
                        onClick={() => { navigate('/category/quan-jeans'); setShowProductDropdown(false); setActiveSubmenu(null); }}
                      >
                        <p className="font-['Satoshi',sans-serif] text-[14px] text-black">QUẦN JEANS</p>
                      </div>
                      <div 
                        className="px-[20px] py-[10px] hover:bg-[#f0f0f0] cursor-pointer"
                        onClick={() => { navigate('/category/quan-khaki'); setShowProductDropdown(false); setActiveSubmenu(null); }}
                      >
                        <p className="font-['Satoshi',sans-serif] text-[14px] text-black">QUẦN KHAKI</p>
                      </div>
                      <div 
                        className="px-[20px] py-[10px] hover:bg-[#f0f0f0] cursor-pointer"
                        onClick={() => { navigate('/category/quan-short'); setShowProductDropdown(false); setActiveSubmenu(null); }}
                      >
                        <p className="font-['Satoshi',sans-serif] text-[14px] text-black">QUẦN SHORT</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div 
                  className="px-[20px] py-[10px] hover:bg-[#f0f0f0] cursor-pointer"
                  onClick={() => { navigate('/category/dam'); setShowProductDropdown(false); }}
                  onMouseEnter={() => setActiveSubmenu(null)}
                >
                  <p className="font-['Satoshi',sans-serif] text-[14px] text-black">ĐẦM</p>
                </div>
                <div 
                  className="px-[20px] py-[10px] hover:bg-[#f0f0f0] cursor-pointer"
                  onClick={() => { navigate('/category/chan-vay'); setShowProductDropdown(false); }}
                  onMouseEnter={() => setActiveSubmenu(null)}
                >
                  <p className="font-['Satoshi',sans-serif] text-[14px] text-black">CHÂN VÁY</p>
                </div>
                <div 
                  className="px-[20px] py-[10px] hover:bg-[#f0f0f0] cursor-pointer"
                  onClick={() => { navigate('/category/phu-kien'); setShowProductDropdown(false); }}
                  onMouseEnter={() => setActiveSubmenu(null)}
                >
                  <p className="font-['Satoshi',sans-serif] text-[14px] text-black">PHỤ KIỆN</p>
                </div>
              </div>
            )}
          </div>
          <p 
            className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-black cursor-pointer"
            onClick={() => navigate('/category/sale')}
          >
            Khuyến Mãi
          </p>
          <p 
            className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-black cursor-pointer"
            onClick={() => navigate('/category/new')}
          >
            Hàng Mới Về
          </p>
          <p 
            className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-black cursor-pointer"
            onClick={() => navigate('/store')}
          >
            Cửa Hàng
          </p>
        </div>
        <div className="bg-[#f0f0f0] content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px overflow-clip px-[16px] py-[12px] relative rounded-[62px]">
          <div className="relative shrink-0 size-[24px]" data-name="Frame">
            <img alt="" className="block max-w-none size-full" src={imgFrame2} />
          </div>
          <input
            type="text"
            placeholder={placeholder || 'Tìm kiếm...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="font-['Satoshi',sans-serif] bg-transparent leading-[normal] text-[16px] text-black placeholder:text-[rgba(0,0,0,0.4)] flex-1 outline-none"
          />
        </div>
        <div className="content-stretch flex gap-[14px] items-start relative shrink-0">
          <div 
            className="relative shrink-0 size-[24px] cursor-pointer" 
            data-name="Frame"
            onClick={() => navigate('/cart')}
          >
            <img alt="cart" className="block max-w-none size-full" src={imgFrame3} />
          </div>
          <div 
            className="relative shrink-0 size-[24px] cursor-pointer group" 
            data-name="Wishlist"
            onClick={() => navigate('/account')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.694C10 3 3 3.5 3 9.5s9 11 9 11s9-5 9-11s-7-6.5-9-1.806"></path>
            </svg>
          </div>
          <div 
            className="relative shrink-0 size-[24px] cursor-pointer" 
            data-name="Frame"
            onClick={() => navigate('/login')}
          >
            <img alt="user" className="block max-w-none size-full" src={imgFrame4} />
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="absolute h-0 left-[100px] top-[134px] w-[1240px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <div className="h-px bg-[rgba(0,0,0,0.1)] w-full" />
        </div>
      </div>
    </>
  );
}
