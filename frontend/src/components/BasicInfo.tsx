import { FaImages, FaTrash } from 'react-icons/fa';
import Required from './Requred';
import { useToast } from '../hooks/useToast';

interface BasicInfoProps {
  onNextClick: () => void;
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

function BasicInfo({
  onNextClick,
  setFormData,
  formData,
  handleChange,
}: BasicInfoProps) {
  const { showErrorToast } = useToast();

  const handleFileChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        showErrorToast('File is too large. Please upload 3MB or less.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (ctx) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const newReader = new FileReader();
                  newReader.onloadend = () => {
                    const base64String = newReader.result as string;
                    setFormData({
                      ...formData,
                      displayPhoto: base64String,
                    });
                  };
                  newReader.readAsDataURL(blob);
                }
              },
              'image/webp',
              0.7
            );
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col min-h-full max-w-screen-2xl mx-auto">
      <div className="bg-white flex flex-col md:flex-row justify-center gap-x-10 p-6">
        <div className="w-full md:w-auto">
          <hr className="h-2 w-full md:w-[300px] bg-[#41924B] rounded-full" />
          <h1 className="text-[#41924B] text-center md:text-left">
            Basic Info
          </h1>
        </div>
        <div className="hidden md:block">
          <hr className="h-2 w-[300px] bg-[#CCCCCC] rounded-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-5 md:px-10 pt-5">
        <div className="card h-full flex flex-col justify-center px-4 md:px-8">
          <div className="rounded border-2 px-4 md:px-8 pt-5 pb-14 h-full">
            <div className="w-full flex mb-5">
              <h1 className="font-semibold text-xl text-center md:text-left">
                Upload Spa Display Photo:
              </h1>
            </div>
            <div className="flex justify-center items-center px-2 py-5 w-full h-full">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="displayPhoto"
                onChange={handleFileChange2}
              />
              <div className="border-dashed border-2 w-full h-full flex items-center justify-center relative bg-[#FCFCFB]">
                {formData.displayPhoto ? (
                  <>
                    <img
                      src={formData.displayPhoto}
                      alt="Spa DisplayPhoto"
                      className="w-full h-full object-cover object-center"
                    />
                    <button
                      type="button"
                      className="bg-white rounded-full p-2 absolute bottom-2 right-2"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          displayPhoto: '',
                        })
                      }
                    >
                      <FaTrash color="red" size={20} />
                    </button>
                  </>
                ) : (
                  // eslint-disable-next-line jsx-a11y/label-has-associated-control
                  <label
                    htmlFor="displayPhoto"
                    className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                  >
                    <FaImages size={60} color="#41924B" />
                    <h1 className="font-semibold text-xl text-center">
                      Click to Browse Image
                    </h1>
                    <p className="text-sm text-center">
                      Supports JPEG, JPG, PNG
                    </p>
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="card h-full flex flex-col">
          <h1 className="text-4xl font-bold px-4 text-center md:text-left">
            Basic Info
          </h1>
          <div className="flex flex-col px-5 pt-5 pb-12 h-full gap-y-4">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-lg font-semibold">
                Spa Name <Required />
              </h1>
              <input
                type="text"
                className="rounded px-3 py-2 border-2 bg-[#FCFCFB] w-full"
                name="spaName"
                value={formData.spaName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col h-full gap-y-2">
              <h1 className="text-lg font-semibold">
                Description <Required />
              </h1>
              <textarea
                className="rounded px-3 py-2 border-2 bg-[#FCFCFB] resize-none h-48 md:h-96 w-full"
                name="spaDesc"
                value={formData.spaDesc}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end px-5 md:px-16 mb-5 md:mb-0">
        <button
          type="button"
          className="bg-[#41924B] w-full md:w-52 py-3 rounded-full font-semibold border-2 border-[#41924B] text-slate-50"
          onClick={onNextClick}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
export default BasicInfo;
