/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useToast } from '../../hooks/useToast';
import UserState from '../../interface/UserState';

interface RatingWebsiteModalProps {
  onClose: () => void;
  setLoading: (e: boolean) => void;
  user: UserState;
}

function Feedback({ onClose, setLoading, user }: RatingWebsiteModalProps) {
  const [feedback, setFeedback] = useState('');
  const { showErrorToast, showSuccessToast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    if (input.length > 300) {
      e.preventDefault();
      return;
    }
    setFeedback(input);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/v1/feedback', {
        desc: feedback,
        ownerId: user?.id,
      });
      if (response.status === 200) {
        showSuccessToast('Successfully submitted feedback');
        setLoading(false);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        showErrorToast(err);
      } else {
        showErrorToast('Unable to send your feedback');
      }
    } finally {
      setFeedback('');
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-20">
      <div className="flex flex-col items-center w-11/12 max-w-md bg-slate-50 rounded-2xl pb-10 text-black">
        <div className="flex justify-end items-start w-full h-fit">
          <button type="button" onClick={onClose} className="m-3">
            <IoClose size={30} />
          </button>
        </div>

        <div className="flex flex-col justify-center items-center pt-5 h-fit">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-2xl md:text-3xl">Give Feedback</h1>
          </div>
        </div>

        <div className="flex flex-col h-full px-5 md:px-10 text-sm items-center justify-center">
          <div className="flex flex-col gap-y-5">
            <div>
              <h1 className="text-base md:text-lg text-center font-semibold">
                Your thoughts are valuable in helping improve us our website.
              </h1>
            </div>
            <div className="overflow-hidden">
              <textarea
                className="w-full h-28 resize-none px-2 py-3 border-2 rounded-lg"
                onChange={handleInputChange}
                value={feedback}
                placeholder="Provide your feedback here..."
              />
              <p className="text-gray-500 text-right">
                {feedback.length}/300 characters
              </p>
            </div>
            <div className="flex gap-x-3 md:gap-x-5 items-center justify-center">
              <button
                type="button"
                className="bg-[#41924B] py-2 md:py-3 rounded-lg w-24 md:w-28 text-slate-50 border-2 font-semibold"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                type="button"
                className="bg-gray-100 py-2 md:py-3 rounded-lg w-24 md:w-28 text-black border-2 font-semibold"
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

export default Feedback;
