import { Swiper, SwiperSlide } from "swiper/react";
import PropTypes from 'prop-types';
import { Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";



const GallerySlider = ({images}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="w-full relative wrap mb-20 mx-auto">
      {/* Main Swiper */}
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        spaceBetween={10}
        className="w-full h-[500px]"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-[500px] object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <div className="absolute left-0 right-0 -bottom-12 flex justify-center">
        <div className="w-[700px] overflow-hidden">
          <Swiper
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper}
            slidesPerView={5}
            freeMode
            watchSlidesProgress
            watchSlidesVisibility
            spaceBetween={10}
            className="cursor-pointer"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Thumb ${index + 1}`}
                  className="w-full h-[80px] object-cover border rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
GallerySlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GallerySlider;

