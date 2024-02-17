import { IoClose } from 'react-icons/io5';

interface SpaModalProps {
  open: boolean;
  onClose: () => void;
}

function SpaModal({ open, onClose }: SpaModalProps) {
  if (!open) return null;

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-30">
      <div className="w-3/5 h-3/4 bg-white p-8 rounded-lg">
        <div className="flex justify-end items-start w-full h-fit">
          <button type="button" onClick={onClose} className="m-3">
            <IoClose size={30} />
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4">Mandarin Spa Details</h2>
        <p className="text-sm mb-4">
          Address: Congressional Road Brgy 171, Caloocan City, Metro Manila
        </p>

        <button type="button">Book Now</button>
      </div>
    </div>
  );
}

export default SpaModal;
