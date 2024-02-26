/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { decodedToken } from '../Google/client';
import { useToast } from '../../hooks/useToast';

interface SignUpModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

function SignUpModal({ open, onClose, onSwitchToLogin }: SignUpModalProps) {
  const navigate = useNavigate() as NavigateFunction;
  const { showErrorToast } = useToast();

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
    setEmail('');
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
            <GoogleLogin
              locale="en_US"
              text="signup_with"
              onSuccess={(credentialResponse) => {
                const decoded = decodedToken(credentialResponse.credential);
                if (decoded) {
                  navigate('/register', {
                    state: {
                      email: decoded.email,
                      name: decoded.name,
                      email_verified: decoded.email_verified,
                      picture: decoded.picture.replace('s96-c', 's192-c'),
                      firstName: decoded.given_name,
                      lastName: decoded.family_name,
                      google: true,
                    },
                  });
                } else {
                  navigate('/register');
                }
              }}
              onError={() => {
                showErrorToast('Registration failed');
              }}
              width={300}
              shape="circle"
              logo_alignment="center"
              theme="filled_black"
              size="large"
            />
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
