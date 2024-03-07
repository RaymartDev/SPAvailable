/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Image11 from '../../img/image11.png';
import Image13 from '../../img/image13.png';
import Image14 from '../../img/image14.png';
import Image15 from '../../img/image15.png';
import Image16 from '../../img/image16.png';
import Image21 from '../../img/image21.png';

interface AddServiceModalProps {
  open: boolean;
  onClose: () => void;
}
function AddServiceModal({ open, onClose }: AddServiceModalProps) {
  const [selectedService, setSelectedService] = useState<number[]>([]);
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
  if (!open) return null;

  const handleServiceSelect = (index: number) => {
    const isSelected = selectedService.includes(index);
    if (isSelected) {
      setSelectedService(
        selectedService.filter((itemIndex) => itemIndex !== index)
      );
    } else {
      setSelectedService([...selectedService, index]);
    }
  };

  const selectedCount = selectedService.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-20 p-10 ">
      <div className="flex flex-col items-center w-full h-full bg-slate-50 rounded-2xl">
        <div className="flex justify-between items-center w-full h-fit pl-10 pr-5 py-5 shadow-lg">
          <div className="flex items-end gap-x-5 sticky justify-start">
            <h1 className="text-3xl font-bold">Select Service</h1>
            <p className="text-md font-semibold">Selected: {selectedCount}</p>
          </div>
          <div>
            <button type="button" onClick={onClose} className="p-3">
              <IoClose size={35} />
            </button>
          </div>
        </div>

        <div className="overflow-y-scroll px-10 pb-10">
          <div className="grid grid-cols-4">
            {items.map((item, index) => (
              <div
                key={index}
                className={`rounded-3xl border-4 p-2 mx-4 mt-4 hover:shadow-lg ${selectedService.includes(index) ? 'border-[#41924B]' : ''}`}
                onClick={() => handleServiceSelect(index)}
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
          </div>
        </div>

        <div className="flex justify-end items-center w-full h-fit py-3 pr-10 bg-[#41924B] rounded-b-2xl">
          <button
            type="button"
            className="px-16 py-2 font-semibold rounded-full bg-white"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddServiceModal;
