/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface ForgotPModalProps {
  onClose: () => void;
  email: string;
}

function ForgotPModal({ onClose, email }: ForgotPModalProps) {
  const [emailError, setEmailError] = useState('');
  const [emailVal, setEmail] = useState(email || '');
  const validateEmail = (emailParam: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailParam);
  };

  const handleContinueClick = () => {
    if (!validateEmail(emailVal)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-20">
      <div className="flex flex-col items-center w-[464px] h-[400px] bg-slate-50 rounded-2xl pb-10">
        <div className="flex justify-end items-start w-full h-fit">
          <button type="button" onClick={onClose} className="m-3">
            <IoClose size={30} />
          </button>
        </div>

        <div className="flex flex-col justify-center items-center w-[300px] h-fit pb-5">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-2xl">Forgot Password</h1>
          </div>
        </div>

        <div className="flex flex-col h-full px-10 text-sm items-center justify-center">
          <div className="flex flex-col gap-y-5">
            <div>
              <h1 className="text-xl font-semibold">Find your account</h1>
            </div>

            <div>
              <p className="text-sm">
                Please enter your email address and we'll send you a reset link.
              </p>
            </div>
            <div>
              <input
                type="text"
                placeholder="Email Address"
                className="w-full rounded border-stone-950 border px-2 py-3"
                value={emailVal}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

            <div className="flex gap-x-5 items-center justify-end">
              <button
                type="button"
                className="bg-gray-100 py-3 rounded-lg w-28 text-black border-2 font-semibold"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-[#41924B] py-3 rounded-lg w-28 text-slate-50 border-2 font-semibold"
                onClick={handleContinueClick}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPModal;
