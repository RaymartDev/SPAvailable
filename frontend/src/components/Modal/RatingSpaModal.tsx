/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';
import ModalStar from './ModalStar';

interface RatingSpaModalProps {
  onClose: () => void;
}

function RatingSpaModal({ onClose }: RatingSpaModalProps) {
  const [feedback, setFeedback] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    if (input.length <= 300) {
      setFeedback(input);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-20">
      <div className="flex flex-col items-center w-[464px] h-[475px] bg-slate-50 rounded-2xl pb-10 text-black">
        <div className="flex justify-end items-start w-full h-fit">
          <button type="button" onClick={onClose} className="m-3">
            <IoClose size={30} />
          </button>
        </div>

        <div className="flex flex-col justify-center items-center pt-5 h-fit">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-3xl">Rate Our Spa</h1>
          </div>
        </div>

        <div className="flex flex-col h-full px-10 text-sm items-center justify-center">
          <div className="flex flex-col gap-y-5">
            <div>
              <h1 className="text-xl text-center font-semibold">
                How would you rate your spa experience?
              </h1>
            </div>
            <div className="flex items-center justify-center">
              <ModalStar totalStars={5} />
            </div>
            <h1 className="text-md font-semibold">
              Do you have have any additional comment?
            </h1>
            <div className="overflow-hidden">
              <textarea
                className="w-full h-20 resize-none px-2 py-3 border-2 rounded-lg"
                onChange={handleInputChange}
                placeholder="Provide your feedback here..."
                disabled={feedback.length >= 300}
              />
              <p className="text-gray-500 text-right">
                {feedback.length}/300 characters
              </p>
            </div>
            <div className="flex gap-x-5 items-center justify-center">
              <button
                type="button"
                className="bg-[#41924B] py-3 rounded-lg w-28 text-slate-50 border-2 font-semibold"
              >
                Submit
              </button>
              <button
                type="button"
                className="bg-gray-100 py-3 rounded-lg w-28 text-black border-2 font-semibold"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RatingSpaModal;
