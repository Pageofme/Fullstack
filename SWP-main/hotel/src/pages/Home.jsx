import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import hue from '../assets/images/hue.jpg';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import '../assets/styles/RoomCarousel.css';
import '../assets/styles/Explore.css';
import { Link } from 'react-router-dom';

const destinations = [
  { name: 'TP. Hồ Chí Minh', stays: '6.252 chỗ nghỉ', img: hue },
  { name: 'Đà Nẵng', stays: '2.047 chỗ nghỉ', img: hue },
  { name: 'Vũng Tàu', stays: '2.176 chỗ nghỉ', img: hue },
  { name: 'Hà Nội', stays: '5.347 chỗ nghỉ', img: hue },
  { name: 'Đà Lạt', stays: '1.899 chỗ nghỉ', img: hue },
  { name: 'Nha Trang', stays: '1.084 chỗ nghỉ', img: hue },
];

// ExploreVietnam Component
const ExploreVietnam = () => {
  return (
    <div className="explore-container">
      <h2 className="explore-title">Khám phá Việt Nam</h2>
      <p className="explore-subtitle">Các điểm đến phổ biến này có nhiều điều chờ đón bạn</p>

      <div className="explore-slider-wrapper">
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {destinations.map((place, index) => (
            <SwiperSlide key={index}>
              <div className="explore-card">
                <img src={place.img} alt={place.name} className="explore-img" />
                <div className="explore-name">{place.name}</div>
                <div className="explore-stays">{place.stays}</div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </Swiper>
      </div>
    </div>
  );
};

// RoomCarousel Component
const RoomCarousel = ({ title, homestays }) => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">{title}</h2>
      <div className="relative">
        <button className="nav-button nav-left" onClick={() => scroll('left')}>
          ❮
        </button>
        <div ref={scrollRef} className="carousel-scroll">
          {homestays.map((homestay, index) => (
            <Link
              key={homestay.id || index}
              to={`/offer?homestayId=${homestay.id}`} // Chuyển hướng đến Offers với homestayId
              className="room-card"
              style={{ textDecoration: 'none' }}
            >
              <img
                src={homestay.images?.[0]?.imageUrl || '/images/default.jpg'}
                alt={homestay.homestayName || 'Homestay'}
                className="room-image"
              />
              <div className="room-info">
                <h3 className="room-title">{homestay.homestayName}</h3>
                <p className="room-location">{homestay.location}</p>
              </div>
            </Link>
          ))}
        </div>
        <button className="nav-button nav-right" onClick={() => scroll('right')}>
          ❯
        </button>
      </div>
    </div>
  );
};

const HomeContent = () => {
  const [homestays, setHomestays] = useState([]);
  const [locationHomestays, setLocationHomestays] = useState({});

  useEffect(() => {
    const fetchHomestays = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/homestays');
        setHomestays(response.data);
        
        // Tạo một object chứa homestays theo từng location
        const locations = ['Đà Nẵng', 'Hà Nội', 'Đà Lạt', 'Phú Quốc', 'Hà Nội'];
        const locationData = {};
        
        for (const location of locations) {
          try {
            const res = await axios.get(`http://localhost:8080/api/homestays/location?location=${location}`);
            locationData[location] = res.data;
          } catch (error) {
            console.error(`Failed to fetch homestays for ${location}:`, error);
            locationData[location] = [];
          }
        }
        
        setLocationHomestays(locationData);
      } catch (error) {
        console.error('Failed to fetch homestays:', error);
      }
    };

    fetchHomestays();
  }, []);

  return (
    <div className="px-6 py-10">
      <ExploreVietnam />
      <div className="mt-10">
        {Object.keys(locationHomestays).map((location) => (
          <RoomCarousel 
            key={location} 
            title={`Chỗ ở tại ${location}`} 
            homestays={locationHomestays[location].slice(0, 10)} 
          />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  return <HomeContent />; 
};

export default Home;