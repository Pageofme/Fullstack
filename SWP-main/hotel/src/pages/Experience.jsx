import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import '../assets/styles/Explore.css';
import '../assets/styles/RoomCarousel.css';
import hue from '../assets/images/hue.jpg';
import { useNavigate } from 'react-router-dom';

const experienceDestinations = [
  { name: 'Huế', activities: '12 trải nghiệm', img: hue },
  { name: 'Hội An', activities: '15 trải nghiệm', img: hue },
  { name: 'Sapa', activities: '8 trải nghiệm', img: hue },
  { name: 'Phú Quốc', activities: '10 trải nghiệm', img: hue },
  { name: 'Hà Giang', activities: '7 trải nghiệm', img: hue },
  { name: 'Đà Lạt', activities: '14 trải nghiệm', img: hue },
];

const ExploreExperiences = () => {
  return (
    <div className="explore-container">
      <h2 className="explore-title">Khám phá trải nghiệm</h2>
      <p className="explore-subtitle">Những hoạt động độc đáo đang chờ bạn khám phá</p>

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
          {experienceDestinations.map((place, index) => (
            <SwiperSlide key={index}>
              <div className="explore-card">
                <img src={place.img} alt={place.name} className="explore-img" />
                <div className="explore-name">{place.name}</div>
                <div className="explore-stays">{place.activities}</div>
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

const ExperienceCarousel = ({ title, experiences }) => {
  const navigate = useNavigate();
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

  const handleExperienceClick = (homestayId) => {
    navigate(`/rooms/homestay/${homestayId}`);
  };

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">{title}</h2>
      <div className="relative">
        <button className="nav-button nav-left" onClick={() => scroll('left')}>
          ❮
        </button>
        <div ref={scrollRef} className="carousel-scroll">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="room-card"
              onClick={() => handleExperienceClick(experience.homestayId)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={experience.images?.[0]?.imageUrl}
                alt={experience.specialNotes || 'Trải Nghiệm'}
                className="room-image"
              />
              <div className="room-info">
                <h3 className="room-title">{experience.specialNotes}</h3>
                <p className="room-location">{experience.price?.toLocaleString('vi-VN')} VND</p>
              </div>
            </div>
          ))}
        </div>
        <button className="nav-button nav-right" onClick={() => scroll('right')}>
          ❯
        </button>
      </div>
    </div>
  );
};
const ExperienceContent = () => {
  const [experiences, setExperiences] = useState([]);
  const [typeExperiences, setTypeExperiences] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data song song
        const [experiencesRes, typesRes] = await Promise.all([
          axios.get('http://localhost:8080/api/experiences'),
          axios.get('http://localhost:8080/api/experience-types')
        ]);

        // Tạo bản đồ typeId -> typeName
        const typeMap = typesRes.data.reduce((map, type) => {
          map[type.id] = type.experienceName;
          return map;
        }, {});

        // Nhóm experiences theo type
        const groupedExperiences = experiencesRes.data.reduce((groups, experience) => {
          const typeName = typeMap[experience.typeId] || 'Khác';
          if (!groups[typeName]) {
            groups[typeName] = [];
          }
          groups[typeName].push(experience);
          return groups;
        }, {});

        setExperiences(experiencesRes.data);
        setTypeExperiences(groupedExperiences);
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu:', err);
        setError('Không thể tải dữ liệu trải nghiệm. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-10">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="px-6 py-10">
      <ExploreExperiences />
      <div className="mt-10">
        {Object.keys(typeExperiences).map((type) => (
          <ExperienceCarousel
            key={type}
            title={`Trải nghiệm ${type}`}
            experiences={typeExperiences[type]}
          />
        ))}
      </div>
    </div>
  );
};

const Experience = () => {
  return <ExperienceContent />;
};

export default Experience;