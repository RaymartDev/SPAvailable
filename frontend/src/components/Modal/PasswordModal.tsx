/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

interface PasswordModalProps {
  open: boolean;
  onClose: () => void;
  setPassword: (props: string) => void;
  password: string;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
function PasswordModal({
  open,
  onClose,
  password,
  setPassword,
  handleSubmit,
}: PasswordModalProps) {
  const [visiblePass, setVisiblePass] = useState(false);

  const togglePassword = () => {
    setVisiblePass(!visiblePass);
  };

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
            <h1 className="font-bold text-xl">Log In</h1>
            <p className="mt-2 text-sm">
              By continuing, you are setting up a SPAvailable account and agree
              to our{' '}
              <a href="/terms" className="text-[#4285F4]">
                Terms and Condition
              </a>{' '}
              and{' '}
              <a href="/privacy-policy" className="text-[#4285F4]">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <div className="flex justify-center items-center my-10 w-full">
            <h1 className="px-4 text-xl font-bold">Input Password</h1>
          </div>

          <div className="flex w-full relative">
            <input
              type={visiblePass === false ? 'password' : 'text'}
              className="w-full rounded border-stone-950 border p-2"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="absolute right-0 top-0 bottom-0 flex items-center px-2">
              {visiblePass === false ? (
                <BsFillEyeSlashFill size={25} onClick={togglePassword} />
              ) : (
                <BsFillEyeFill size={25} onClick={togglePassword} />
              )}
            </div>
          </div>

          <div className="flex w-full">
            <button
              type="button"
              className="bg-[#41924B] w-full text-slate-50 font-semibold p-3 rounded my-10"
              onClick={handleSubmit}
            >
              LOGIN
            </button>
          </div>

          <div className="flex flex-col w-full items-center">
            <div className="text-sm">
              <p>
                Forgot your{' '}
                <button type="button" className="text-[#41924B]">
                  Password
                </button>
                ?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordModal;
