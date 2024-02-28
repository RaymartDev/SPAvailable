import { useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import Image18 from '../img/image18.png';
import Image19 from '../img/image19.png';
import Image20 from '../img/image20.png';
import Image4 from '../img/image4.png';
import Image5 from '../img/image5.png';
import Image6 from '../img/image6.png';
import Image7 from '../img/image7.png';
import Image8 from '../img/image8.png';

interface Service {
  id: number;
  title: string;
  imageUrl: string;
}

const productsData: Service[] = [
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

function Products() {
  const [startIndex, setStartIndex] = useState<number>(0);

  const goToNextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % (productsData.length - 2));
  };

  const goToPrevSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? productsData.length - 3 : prevIndex - 1
    );
  };

  return (
    <div className="bg-white py-8 px-12 max-h-screen">
      <div>
        <h1 className="text-4xl font-semibold text-center mb-8 w-fit">
          Products
        </h1>
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={goToPrevSlide}
            className="mr-4 rounded-full border-2 border-black"
          >
            <GrFormPrevious size={50} />
          </button>
          <div className="flex gap-4">
            {productsData.slice(startIndex, startIndex + 3).map((service) => (
              <div
                key={service.id}
                className="service-card flex flex-col items-center justify-center"
                style={{ width: '400px', height: '400px' }}
              >
                <div className="h-full w-full overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover rounded-md "
                  />
                </div>
                <h2 className="text-xl font-semibold mt-2">{service.title}</h2>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={goToNextSlide}
            className="ml-4 rounded-full border-2 border-black"
          >
            <GrFormNext size={50} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;
