import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { decodedToken } from '../Google/client';
import { useToast } from '../../hooks/useToast';
import { useAppDispatch } from '../../store/store';
import { setCredentials } from '../../store/reducer/userSlice';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onContinueToPasswordModal: () => void;
  onSwitchToSignUp: () => void;
  user: string;
  setUser: (props: string) => void;
  setLoading: (props: boolean) => void;
}

function LoginModal({
  open,
  onClose,
  onSwitchToSignUp,
  onContinueToPasswordModal,
  user,
  setUser,
  setLoading,
}: LoginModalProps) {
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();
  const { showErrorToast, showSuccessToast } = useToast();
  const dispatch = useAppDispatch();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };

  const validateEmail = (emailParam: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailParam);
  };

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      if (!validateEmail(user)) {
        setEmailError('Please enter a valid email address.');
        return;
      }
      setEmailError('');
      onContinueToPasswordModal();
    }
  };

  const handleContinueClick = () => {
    if (!validateEmail(user)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    onContinueToPasswordModal();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-20 p-4 sm:p-0">
      <div className="flex flex-col items-center w-full max-w-md bg-slate-50 rounded-2xl p-6 sm:w-[464px] sm:h-[580px]">
        <div className="flex justify-end items-start w-full">
          <button type="button" onClick={onClose}>
            <IoClose size={30} />
          </button>
        </div>

        <div className="flex flex-col justify-center items-center w-full mt-5 md:px-16">
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="font-bold text-xl">Log In</h1>
            <p className="mt-2 text-sm">
              By continuing, you are setting up a SPAvailable account and agree
              to our{' '}
              <Link to="/terms" className="text-[#4285F4]">
                Terms and Condition
              </Link>{' '}
              and{' '}
              <Link to="/privacy-policy" className="text-[#4285F4]">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-col justify-center items-center mt-10 w-full">
            <GoogleLogin
              locale="en_US"
              text="signin_with"
              onSuccess={async (credentialResponse) => {
                const decoded = decodedToken(credentialResponse.credential);
                if (decoded) {
                  setLoading(true);
                  try {
                    const response = await axios.post('/api/v1/user/login', {
                      email: decoded.email,
                      verified: decoded.email_verified,
                    });
                    if (response.status >= 200 && response.status < 300) {
                      dispatch(setCredentials(response.data));
                      showSuccessToast('Successfully logged in');
                      navigate(
                        response.data.active
                          ? '/user/dashboard'
                          : '/user/pending'
                      );
                    }
                  } catch (err) {
                    if (err instanceof AxiosError) {
                      showErrorToast(err);
                    } else {
                      showErrorToast('Unable to login');
                    }
                  } finally {
                    setLoading(false);
                    onClose();
                  }
                } else {
                  showErrorToast('Something went wrong');
                }
              }}
              onError={() => {
                showErrorToast('Login failed');
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
              type="text"
              placeholder="Email Address"
              className="w-full rounded border-stone-950 border p-2"
              value={user}
              onChange={handleEmailChange}
              onKeyDown={handleKeyPress}
            />
          </div>
          {emailError && (
            <p className="text-red-500 text-sm mt-2">{emailError}</p>
          )}
          <div className="flex w-full mt-5">
            <button
              type="button"
              className="bg-[#41924B] w-full text-slate-50 font-semibold p-3 rounded"
              onClick={handleContinueClick}
            >
              CONTINUE
            </button>
          </div>

          <div className="flex flex-col w-full items-center mt-5">
            <div className="text-sm">
              <p className="text-center">Don&apos;t have an account yet?</p>
            </div>
            <div>
              <button
                type="button"
                onClick={onSwitchToSignUp}
                className="font-bold text-[#41924B] mt-2"
              >
                SIGN UP
              </button>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
