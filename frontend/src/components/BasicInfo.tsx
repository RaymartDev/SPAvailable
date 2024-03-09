/* eslint-disable jsx-a11y/label-has-associated-control */
import { FaImages, FaTrash } from 'react-icons/fa';
import Required from './Requred';
import { useToast } from '../hooks/useToast';

interface BasicInfoProps {
  onNextClick: () => void;
  setSpaName: React.Dispatch<React.SetStateAction<string>>;
  setSpaDesc: React.Dispatch<React.SetStateAction<string>>;
  setDisplayPhoto: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  desc: string;
  displayPhoto: string;
}

function BasicInfo({
  onNextClick,
  setSpaName,
  setSpaDesc,
  setDisplayPhoto,
  name,
  desc,
  displayPhoto,
}: BasicInfoProps) {
  const { showErrorToast } = useToast();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        showErrorToast('File is too large. Please upload 3MB or less.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setDisplayPhoto(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

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
            <div className="flex justify-center items-center px-10 py-5 w-full h-full">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="displayPhoto"
                onChange={handleFileChange}
              />
              <div className="border-dashed border-2 w-full h-full flex items-center justify-center relative bg-[#FCFCFB]">
                {displayPhoto ? (
                  <>
                    <img
                      src={displayPhoto}
                      alt="Spa Cover"
                      className="w-full h-[410px] object-cover object-center"
                    />
                    <FaTrash
                      color="red"
                      className="absolute bottom-2 right-1 cursor-pointer border-2 bg-white rounded-full p-2"
                      onClick={() => setDisplayPhoto('')}
                      size={40}
                    />
                  </>
                ) : (
                  <label
                    htmlFor="displayPhoto"
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
        <div className="card h-full flex flex-col ">
          <h1 className="text-4xl font-bold px-4">Basic Info</h1>
          <div className="flex flex-col px-5 pt-5 pb-12 h-full gap-y-4">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-lg font-semibold">
                Spa Name <Required />
              </h1>
              <input
                type="text"
                className="rounded px-3 py-2 border-2 bg-[#FCFCFB]"
                value={name}
                onChange={(e) => setSpaName(e.target.value)}
              />
            </div>
            <div className="flex flex-col h-full gap-y-2">
              <h1 className="text-lg font-semibold">
                Description <Required />
              </h1>
              <textarea
                className="rounded px-3 py-2 border-2 bg-[#FCFCFB] resize-none h-full"
                value={desc}
                onChange={(e) => setSpaDesc(e.target.value)}
              />
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
