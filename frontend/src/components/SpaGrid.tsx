/* eslint-disable react/no-array-index-key */
import { useNavigate } from 'react-router-dom';
import Image11 from '../img/image11.png';
import Image13 from '../img/image13.png';
import Image14 from '../img/image14.png';
import Image15 from '../img/image15.png';
import Image16 from '../img/image16.png';
import Image21 from '../img/image21.png';
import StarRating from './StarRating';

function SpaGrid() {
  const navigate = useNavigate();

  const items = [
    {
      image: Image11,
      title: 'Mandarin Spa',
      address: 'Congressional Road Brgy 171, Caloocan City, Metro Manila',
    },
    {
      image: Image13,
      title: 'The Dhara Dhevi',
      address: 'Bagumbong Road Brgy 171, Caloocan City, Metro Manila',
    },
    {
      image: Image14,
      title: 'Big Cedar Lodge',
      address: 'Biglang Awa St Cor 11th Ave Catleya Caloocan, Metro Manila',
    },
    {
      image: Image15,
      title: 'Serene Sanctuary Spa',
      address: 'Rainbow Avenue Brgy 171, Caloocan City, Metro Manila',
    },
    {
      image: Image16,
      title: 'Rush Creek Spa',
      address: '18 Taylor Sheesh Road Brgy 91, Caloocan City, Metro Manila',
    },
    {
      image: Image21,
      title: 'Blissful Haven Spa',
      address: '101 California Street Brgy 9, Caloocan City, Metro Manila',
    },
  ];

  return (
    <>
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-3xl border-2 p-2 mx-4 mt-4 hover:shadow-lg"
        >
          <div className="flex flex-col h-full cursor-pointer p-5 ">
            <img
              src={item.image}
              className="object-cover w-full h-full rounded-3xl hover:scale-105 duration-500"
              alt={item.title}
              style={{ width: '100%', height: '250px' }}
            />
            <h1 className="font-bold text-2xl text-neutral-950 mt-5">
              {item.title}
            </h1>
            <p className="text-sm my-2">{item.address}</p>
            <StarRating totalStars={5} />
            <div className="flex items-center justify-center my-5">
              <button
                type="button"
                onClick={() => navigate('/spa/about')}
                className="rounded-full bg-[#41924B] font-semibold text-sm text-slate-50 py-3 px-10 hover:text-[#41924B] hover:bg-slate-50 hover:border-neutral-950 hover:border-[1px] border-green-800 border-[1px]"
              >
                SEE MORE
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default SpaGrid;
