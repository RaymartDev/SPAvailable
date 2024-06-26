/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import Image18 from '../img/image18.png';
import Image19 from '../img/image19.png';
import Image20 from '../img/image20.png';
import Image4 from '../img/image4.png';
import Image5 from '../img/image5.png';
import Image6 from '../img/image6.png';
import Image7 from '../img/image7.png';
import Image8 from '../img/image8.png';

interface Product {
  id: number;
  title: string;
  imageUrl: string;
}

const productsData: Product[] = [
  {
    id: 1,
    title: 'Massage Therapy',
    imageUrl: Image20,
  },
  {
    id: 2,
    title: 'Facial Treatments',
    imageUrl: Image19,
  },
  {
    id: 3,
    title: 'Body Treatments',
    imageUrl: Image18,
  },
  {
    id: 4,
    title: 'Traditional Ayurvedic Treatments',
    imageUrl: Image4,
  },
  {
    id: 5,
    title: 'Ayurveda',
    imageUrl: Image5,
  },
  {
    id: 6,
    title: 'Deep tissue massage',
    imageUrl: Image6,
  },
  {
    id: 7,
    title: 'Hot Stone Massage',
    imageUrl: Image7,
  },
  {
    id: 8,
    title: 'Aromatherapy',
    imageUrl: Image8,
  },
];

function ProductSwiper() {
  return (
    <div className="bg-white py-8 px-12 max-h-screen ">
      <h1 className="text-4xl font-semibold text-center mb-8 w-fit">
        Our Products
      </h1>
      <div className="border-b-4 border-black pb-10">
        <Swiper
          effect="coverflow"
          grabCursor
          loop
          centeredSlides
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
              coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 150,
                modifier: 1,
                slideShadows: false,
              },
            },
            800: {
              slidesPerView: 2,
              spaceBetween: 20,
              coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: false,
              },
            },
            1080: {
              slidesPerView: 3,
              spaceBetween: 30,
              coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 250,
                modifier: 1,
                slideShadows: false,
              },
            },
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
          pagination={{ clickable: true }}
        >
          {productsData.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="flex flex-col pb-20 items-center justify-center">
                <div className="bg-[#41924B] rounded-xl flex flex-col items-center justify-center">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="h-[300px] w-[400px] object-cover rounded-t-xl"
                  />
                  <h1 className="text-xl font-semibold text-white py-3">
                    {product.title}
                  </h1>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="slider-controller">
            <div className="swiper-button-prev slider-arrow" />
            <div className="swiper-button-next slider-arrow" />
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default ProductSwiper;
