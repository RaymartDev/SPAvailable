/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useNavigate } from 'react-router-dom';
import Logo from '../../img/logo.png';
import DropdownProps from '../../interface/DropdownProps';
import DropdownUserMenu from '../DropdownUser';

function NavbarLogged({ setLoading, user }: DropdownProps) {
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-2xl mx-auto flex sticky top-0 justify-between items-center py-2 md:py-4 px-4 z-20 bg-white shadow-lg ">
      <div className="flex items-center">
        <div className="mr-2">
          <img alt="" src={Logo} className="size-16 md:size-14" />
        </div>
        <div
          onClick={() => navigate('/user/dashboard')}
          className="flex cursor-pointer text-2xl md:text-3xl font-bold text-[#05bc64]"
        >
          SPA
          <h1 className="text-neutral-950">vailable</h1>{' '}
        </div>
      </div>
      <div className="flex items-center">
        <DropdownUserMenu setLoading={setLoading} user={user} />
      </div>
    </div>
  );
}

export default NavbarLogged;