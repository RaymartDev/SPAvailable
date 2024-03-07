/* eslint-disable jsx-a11y/label-has-associated-control */
import { FaImages, FaTrash } from 'react-icons/fa';
import Required from './Requred';

interface SpaInfoProps {
  onReturnClick: () => void;
  setSpaAddress: React.Dispatch<React.SetStateAction<string>>;
  setSpaEmail: React.Dispatch<React.SetStateAction<string>>;
  setSpaContact: React.Dispatch<React.SetStateAction<string>>;
  setCoverPhoto: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  address: string;
  email: string;
  contact: string;
  coverPhoto: string;
}

function SpaInfo({
  onReturnClick,
  setSpaAddress,
  setSpaEmail,
  setSpaContact,
  setCoverPhoto,
  handleSubmit,
  address,
  email,
  contact,
  coverPhoto,
}: SpaInfoProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setCoverPhoto(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCoverPhoto = () => {
    setCoverPhoto('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white flex flex-row justify-center gap-x-10 p-6">
        <div>
          <hr className="h-2 w-[300px] bg-[#CCCCCC] rounded-full" />
        </div>
        <div>
          <hr className="h-2 w-[300px] bg-[#41924B] rounded-full" />
          <h1 className="text-[#41924B]">Spa Info</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center justify-center px-10 pt-5">
        <div className="card h-full flex flex-col justify-center px-8">
          <div className="rounded border-2 px-8 pt-5 pb-14 h-5/6">
            <div>
              <h1 className="font-semibold text-xl">Upload Spa Cover Photo:</h1>
            </div>
            <div className="flex justify-center items-center px-10 py-5 w-full h-full">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="coverPhoto"
                onChange={handleFileChange}
              />
              <div className="border-dashed border-2 w-full h-full flex items-center justify-center relative bg-[#FCFCFB]">
                {coverPhoto ? (
                  <>
                    <img
                      src={coverPhoto}
                      alt="Spa Cover"
                      className="w-full h-[410px] object-cover object-center"
                    />
                    <FaTrash
                      color="red"
                      className="absolute bottom-2 right-1 cursor-pointer"
                      onClick={removeCoverPhoto}
                      size={25}
                    />
                  </>
                ) : (
                  <label
                    htmlFor="coverPhoto"
                    className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                  >
                    <FaImages size={60} color="#41924B" />
                    <h1 className="font-semibold text-xl">
                      Click to Browse Image
                    </h1>
                    <p className="text-sm">Supports JPEG, JPG, PNG</p>
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="card h-full w-full flex flex-col items-center md:items-start ">
          <h1 className="text-4xl font-bold px-4">Spa Info</h1>
          <div className="flex flex-col px-5 pt-5 pb-12 h-full w-full gap-y-4">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-lg font-semibold">
                Email <Required />
              </h1>
              <input
                type="email"
                className="rounded px-3 py-2 border-2 bg-[#FCFCFB]"
                value={email}
                onChange={(e) => setSpaEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <h1 className="text-lg font-semibold">Contact Number</h1>
              <div className="flex border-2 rounded bg-[#FCFCFB]">
                <div className="flex w-1/12 justify-center items-center">
                  +639
                </div>
                <input
                  type="tel"
                  className="ml-1 px-1 py-2 w-11/12 bg-transparent"
                  value={contact}
                  onChange={(e) => {
                    const allowedChars = e.target.value.replace(/\D/g, '');
                    setSpaContact(allowedChars.slice(0, 10));
                  }}
                  maxLength={9}
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <h1 className="text-lg font-semibold">
                Business Hours <Required />
              </h1>
              <div className="flex">
                <div className="flex w-1/2 flex-col gap-y-1">
                  <h1 className="">Open Time</h1>
                  <input
                    type="time"
                    className="border-2 rounded px-3 py-2 bg-[#FCFCFB] w-1/2 "
                  />
                </div>
                <div className="flex w-1/2 flex-col gap-y-2">
                  <h1 className="">Close Time</h1>
                  <input
                    type="time"
                    className="border-2 rounded px-3 py-2 bg-[#FCFCFB] w-1/2 "
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col h-full gap-y-2">
              <h1 className="text-lg font-semibold">
                Address <Required />
              </h1>
              <textarea
                className="rounded px-3 py-2 border-2 bg-[#FCFCFB] resize-none h-3/4"
                value={address}
                onChange={(e) => setSpaAddress(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center md:justify-end px-16 gap-x-2">
        <button
          type="button"
          className="bg-white w-52 py-3 rounded-full font-semibold border-2 border-[#41924B] text-[#41924B]"
          onClick={onReturnClick}
        >
          PREV
        </button>
        <button
          type="button"
          className="bg-[#41924B] w-52 py-3 rounded-full font-semibold border-2 border-[#41924B] text-slate-50"
          onClick={handleSubmit}
        >
          ADD SPA
        </button>
      </div>
    </div>
  );
}
export default SpaInfo;
