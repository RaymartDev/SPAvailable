/* eslint-disable jsx-a11y/label-has-associated-control */
import { FaImages, FaTrash } from 'react-icons/fa';
import Required from './Requred';
import { useToast } from '../hooks/useToast';

interface SpaInfoProps {
  onReturnClick: () => void;
  setFormData: (formData: {
    spaName: string;
    spaDesc: string;
    spaEmail: string;
    spaContact: string;
    spaAddress: string;
    spaCity: string;
    coverPhoto: string;
    displayPhoto: string;
    openTime: string;
    closeTime: string;
  }) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  formData: {
    spaName: string;
    spaDesc: string;
    spaEmail: string;
    spaContact: string;
    spaAddress: string;
    spaCity: string;
    coverPhoto: string;
    displayPhoto: string;
    openTime: string;
    closeTime: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

function SpaInfo({
  onReturnClick,
  setFormData,
  handleSubmit,
  formData,
  handleChange,
}: SpaInfoProps) {
  const { showErrorToast } = useToast();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        showErrorToast('File is too large. Please upload 4MB or less.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setFormData({
          ...formData,
          coverPhoto: base64String,
        });
      };
      reader.readAsDataURL(file);
    }
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
            <div className="w-full flex mb-5">
              <h1 className="font-semibold text-xl">Upload Spa Cover Photo:</h1>
            </div>
            <div className="flex justify-center items-center px-10 pb-5 w-full h-full">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="coverPhoto"
                onChange={handleFileChange}
              />
              <div className="border-dashed border-2 w-full h-full flex items-center justify-center relative bg-[#FCFCFB]">
                {formData.coverPhoto ? (
                  <>
                    <img
                      src={formData.coverPhoto}
                      alt="Spa Cover"
                      className="w-full h-full object-cover object-center"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          coverPhoto: '',
                        })
                      }
                      className="absolute bottom-2 right-1 cursor-pointer border-2 bg-white rounded-full p-2"
                    >
                      <FaTrash color="red" size={20} />
                    </button>
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
          <div className="flex flex-col px-5 pt-5 pb-14 h-full w-full gap-y-4">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-lg font-semibold">
                Email <Required />
              </h1>
              <input
                type="email"
                name="spaEmail"
                className="rounded px-3 py-2 border-2 bg-[#FCFCFB]"
                value={formData.spaEmail}
                onChange={handleChange}
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
                  name="spaContact"
                  value={formData.spaContact}
                  onChange={(e) => {
                    const allowedChars = e.target.value.replace(/\D/g, '');
                    setFormData({
                      ...formData,
                      spaContact: allowedChars.slice(0, 10),
                    });
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
                    name="openTime"
                    value={formData.openTime}
                    onChange={handleChange}
                    className="border-2 rounded px-3 py-2 bg-[#FCFCFB] w-1/2 "
                  />
                </div>
                <div className="flex w-1/2 flex-col gap-y-2">
                  <h1 className="">Closed Time</h1>
                  <input
                    type="time"
                    name="closeTime"
                    value={formData.closeTime}
                    onChange={(e) => {
                      if (!formData.openTime) {
                        e.preventDefault();
                        return;
                      }
                      handleChange(e);
                    }}
                    className="border-2 rounded px-3 py-2 bg-[#FCFCFB] w-1/2 "
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col h-full gap-y-2">
              <h1 className="text-lg font-semibold">
                City <Required />
              </h1>
              <input
                className="rounded px-3 py-2 border-2 bg-[#FCFCFB] resize-none h-3/4"
                name="spaCity"
                value={formData.spaCity}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col h-full gap-y-2">
              <h1 className="text-lg font-semibold">
                Address <Required />
              </h1>
              <textarea
                className="rounded px-3 py-2 border-2 bg-[#FCFCFB] resize-none h-3/4"
                name="spaAddress"
                value={formData.spaAddress}
                onChange={handleChange}
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
