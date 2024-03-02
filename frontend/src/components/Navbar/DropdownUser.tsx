import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { MdOutlineFeedback } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { IoIosLogOut } from 'react-icons/io';
import { useAppDispatch } from '../../store/store';
import { logout } from '../../store/reducer/userSlice';
import DefaultPp from '../../img/defaultPp.png';
import { useToast } from '../../hooks/useToast';
import DropdownProps from '../../interface/DropdownProps';
import RatingModal from '../Modal/RatingModal';

function DropdownUserMenu({ setLoading, user }: DropdownProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { showSuccessToast, showErrorToast } = useToast();
  const [openRatingModal, setOpenRatingModal] = useState(false);

  const dispatch = useAppDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    if (user) {
      try {
        const response = await axios.post('/api/v1/user/logout');
        if (response.status === 200) {
          showSuccessToast('Successfully logged out');
          dispatch(logout());
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          showErrorToast(err);
        } else {
          showErrorToast('Unable to logout');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center focus:outline-none"
        onClick={toggleMenu}
      >
        <h1 className="font-semibold mr-2 text-lg">{user?.name}</h1>
        <img
          src={user?.profile || DefaultPp}
          alt="User Avatar"
          className="size-12 rounded-full object-cover object-center border-2 border-[#41924B] p-1"
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[350px] bg-[#41924B] text-slate-50 rounded-md shadow-lg px-5 pt-10 pb-5 flex flex-col gap-y-5">
          <div className="flex items-center w-full pl-5 py-3 border-2 rounded-lg shadow-2xl bg-slate-50">
            <img
              src={user?.profile || DefaultPp}
              alt="User Avatar"
              className="size-12 rounded-full object-cover object-center border-[2px] border-[#41924B] p-[1px]"
            />
            <h1 className="ml-2 font-semibold text-md text-neutral-950">
              {user?.name}
            </h1>
          </div>
          <div className="flex flex-col gap-y-3">
            <button
              type="button"
              className="flex items-center py-2 pl-2 hover:bg-slate-50 hover:text-neutral-950 w-full rounded-md"
              onClick={() => navigate('/user/profile')}
            >
              <div className="bg-slate-50 rounded-full p-2 shadow-xl ">
                <CgProfile color="black" size={25} />
              </div>
              <h1 className="text-md ml-2">Profile</h1>
            </button>

            <button
              type="button"
              className="flex items-center py-2 pl-2 hover:bg-gray-100 hover:text-neutral-950 w-full rounded-md"
              onClick={() => setOpenRatingModal(true)}
            >
              <div className="bg-slate-50  rounded-full p-2">
                <MdOutlineFeedback color="black" size={25} />
              </div>
              <h1 className="text-md ml-2">Feedback</h1>
            </button>
            {openRatingModal && (
              <RatingModal
                onClose={() => {
                  setOpenRatingModal(false);
                }}
              />
            )}

            <hr className="my-2" />

            <button
              type="button"
              className="flex items-center py-2 pl-2 hover:bg-gray-100 hover:text-neutral-950 w-full rounded-md"
              onClick={handleLogout}
            >
              <div className="bg-slate-50  rounded-full p-2">
                <IoIosLogOut color="black" size={25} />
              </div>
              <h1 className="text-md ml-2">Logout</h1>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownUserMenu;
