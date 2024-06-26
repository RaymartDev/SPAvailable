import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

interface PasswordModalProps {
  onClose: () => void;
  setPassword: (props: string) => void;
  password: string;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleForgotPassword: () => void;
}
function PasswordModal({
  onClose,
  password,
  setPassword,
  handleSubmit,
  handleKeyPress,
  handleForgotPassword,
}: PasswordModalProps) {
  const [visiblePass, setVisiblePass] = useState(false);

  const togglePassword = () => {
    setVisiblePass(!visiblePass);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-20 p-4 sm:p-0">
      <div className="flex flex-col items-center w-full max-w-md bg-slate-50 rounded-2xl p-6 sm:w-[464px] sm:h-[580px]">
        <div className="flex justify-end items-start w-full">
          <button type="button" onClick={onClose}>
            <IoClose size={30} />
          </button>
        </div>

        <div className="flex flex-col justify-center items-center w-full mt-5 md:px-16">
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
              onKeyDown={handleKeyPress}
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
                <button
                  onClick={handleForgotPassword}
                  type="button"
                  className="text-[#41924B]"
                >
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
