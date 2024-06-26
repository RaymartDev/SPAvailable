import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import ImageRec from '../../img/imageRec.png';
import { useAppSelector } from '../../store/store';
import { useToast } from '../../hooks/useToast';
import NavbarLogged from '../../components/Navbar/NavbarLogged';
import Loader from '../../components/Loader Component/Loader';

function Pending() {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { showSuccessToast, showErrorToast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const handleResend = async () => {
    try {
      const response = await axios.get('/api/v1/user/resend');
      if (response.status === 200) {
        showSuccessToast('Successfully resent verification email');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        showErrorToast(err.message);
      } else {
        showErrorToast('Unable to resend verification email');
      }
    }
  };

  useEffect(() => {
    if (user?.active) {
      navigate('/user/dashboard');
    }
  }, [user, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-screen-2xl max-h-screen mx-auto px-4 overflow-hidden">
      <NavbarLogged setLoading={setLoading} user={user} />
      <div className="flex flex-col justify-center h-screen bg-white p-5">
        <div className="flex w-full flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="text-3xl lg:text-6xl mb-5 lg:mb-10">
              Verify Your Email
            </h1>
            <h2 className="text-lg lg:text-2xl">
              Check your email & click the link to activate your account.
            </h2>
          </div>
          <div className="my-8 lg:my-16">
            <img alt="" src={ImageRec} className="w-40 lg:w-80" />
          </div>
          <div className="flex justify-center items-center mb-14 lg:mb-28">
            <button
              onClick={handleResend}
              type="button"
              className="bg-[#41924B] rounded-full text-slate-50 font-semibold py-3 text-base lg:text-lg border-black border-[1px] w-48 lg:w-64 hover:bg-slate-50 hover:text-[#41924B] duration-300"
            >
              Resend Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pending;
