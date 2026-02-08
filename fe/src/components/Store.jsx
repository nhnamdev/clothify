import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

export default function Store() {
  const navigate = useNavigate();
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedStore, setSelectedStore] = useState(null);

  // Danh sách cửa hàng
  const stores = [
    {
      id: 1,
      province: 'ho-chi-minh',
      provinceName: 'Hồ Chí Minh',
      district: 'quan-1',
      districtName: 'Quận 1',
      name: 'Hồ Chí Minh - Clothify - 172 Nguyễn Trãi',
      address: '172 Nguyễn Trãi, P. Bến Thành, Q. 1',
      phone: '0283.926.0149',
      hours: '8:30 - 22:00',
      mapUrl: 'https://maps.app.goo.gl/1RooSuwTjdX6sesu9',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d77827.2367494864!2d106.67086575271966!3d10.738740349316364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fb4cc2d3ecb%3A0xb11b213bd76606bb!2sJohn%20Henry%20Nguy%E1%BB%85n%20Tr%C3%A3i%20Q.1!5e1!3m2!1svi!2s!4v1736300810801!5m2!1svi!2s'
    },
    {
      id: 2,
      province: 'ho-chi-minh',
      provinceName: 'Hồ Chí Minh',
      district: 'quan-5',
      districtName: 'Quận 5',
      name: 'Hồ Chí Minh - Clothify - 148 Nguyễn Trãi',
      address: '148 Nguyễn Trãi, P. 3, Q. 5',
      phone: '0282.201.6905',
      hours: '8:30 - 22:00',
      mapUrl: 'https://maps.app.goo.gl/t62dMBVBQRDjDduf9',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4863.899322672923!2d106.67355148511122!3d10.757541432201366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f02cd6df471%3A0x6c0842c886aa90bb!2zMTQ4IE5ndXnhu4VuIFRyw6NpLCBQaMaw4budbmcgMywgUXXhuq1uIDUsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e1!3m2!1svi!2s!4v1736300858393!5m2!1svi!2s'
    },
    {
      id: 3,
      province: 'ho-chi-minh',
      provinceName: 'Hồ Chí Minh',
      district: 'quan-go-vap',
      districtName: 'Quận Gò Vấp',
      name: 'Hồ Chí Minh - Clothify - 636 Quang Trung',
      address: '636 Quang Trung, P. 11, Q. Gò Vấp',
      phone: '0286.689.1414',
      hours: '8:30 - 22:00',
      mapUrl: 'https://maps.app.goo.gl/866RM5vqbKCF3ge57',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4862.627381879036!2d106.65797607586923!3d10.83612005808815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529a76cf57553%3A0xb12180388de82c31!2zNjM2IMSQLiBRdWFuZyBUcnVuZywgUGjGsOG7nW5nIDExLCBHw7IgVuG6pXAsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e1!3m2!1svi!2s!4v1736301377064!5m2!1svi!2s'
    },
    {
      id: 4,
      province: 'ho-chi-minh',
      provinceName: 'Hồ Chí Minh',
      district: 'quan-binh-thanh',
      districtName: 'Quận Bình Thạnh',
      name: 'Hồ Chí Minh - Clothify - 61-63 Đinh Bộ Lĩnh',
      address: '61-63 Đinh Bộ Lĩnh, P. 26, Q. Bình Thạnh',
      phone: '0282.202.7120',
      hours: '8:30 - 22:00',
      mapUrl: 'https://maps.app.goo.gl/vFaUgxqRqd2Khm2fA',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4863.102100809126!2d106.706715075869!3d10.80685865862997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752929c5d24e35%3A0x9f1caecb0138316a!2zSm9obiBIZW5yeSDEkGluaCBC4buZIEzEqW5o!5e1!3m2!1svi!2s!4v1736301152169!5m2!1svi!2s'
    },
    {
      id: 5,
      province: 'ha-noi',
      provinceName: 'Hà Nội',
      district: 'quan-nam-tu-liem',
      districtName: 'Quận Nam Từ Liêm',
      name: 'Hà Nội - Clothify - The Garden',
      address: 'Tầng 2, Mễ Trì, Mỹ Đình 1, Q. Nam Từ Liêm',
      phone: '0243.787.6604',
      hours: '9:30 - 22:00',
      mapUrl: 'https://maps.app.goo.gl/qfnSttxRsiHQj8er6',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4621.5231418950225!2d105.7769264759983!3d21.01765948815822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454aa6e1ff1f5%3A0xb1499aaadc72327!2sJohn%20Henry%20The%20Garden%20H%C3%A0%20N%E1%BB%99i!5e1!3m2!1svi!2s!4v1736302335863!5m2!1svi!2s'
    },
    {
      id: 6,
      province: 'ha-noi',
      provinceName: 'Hà Nội',
      district: 'quan-cau-giay',
      districtName: 'Quận Cầu Giấy',
      name: 'Hà Nội - Clothify - 55 Trần Duy Hưng',
      address: '55 Trần Duy Hưng, P. Yên Hòa, TP. Hà Nội',
      phone: '0246.664.5179',
      hours: '8:30 - 21:30',
      mapUrl: 'https://maps.app.goo.gl/enV7AuVP6rHNABs87',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4621.698059183938!2d105.79893397599828!3d21.012014688352085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad0056369461%3A0xb514c37451aa4cb2!2sJohn%20Henry!5e1!3m2!1svi!2s!4v1758509340260!5m2!1svi!2s'
    },
    {
      id: 7,
      province: 'da-nang',
      provinceName: 'Đà Nẵng',
      district: 'quan-hai-chau',
      districtName: 'Quận Hải Châu',
      name: 'Đà Nẵng - Clothify - 157 Nguyễn Văn Linh',
      address: '157 Nguyễn Văn Linh, P. Nam Dương, Q. Hải Châu',
      phone: '0236.222.2357',
      hours: '8:30 - 22:00',
      mapUrl: 'https://maps.app.goo.gl/kqa6QmhpQ9aLYk8i9',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4757.67873054955!2d108.212460375922!3d16.060301639675217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219743fecd3cf%3A0x6b39b53f9cbeadde!2zQ-G7rWEgSMOgbmcgSm9obiBIZW5yeSAxNTcgTmd1eeG7hW4gVsSDbiBMaW5oIMSQw6AgTuG6tW5nIDE0NQ!5e1!3m2!1svi!2s!4v1736302394623!5m2!1svi!2s'
    },
    {
      id: 8,
      province: 'da-nang',
      provinceName: 'Đà Nẵng',
      district: 'quan-thanh-khe',
      districtName: 'Quận Thanh Khê',
      name: 'Đà Nẵng - Clothify - 360 Lê Duẩn',
      address: '360 Lê Duẩn, P. Tân Chính, Q. Thanh Khê',
      phone: '0236.356.6616',
      hours: '8:30 - 22:00',
      mapUrl: 'https://maps.app.goo.gl/Mexq4n5YozuUfGW29',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4757.480198697667!2d108.20615687592212!3d16.06860453945301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142192e7e714e05%3A0x877bb8097666436!2sJohn%20Henry%20360%20L%C3%AA%20Du%E1%BA%A9n%20053!5e1!3m2!1svi!2s!4v1736302529455!5m2!1svi!2s'
    },
    {
      id: 9,
      province: 'can-tho',
      provinceName: 'Cần Thơ',
      district: 'quan-ninh-kieu',
      districtName: 'Quận Ninh Kiều',
      name: 'Cần Thơ - Clothify - 174B Đường 3/2',
      address: '174B Đường 3/2, P. Hưng Lợi, Q. Ninh Kiều',
      phone: '0292.220.0143',
      hours: '8:30 - 22:00',
      mapUrl: 'https://maps.app.goo.gl/o54hXr4SLbNARtZS6',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4875.322821067638!2d105.76515657586361!3d10.024571472609733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a089be0abe2b1f%3A0x2c47bc9a34c42201!2zSk9ITiBIRU5SWSDEkMaw4bucTkcgMy8yIEPhuqZOIFRIxqA!5e1!3m2!1svi!2s!4v1736302623079!5m2!1svi!2s'
    }
  ];

  // Lấy danh sách tỉnh duy nhất
  const provinces = [...new Set(stores.map(store => ({ value: store.province, label: store.provinceName })))];
  
  // Lấy danh sách quận/huyện theo tỉnh đã chọn
  const districts = selectedProvince === 'all' 
    ? [] 
    : [...new Set(stores.filter(s => s.province === selectedProvince).map(s => ({ value: s.district, label: s.districtName })))];

  // Lọc cửa hàng theo tỉnh và quận
  const filteredStores = stores.filter(store => {
    if (selectedProvince !== 'all' && store.province !== selectedProvince) return false;
    if (selectedDistrict !== 'all' && store.district !== selectedDistrict) return false;
    return true;
  });

  // Xử lý thay đổi tỉnh
  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedDistrict('all');
    setSelectedStore(null);
  };

  // Xử lý thay đổi quận
  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedStore(null);
  };

  // Xử lý click vào cửa hàng
  const handleStoreClick = (store) => {
    setSelectedStore(store);
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      
      <div className="px-[100px] py-[24px] pt-[158px]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <span 
            className="text-black/60 cursor-pointer hover:text-black"
            onClick={() => navigate('/')}
          >
            Trang Chủ
          </span>
          <span className="text-black/60">&gt;</span>
          <span className="text-black font-medium">Cửa Hàng</span>
        </div>

        {/* Title */}
        <h1 className="text-[32px] font-bold text-center mb-8" style={{ fontFamily: 'Integral CF, sans-serif' }}>
          HỆ THỐNG CỬA HÀNG CLOTHIFY
        </h1>

        <div className="flex gap-6">
          {/* Left Side - Store List */}
          <div className="w-[40%]">
            {/* Filters */}
            <div className="mb-4 space-y-3">
              <select 
                value={selectedProvince}
                onChange={handleProvinceChange}
                className="w-full px-4 py-3 border border-black/10 rounded-[62px] bg-white cursor-pointer focus:outline-none focus:border-black"
              >
                <option value="all">Chọn Tỉnh/thành phố</option>
                {provinces.map((province, index) => (
                  <option key={index} value={province.value}>{province.label}</option>
                ))}
              </select>

              <select 
                value={selectedDistrict}
                onChange={handleDistrictChange}
                disabled={selectedProvince === 'all'}
                className="w-full px-4 py-3 border border-black/10 rounded-[62px] bg-white cursor-pointer focus:outline-none focus:border-black disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="all">Chọn Quận/huyện</option>
                {districts.map((district, index) => (
                  <option key={index} value={district.value}>{district.label}</option>
                ))}
              </select>
            </div>

            {/* Store List */}
            <div className="max-h-[600px] overflow-y-auto pr-2">
              <div className="space-y-4">
                {filteredStores.map(store => (
                  <div 
                    key={store.id}
                    className={`border border-black/10 rounded-[20px] p-4 cursor-pointer hover:border-black transition-all ${
                      selectedStore?.id === store.id ? 'border-black bg-black/5' : ''
                    }`}
                    onClick={() => handleStoreClick(store)}
                  >
                    <h3 className="font-bold text-[16px] mb-2">{store.name}</h3>
                    <p className="text-[14px] text-black/60 mb-1">{store.address}</p>
                    <p className="text-[14px] text-black/60 mb-1">
                      <i className="fa fa-phone mr-2"></i>
                      {store.phone}
                    </p>
                    <p className="text-[14px] text-black/60 mb-3">
                      Thời gian hoạt động: {store.hours}
                    </p>
                    <a 
                      href={store.mapUrl}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[14px] text-black hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="fa fa-map-marker"></i>
                      <span>Chỉ đường</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Map */}
          <div className="w-[60%]">
            <div className="w-full h-[650px] rounded-[20px] overflow-hidden border border-black/10">
              <iframe 
                src={selectedStore?.mapEmbed || filteredStores[0]?.mapEmbed}
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
