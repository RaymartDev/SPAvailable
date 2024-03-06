/* eslint-disable jsx-a11y/label-has-associated-control */
import { FaImages } from 'react-icons/fa';
import Required from './Requred';

interface SpaInfoProps {
  onReturnClick: () => void;
  setSpaAddress: React.Dispatch<React.SetStateAction<string>>;
  setSpaEmail: React.Dispatch<React.SetStateAction<string>>;
  setSpaContact: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  address: string;
  email: string;
  contact: string;
}

function SpaInfo({
  onReturnClick,
  setSpaAddress,
  setSpaEmail,
  setSpaContact,
  handleSubmit,
  address,
  email,
  contact,
}: SpaInfoProps) {
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
      <div className="grid grid-cols-2 h-full items-center justify-center px-10 pt-5">
        <div className="card h-full flex flex-col justify-center px-8">
          <div className="rounded border-2 px-8 pt-5 pb-14 h-5/6">
            <div>
              <h1 className="font-semibold text-xl">Upload Spa Cover Photo:</h1>
            </div>
            <div className="flex justify-center items-center px-10 py-5 h-full">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="displayPhoto"
              />
              <div className="border-dashed border-2 w-full h-full flex items-center justify-center">
                <label
                  htmlFor="displayPhoto"
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                >
                  <div className="flex justify-center">
                    <FaImages size={60} color="#41924B" />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <h1 className="font-semibold text-xl">
                      Click to Browse Image
                    </h1>
                    <p className="text-sm">Supports JPEG, JPG, PNG</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="card h-full flex flex-col ">
          <h1 className="text-4xl font-bold px-4">Spa Info</h1>
          <div className="flex flex-col px-5 pt-5 pb-12 h-full gap-y-4">
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">
                Email <Required />
              </h1>
              <input
                type="email"
                className="rounded px-3 py-2 border-2 bg-[#FCFCFB] w-9/12"
                value={email}
                onChange={(e) => setSpaEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">Contact Number</h1>
              <div className="flex w-9/12 border-2 rounded bg-[#FCFCFB]">
                <div className="flex w-1/12 items-center">+63</div>
                <input
                  type="tel"
                  className="ml-1 px-1 py-2 w-11/12 bg-transparent"
                  value={contact}
                  maxLength={10}
                  onChange={(e) => setSpaContact(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">
                Address <Required />
              </h1>
              <input
                type="text"
                className="rounded px-3 py-2 border-2 bg-[#FCFCFB] w-9/12"
                value={address}
                onChange={(e) => setSpaAddress(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end px-16 gap-x-2">
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
