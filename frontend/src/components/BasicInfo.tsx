/* eslint-disable jsx-a11y/label-has-associated-control */
import { FaImages } from 'react-icons/fa';

interface BasicInfoProps {
  onNextClick: () => void;
}

function BasicInfo({ onNextClick }: BasicInfoProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-white flex flex-row justify-center gap-x-10 p-6">
        <div>
          <hr className="h-2 w-[300px] bg-[#41924B] rounded-full" />
          <h1 className="text-[#41924B]">Basic Info</h1>
        </div>
        <div>
          <hr className="h-2 w-[300px] bg-[#CCCCCC] rounded-full" />
        </div>
      </div>
      <div className="grid grid-cols-2 h-full items-center justify-center px-10 pt-5">
        <div className="card h-full flex flex-col justify-center px-8">
          <div className="rounded border-2 px-8 pt-5 pb-14 h-5/6">
            <div>
              <h1 className="font-semibold text-xl">
                Upload Spa Display Photo:
              </h1>
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
                    <h1 className="font-semibold text-xl">Browse Image</h1>
                    <p className="text-sm">Supports JPEG, JPG, PNG</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="card h-full flex flex-col ">
          <h1 className="text-4xl font-bold px-4">Basic Info</h1>
          <div className="flex flex-col px-5 pt-5 pb-12 h-full gap-y-4">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-lg font-semibold">Spa Name</h1>
              <input
                type="text"
                className="rounded px-3 py-2 border-2 bg-[#FCFCFB]"
              />
            </div>
            <div className="flex flex-col h-full gap-y-2">
              <h1 className="text-lg font-semibold">Description</h1>
              <textarea className="rounded px-3 py-2 border-2 bg-[#FCFCFB] resize-none h-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end px-16">
        <button
          type="button"
          className="bg-[#41924B] w-52 py-3 rounded-full font-semibold border-2 border-[#41924B] text-slate-50"
          onClick={onNextClick}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
export default BasicInfo;
