import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import ImageRec from '../../img/imageRec.png';
import UserState from '../../interface/UserState';

function Verify() {
  const navigate = useNavigate();
  const user = useSelector((state: UserState) => state.user);
  if (!user || !user.active) {
    navigate(user ? '/dashboard' : '/');
    return null;
  }

  return (
    <div className="max-w-screen-2xl max-h-screen mx-auto px-4 overflow-hidden">
      <Navbar />
      <div className="flex justify-center h-screen bg-white p-5">
        <div className="flex w-full flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center ">
            <h1 className="text-6xl mb-10">Verify Your Email</h1>
            <h2 className="text-2xl ">
              Check your email & click the link to activate your account.
            </h2>
          </div>
          <div className="my-16">
            <img alt="" src={ImageRec} className="size-80" />
          </div>
          <div className="flex justify-center items-center mb-28">
            <button
              type="button"
              className="bg-[#41924B] rounded-full text-slate-50 font-semibold  py-3 text-lg mr-20 border-black border-[1px] w-64 hover:bg-slate-50 hover:text-[#41924B] duration-300"
            >
              Resend Email
            </button>
            <button
              type="button"
              className="bg-slate-50 rounded-full text-[#41924B] font-semibold py-3 text-lg border-black border-[1px] w-64 hover:bg-[#41924B] hover:text-slate-50 duration-300"
            >
              Enter New Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verify;