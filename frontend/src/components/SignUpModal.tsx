/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { IoClose } from 'react-icons/io5';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface SignUpModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void; 
}

function SignUpModal({ open, onClose, onSwitchToLogin }: SignUpModalProps) {
  const navigate = useNavigate() as NavigateFunction;

  const validateEmail = (email: string): boolean => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const navigateToRegister = () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setEmailError('');

    navigate('/register', {
      state: { email },
    });
  };
  
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-20 ">
      <div className="flex flex-col items-center w-[464px] h-[659px] bg-slate-50 rounded-2xl">
        <div className="flex justify-end items-start w-full h-fit">
          <button type="button" onClick={onClose} className="m-3">
            <IoClose size={30} />
          </button>
        </div>

        <div className="flex flex-col justify-center items-center w-[300px] h-fit mt-5">
          <div className="flex flex-col justify-center items-center ">
            <h1 className="font-bold text-xl">Sign Up</h1>
            <p className="mt-2 text-sm">
              By continuing, you are setting up a SPAvailable account and agree
              to our User Agreement and Privacy Policy.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center mt-10 w-full">
            <div className="flex items-center bg-[#DADCE0] w-full  rounded-full p-2">
              <FcGoogle size={23} className="mr-10" />
              <button type="button">Continue With Google</button>
            </div>
          </div>

          <div className="flex justify-center items-center mt-8 w-full">
            <div className="border w-full h-0 border-black" />
            <h1 className="px-4 font-bold">OR</h1>
            <div className="border w-full h-0 border-black" />
          </div>

          <div className="flex w-full mt-8">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              placeholder="Email Address"
              className="w-full rounded border-stone-950 border p-2"
            />
          </div>
          {emailError && (
            <div className="text-red-500 text-sm mt-2">{emailError}</div>
          )}
          <div className="flex w-full mt-5">
            <button
              onClick={navigateToRegister}
              type="button"
              className="bg-[#41924B] w-full text-slate-50 font-semibold p-3 rounded"
            >
              CONTINUE
            </button>
          </div>

          <div className="flex flex-col w-full items-center mt-5">
            <div className="text-sm">
              <p>Already have an account?</p>
            </div>
            <div>
              <button
                type="button"
                className="font-bold text-[#41924B] mt-2"
                onClick={onSwitchToLogin}
              >
                LOG IN
              </button>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;
