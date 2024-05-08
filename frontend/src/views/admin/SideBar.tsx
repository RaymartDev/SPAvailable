import { AiOutlineHome } from 'react-icons/ai';
import { LuUserCircle } from 'react-icons/lu';
import { PiFlowerLotusLight } from 'react-icons/pi';
import { RiFeedbackLine } from 'react-icons/ri';
import { TfiDropbox } from 'react-icons/tfi';
import { MdOutlineRoomService, MdLogout } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';
import Logo from '../../img/logo.png';

interface SidebarProps {
  setActiveContent: (content: string) => void;
  activeContent: string;
}

function Sidebar({ setActiveContent, activeContent }: SidebarProps) {
  const handleButtonClick = (content: string) => {
    setActiveContent(content);
  };

  return (
    <div className="flex flex-col fixed w-1/5 h-full bg-[#41924B33] py-6 px-4 overflow-y-auto">
      <div className="flex items-center justify-start border-b-2 border-black pb-2 space-x-2">
        <img alt="logo" src={Logo} className="size-10 md:size-12" />
        <div className="flex cursor-pointer text-lg md:text-3xl font-bold text-[#05bc64]">
          SPA<h1 className="text-neutral-950">vailable</h1>{' '}
        </div>
      </div>

      <div className="flex flex-col justify-between h-full">
        <ul className="flex flex-col pt-8 space-y-2">
          <li>
            <button
              type="button"
              className={`flex items-center space-x-4 hover:bg-white hover:rounded-md px-5 py-3 w-full ${activeContent === 'Dashboard' ? 'bg-white rounded-md' : ''}`}
              onClick={() => handleButtonClick('Dashboard')}
            >
              <AiOutlineHome size={30} />
              <h1 className="text-lg md:text-xl">Dashboard</h1>
            </button>
          </li>

          <li>
            <button
              type="button"
              className={`flex items-center space-x-4 hover:bg-white hover:rounded-md px-5 py-3 w-full ${activeContent === 'Users' ? 'bg-white rounded-md' : ''}`}
              onClick={() => handleButtonClick('Users')}
            >
              <LuUserCircle size={30} />
              <h1 className="text-lg md:text-xl">Users</h1>
            </button>
          </li>

          <li>
            <button
              type="button"
              className={`flex items-center space-x-4 hover:bg-white hover:rounded-md px-5 py-3 w-full ${activeContent === 'Spa' ? 'bg-white rounded-md' : ''}`}
              onClick={() => handleButtonClick('Spa')}
            >
              <PiFlowerLotusLight size={30} />
              <h1 className="text-lg md:text-xl">Spa</h1>
            </button>
          </li>

          <li>
            <button
              type="button"
              className={`flex items-center space-x-4 hover:bg-white hover:rounded-md px-5 py-3 w-full ${activeContent === 'Feedback' ? 'bg-white rounded-md' : ''}`}
              onClick={() => handleButtonClick('Feedback')}
            >
              <RiFeedbackLine size={30} />
              <h1 className="text-lg md:text-xl">Feedback</h1>
            </button>
          </li>

          <li>
            <button
              type="button"
              className={`flex items-center space-x-4 hover:bg-white hover:rounded-md px-5 py-3 w-full ${activeContent === 'Products' ? 'bg-white rounded-md' : ''}`}
              onClick={() => handleButtonClick('Products')}
            >
              <TfiDropbox size={30} />
              <h1 className="text-lg md:text-xl">Products</h1>
            </button>
          </li>

          <li>
            <button
              type="button"
              className={`flex items-center space-x-4 hover:bg-white hover:rounded-md px-5 py-3 w-full ${activeContent === 'Services' ? 'bg-white rounded-md' : ''}`}
              onClick={() => handleButtonClick('Services')}
            >
              <MdOutlineRoomService size={30} />
              <h1 className="text-lg md:text-xl">Services</h1>
            </button>
          </li>
        </ul>

        <ul className="flex flex-col">
          <li className="flex items-center space-x-4 hover:bg-white hover:rounded-md px-5 py-3">
            <IoSettingsOutline size={30} />
            <h1 className="text-lg md:text-xl">Settings</h1>
          </li>

          <li className="flex items-center space-x-4 hover:bg-white hover:rounded-md px-5 py-3">
            <MdLogout size={30} />
            <h1 className="text-lg md:text-xl">Logout</h1>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
