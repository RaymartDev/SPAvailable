import { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import Image15 from '../../../img/image15.png';

interface SpaModalProps {
  onCancel: () => void;
}

function SpaModal({ onCancel }: SpaModalProps) {
  const [image, setImage] = useState<string>(Image15);
  const [contactNumber, setContactNumber] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = URL.createObjectURL(e.target.files[0]);
      setImage(selectedImage);
    }
  };

  const handleAddImageClick = () => {
    document.getElementById('fileInput')?.click();
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setContactNumber(value);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center bg-white justify-center rounded-2xl shadow-lg w-1/3 h-4/5 ">
        <div className="w-full h-1/3">
          <button
            type="button"
            onClick={handleAddImageClick}
            className="h-full w-full flex relative items-center justify-center"
          >
            <img
              src={image}
              alt=""
              className="object-cover w-full h-full rounded-t-2xl"
            />
            <div className="absolute">
              <IoIosAdd size={60} className="rounded bg-white" />
            </div>
          </button>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="flex flex-col justify-center items-center space-y-5 w-full h-2/3 px-10">
          <div className="flex flex-col space-y-3 w-full">
            <div className="flex items-center space-x-5">
              <h1 className="w-1/5 font-semibold">Spa Name</h1>
              <input
                type="text"
                className="rounded border-stone-950 border p-2 w-4/5"
              />
            </div>
            <div className="flex items-center space-x-5">
              <h1 className="w-1/5 font-semibold">Contact Number</h1>
              <div className="flex items-center w-4/5 rounded border-stone-950 border">
                <p className="px-2">+639</p>
                <input
                  type="tel"
                  className=" p-2 w-full"
                  value={contactNumber}
                  onChange={handleContactChange}
                />
              </div>
            </div>
            <div className="flex items-center space-x-5">
              <h1 className="w-1/5 font-semibold">Address</h1>
              <input
                type="text"
                className="rounded border-stone-950 border p-2 w-4/5"
              />
            </div>
            <div className="flex space-x-5">
              <h1 className="w-1/5 flex items-start font-semibold">
                Description
              </h1>
              <textarea className="h-48 rounded border-stone-950 border p-2 w-4/5 resize-none" />
            </div>
          </div>
          <div className="flex space-x-4 w-full justify-end ">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onCancel();
              }}
              className="bg-white text-black border-2 border-black hover:bg-red-900 hover:text-white rounded-lg px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-[#41924B] text-white border-2 border-black hover:bg-green-900 rounded-lg px-4 py-2"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpaModal;
