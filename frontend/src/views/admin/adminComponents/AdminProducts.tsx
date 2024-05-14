import { FaSearch } from 'react-icons/fa';
import { FaArrowTrendUp, FaArrowRightLong } from 'react-icons/fa6';
import { GoPlus } from 'react-icons/go';
import Image11 from '../../../img/image11.png';
import Image13 from '../../../img/image13.png';
import Image14 from '../../../img/image14.png';

function AdminProducts() {
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
  ];

  return (
    <div className="flex flex-col space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex space-x-8">
          <h1 className="text-5xl font-bold">Products</h1>
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-5 transform -translate-y-1/2 text-black" />
            <input
              type="search"
              className="rounded-full py-3 pl-12 pr-5 w-full md:w-[450px] border-2 border-[#41924B]"
            />
          </div>
        </div>
        <div>
          <button
            type="button"
            className="bg-[#41924B] border-2 border-[#41924B] text-white rounded-full w-48 flex justify-center items-center font-semibold py-3"
          >
            ADD PRODUCT
            <p>
              <GoPlus size={20} />
            </p>
          </button>
        </div>
      </div>

      <div className="flex w-full">
        <div className="w-4/5">
          <div className="px-10 pb-10">
            <div className="grid grid-cols-3">
              {items.map((item, index) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className="rounded-3xl border-2 p-2 mx-4 mt-4 hover:shadow-lg bg-white"
                >
                  <div className="flex flex-col h-full cursor-pointer p-5 items-center justify-center ">
                    <img
                      src={item.image}
                      className="object-cover w-full h-full rounded-3xl"
                      alt={item.title}
                      style={{ width: '100%', height: '250px' }}
                    />
                    <h1 className="font-bold text-2xl text-neutral-950 mt-5">
                      {item.title}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/5 space-y-5">
          <div className="flex flex-col h-48 justify-between  border-2 rounded-lg shadow-lg bg-white">
            <div className="flex justify-between px-5 py-6">
              <div>
                <h1 className="font-bold text-2xl">Total Products</h1>
                <p>58</p>
              </div>
              <FaArrowTrendUp size={50} color="green" />
            </div>
            <div className="flex rounded-b-lg items-center justify-between bg-[#41924B] text-white py-4 px-5">
              <h1>View More</h1>
              <FaArrowRightLong size={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
