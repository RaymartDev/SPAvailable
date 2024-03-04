/* eslint-disable react/no-array-index-key */
import { Link } from 'react-router-dom';
import Image11 from '../img/image11.png';
import Image13 from '../img/image13.png';
import Image14 from '../img/image14.png';
import Image15 from '../img/image15.png';
import Image16 from '../img/image16.png';
import Image21 from '../img/image21.png';

function ProductComp({ searchProduct }: { searchProduct: string }) {
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
    {
      image: Image21,
      title: 'Blissful Haven Spa',
      address: '101 California Street Brgy 9, Caloocan City, Metro Manila',
    },
    {
      image: Image21,
      title: 'Blissful Haven Spa',
      address: '101 California Street Brgy 9, Caloocan City, Metro Manila',
    },
    {
      image: Image21,
      title: 'Blissful Haven Spa',
      address: '101 California Street Brgy 9, Caloocan City, Metro Manila',
    },
  ];

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchProduct.toLowerCase())
  );

  if (filteredItems.length === 0 && searchProduct) {
    return (
      <div className="p-10">
        <p className="text-2xl text-[#41924B] font-bold">No results found.</p>
      </div>
    );
  }

  if (searchProduct) {
    return (
      <>
        {items
          .filter((item) =>
            item.title.toLowerCase().includes(searchProduct.toLowerCase())
          )
          .map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border-2 p-2 mx-4 mt-4 hover:shadow-lg"
            >
              <div className="flex flex-col h-full cursor-pointer p-5 items-center justify-center ">
                <img
                  src={item.image}
                  className="object-cover w-full h-full rounded-3xl hover:scale-105 duration-500"
                  alt={item.title}
                  style={{ width: '100%', height: '250px' }}
                />
                <h1 className="font-bold text-2xl text-neutral-950 mt-5">
                  {item.title}
                </h1>
              </div>
            </div>
          ))}
      </>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 justify-center items-center">
      {items.map((item, index) => (
        <Link to="/about/product" key={index}>
          <div
            key={index}
            className="rounded-3xl border-2 p-2 mx-4 mt-4 hover:shadow-lg"
          >
            <div className="flex flex-col h-full cursor-pointer p-5 items-center justify-center ">
              <img
                src={item.image}
                className="object-cover w-full h-full rounded-3xl hover:scale-105 duration-500"
                alt={item.title}
                style={{ width: '100%', height: '250px' }}
              />
              <h1 className="font-bold text-2xl text-neutral-950 mt-5">
                {item.title}
              </h1>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductComp;
