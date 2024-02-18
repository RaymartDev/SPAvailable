/* eslint-disable jsx-a11y/anchor-is-valid */
import { IoClose } from 'react-icons/io5';

interface PasswordModalProps {
  open: boolean;
  onClose: () => void;
}
function PasswordModal({ open, onClose }: PasswordModalProps) {
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
              to our User Agreement and Privacy Policy.
            </p>
          </div>

          <div className="flex justify-center items-center mt-8 w-full">
            <h1 className="px-4 text-xl font-bold">Input Password</h1>
          </div>

          <div className="flex w-full mt-8">
            <input
              type="text"
              placeholder="Password"
              className="w-full rounded border-stone-950 border p-2 mt-5"
            />
          </div>

          <div className="flex w-full mt-5">
            <button
              type="button"
              className="bg-[#41924B] w-full text-slate-50 font-semibold p-3 rounded mt-10"
            >
              CONTINUE
            </button>
          </div>

          <div className="flex flex-col w-full items-center mt-5">
            <div className="text-sm">
              <p>
                Forgot your{' '}
                <a href="#" className="text-[#41924B]">
                  username
                </a>{' '}
                or{' '}
                <a href="#" className="text-[#41924B]">
                  password
                </a>
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
