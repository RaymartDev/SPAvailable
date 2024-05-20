/* eslint-disable consistent-return */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import axios, { AxiosError } from 'axios';
import { useToast } from '../../hooks/useToast';
import Loader from '../Loader Component/Loader';

interface ForgotPModalProps {
  onClose: () => void;
  email: string;
}

function ForgotPModal({ onClose, email }: ForgotPModalProps) {
  const [emailError, setEmailError] = useState('');
  const [emailVal, setEmail] = useState(email || '');
  const [canClick, setCanClick] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const { showErrorToast, showSuccessToast } = useToast();

  useEffect(() => {
    if (!canClick) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 0) {
            setCanClick(true);
            clearInterval(timer);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000); // Update countdown every second

      return () => clearInterval(timer);
    }
  }, [canClick]);

  const validateEmail = (emailParam: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailParam);
  };

  const handleContinueClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!canClick) {
      return;
    }
    setLoading(true);
    e.preventDefault();
    if (!validateEmail(emailVal)) {
      setEmailError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/v1/user/reset', {
        email: emailVal,
      });
      if (response.status === 200) {
        showSuccessToast('Successfully sent reset password email');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        showErrorToast(err);
      } else {
        showErrorToast('Unable to reset a new reset password email.');
      }
    } finally {
      setEmail('');
      setLoading(false);
    }

    setEmailError('');
    setCanClick(false); // Disallow clicking for 1 minute
    setCountdown(60); // Reset countdown timer
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-20">
      <div className="flex flex-col items-center w-[90%] max-w-[464px] h-auto bg-slate-50 rounded-2xl pb-6 md:pb-10">
        <div className="flex justify-end items-start w-full h-fit p-3 md:p-4">
          <button type="button" onClick={onClose} className="text-2xl">
            <IoClose size={30} />
          </button>
        </div>

        <div className="flex flex-col justify-center items-center w-[90%] max-w-[300px] h-fit pb-5">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-xl md:text-2xl">Forgot Password</h1>
          </div>
        </div>

        <div className="flex flex-col h-full px-5 md:px-10 text-sm items-center justify-center">
          <div className="flex flex-col gap-y-5">
            <div>
              <h1 className="text-lg md:text-xl font-semibold">
                Find your account
              </h1>
            </div>

            <div>
              <p className="text-sm md:text-base">
                Please enter your email address associated with your account and
                we'll send you a link to reset your password.
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
            {countdown > 0 && (
              <p className="text-red-500 text-sm">
                Please wait {countdown} seconds before clicking again.
              </p>
            )}
            <div className="flex gap-x-3 md:gap-x-5 items-center justify-end">
              <button
                type="button"
                className="bg-gray-100 py-2 md:py-3 rounded-lg w-24 md:w-28 text-black border-2 font-semibold"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`bg-[#41924B] py-2 md:py-3 rounded-lg w-24 md:w-28 text-slate-50 border-2 font-semibold ${canClick ? '' : 'cursor-not-allowed opacity-50'}`}
                onClick={handleContinueClick}
                disabled={!canClick}
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
