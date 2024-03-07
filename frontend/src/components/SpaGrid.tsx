/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import { useNavigate } from 'react-router-dom';
import Image11 from '../img/image11.png';
import Image13 from '../img/image13.png';
import Image14 from '../img/image14.png';
import Image15 from '../img/image15.png';
import Image16 from '../img/image16.png';
import Image21 from '../img/image21.png';
import StarRating from './StarRating';
import DefaultPp from '../img/defaultPp.png';

function SpaGrid({ searchSpa }: { searchSpa: string }) {
  const navigate = useNavigate();

  const items = [
    {
      image: Image11,
      title: 'Mandarin Spa',
      time: '8am - 10pm',
      profile: DefaultPp,
      user: 'James Allan',
      address: 'Congressional Road Brgy 171, Caloocan City, Metro Manila',
    },
    {
      image: Image13,
      title: 'The Dhara Dhevi',
      time: '8am - 10pm',
      profile: DefaultPp,
      user: 'James Allan',
      address: 'Bagumbong Road Brgy 171, Caloocan City, Metro Manila',
    },
    {
      image: Image14,
      title: 'Big Cedar Lodge',
      time: '8am - 10pm',
      profile: DefaultPp,
      user: 'James Allan',
      address: 'Biglang Awa St Cor 11th Ave Catleya Caloocan, Metro Manila',
    },
    {
      image: Image15,
      title: 'Serene Sanctuary Spa',
      time: '8am - 10pm',
      profile: DefaultPp,
      user: 'James Allan',
      address: 'Rainbow Avenue Brgy 171, Caloocan City, Metro Manila',
    },
    {
      image: Image16,
      title: 'Rush Creek Spa',
      time: '8am - 10pm',
      profile: DefaultPp,
      user: 'James Allan',
      address: '18 Taylor Sheesh Road Brgy 91, Caloocan City, Metro Manila',
    },
    {
      image: Image21,
      title: 'Blissful Haven Spa',
      time: '8am - 10pm',
      profile: DefaultPp,
      user: 'James Allan',
      address: '101 California Street Brgy 9, Caloocan City, Metro Manila',
    },
  ];

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchSpa.toLowerCase())
  );

  if (filteredItems.length === 0 && searchSpa) {
    return (
      <div className="p-10">
        <p className="text-2xl text-[#41924B] font-bold">No results found.</p>
      </div>
    );
  }

  if (searchSpa) {
    return (
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 justify-center items-center">
        {items
          .filter((item) =>
            item.title.toLowerCase().includes(searchSpa.toLowerCase())
          )
          .map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border-2 p-2 mx-4 mt-4 hover:shadow-lg w"
              onClick={() => navigate('/spa/about')}
            >
              <div className="flex flex-col h-full cursor-pointer p-5 ">
                <div className="w-full h-[300px] overflow-hidden">
                  <img
                    src={item.image}
                    className="object-cover w-full h-full rounded-3xl  hover:scale-125 transition-all ease-in-out delay-150  duration-500"
                    alt={item.title}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <h1 className="font-bold text-2xl text-neutral-950 mt-5">
                    {item.title}
                  </h1>
                  <h1 className="mt-5 text-[#41924B] font-semibold">
                    {item.time}
                  </h1>
                </div>
                <div className="flex items-center gap-x-2">
                  <img
                    src={item.profile}
                    alt=""
                    className="size-8 rounded-full object-cover object-center border-[1px] border-[#41924B]"
                  />
                  <h1>{item.user}</h1>
                </div>
                <p className="text-sm my-2">{item.address}</p>
                <StarRating totalStars={5} />
                <div className="flex items-center justify-center my-5">
                  <button
                    type="button"
                    onClick={() => navigate('/spa/about')}
                    className="transition-all ease-in-out delay-150 rounded-full bg-[#41924B] font-semibold text-sm text-slate-50 py-3 px-10 hover:text-[#41924B] hover:bg-slate-50 hover:border-neutral-950 hover:border-[1px] border-green-800 border-[1px]"
                  >
                    SEE MORE
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 justify-center items-center">
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-3xl border-2 p-2 mx-4 mt-4 hover:shadow-lg"
          onClick={() => navigate('/spa/about')}
        >
          <div className="flex flex-col h-full cursor-pointer p-5 gap-y-2">
            <div className="w-full h-[300px] overflow-hidden rounded-3xl">
              <img
                src={item.image}
                className="object-cover w-full h-full rounded-3xl hover:scale-125 transition-all ease-in-out delay-150 duration-500"
                alt={item.title}
              />
            </div>
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-2xl text-neutral-950 mt-5">
                {item.title}
              </h1>
              <h1 className="mt-5 text-[#41924B] font-semibold">{item.time}</h1>
            </div>
            <div className="flex items-center gap-x-2">
              <img
                src={item.profile}
                alt=""
                className="size-8 rounded-full object-cover object-center border-[1px] border-[#41924B]"
              />
              <h1>{item.user}</h1>
            </div>

            <p className="text-sm">{item.address}</p>
            <StarRating totalStars={5} />
            <div className="flex items-center justify-center mt-5">
              <button
                type="button"
                onClick={() => navigate('/spa/about')}
                className="transition-all ease-in-out delay-150 rounded-full bg-[#41924B] font-semibold text-sm text-slate-50 py-3 px-10 hover:text-[#41924B] hover:bg-slate-50 hover:border-neutral-950 hover:border-[1px] border-green-800 border-[1px]"
              >
                SEE MORE
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SpaGrid;
