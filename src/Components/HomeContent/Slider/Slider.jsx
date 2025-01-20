import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

function Slider() {
  // Fake data for 3 slides
  const slideData = [
    {
      title: 'Luxury Apartment in City Center',
      description: 'Spacious 3-bedroom apartment with city views.',
      imageUrl: 'https://luxury-apartments-in-top-city-center-varna-2.varna-hotels.com/data/Imgs/OriginalPhoto/12539/1253902/1253902444/img-luxury-apartments-in-top-city-center-2-varna-1.JPEG',
    },
    {
      title: 'Modern Loft in Downtown',
      description: 'A contemporary loft with an open floor plan.',

      imageUrl: 'https://img.peerspace.com/image/upload/c_crop,g_custom/g_auto,c_fill,q_auto,f_auto,fl_progressive:steep,w_1200,ar_1/faxfx22b3pnhainxucdg',
    },
    {
      title: 'Cozy Apartment by the Park',
      description: '2-bedroom apartment with a beautiful park view.',
      imageUrl: 'https://cozy-apartment-near-park.hotelschisinau.com/data/Pics/OriginalPhoto/14646/1464673/1464673033/chisinau-pic-2.JPEG',
    },
  ];

  return (
    <div className="h-[80vh]">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        className="h-full"
      >
        {slideData.map((slide, index) => (
          <SwiperSlide key={index}>
            <section className="scroll-section relative h-full flex flex-col md:flex-row">
              {/* Right content */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-8 bg-accentA/10">
                <div className="xl:pl-[10%] float-animation">
                  <h2 className="mt-4 text-5xl md:text-5xl xl:text-6xl  font-bold leading-none bg-gradient-to-r from-textT to-textT bg-clip-text text-transparent">
                    {slide.title}
                  </h2>
                  <p className="mt-6 text-textT/70 text-lg leading-relaxed">
                    {slide.description}
                  </p>
                  <button className="mt-8 px-6 py-3 bg-gray-50 dark:bg-accentA/30 hover:bg-white/20 rounded-full text-sm  font-medium transition-all duration-300 hover:tracking-wider">
                    Learn More →
                  </button>
                </div>
              </div>
              {/* Left content */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden group shine-effect">
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-gray-900/40 to-gray-600/50  transition-opacity duration-500 group-hover:opacity-0"></div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slider;
