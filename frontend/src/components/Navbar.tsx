/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import Logo from '../img/logo.png';
import { useAppDispatch, useAppSelector } from '../store/store';
import { useToast } from '../hooks/useToast';
import { logout } from '../store/reducer/userSlice';

function Navbar() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const { showErrorToast, showSuccessToast } = useToast();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (!user) {
      navigate('/');
      return;
    }
    navigate(user.active ? '/user/dashboard' : '/user/pending');
  };

  const handleLogout = async () => {
    if (user) {
      try {
        const response = await axios.post('/api/v1/user/logout');
        if (response.status === 200) {
          dispatch(logout());
          showSuccessToast('Successfully logged out');
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          showErrorToast(err);
        } else {
          showErrorToast('Unable to register');
        }
      }
    }
    navigate('/');
  };

  return (
    <div className="max-w-screen-2xl mx-auto flex sticky top-0 justify-between items-center py-2 md:py-4 z-20 bg-white shadow-lg ">
      <div className="flex items-center pl-5">
        <div className="mr-2">
          <img alt="logo" src={Logo} className="size-16 md:size-14" />
        </div>
        <div
          onClick={handleClick}
          className="flex cursor-pointer text-2xl md:text-3xl font-bold text-[#05bc64]"
        >
          SPA<h1 className="text-neutral-950">vailable</h1>{' '}
        </div>
      </div>
      <div>
        <button
          type="button"
          className="mr-5 font-bold hover:rounded p-3 hover:bg-[#41924B] hover:text-slate-50"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Navbar;
