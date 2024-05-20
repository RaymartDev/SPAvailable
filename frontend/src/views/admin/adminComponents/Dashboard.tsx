/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaArrowRightLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import DefaultPp from '../../../img/defaultPp.png';
import SpaState from '../../../interface/SpaState';
import { useAppSelector } from '../../../store/store';
import UserState from '../../../interface/UserState';

interface DashboardProps {
  setActiveContent: (content: string) => void;
}

function Dashboard({ setActiveContent }: DashboardProps) {
  const spaList: SpaState[] = useAppSelector((state) => state.spa);
  const user: UserState = useAppSelector((state) => state.user);
  const users: UserState[] = useAppSelector((state) => state.users);
  const feedbackCount = 0;
  const navigate = useNavigate();

  const handleNavigation = (content: string) => {
    setActiveContent(content);
    navigate('/admin');
  };

  return (
    <div className="flex flex-col space-y-10">
      <div className="space-y-3">
        <h1 className="text-5xl font-bold">Dashboard</h1>
      </div>

      <div className="flex w-full h-full space-x-10">
        <div className="w-4/5 h-full space-y-10">
          <div className="h-1/5">
            <div className="grid grid-cols-3 space-x-10">
              <button
                className="rounded-lg shadow-lg border-2 hover:scale-105 duration-150 bg-white"
                onClick={() => handleNavigation('Users')}
                type="button"
              >
                <div className="flex justify-between items-center py-4 px-5">
                  <div>
                    <h1 className="text-4xl font-bold">{users.length}</h1>
                    <h2>Users</h2>
                  </div>
                </div>
                <div className="flex rounded-b-lg items-center justify-between bg-[#41924B] text-white py-4 px-5">
                  <h1>View More</h1>
                  <FaArrowRightLong size={30} />
                </div>
              </button>

              <button
                className="rounded-lg shadow-lg border-2 hover:scale-105 duration-150 bg-white"
                onClick={() => handleNavigation('Spa')}
                type="button"
              >
                <div className="flex justify-between items-center py-4 px-5">
                  <div>
                    <h1 className="text-4xl font-bold">{spaList.length}</h1>
                    <h2>Spa</h2>
                  </div>
                </div>
                <div className="flex rounded-b-lg items-center justify-between bg-[#41924B] text-white py-4 px-5">
                  <h1>View More</h1>
                  <FaArrowRightLong size={30} />
                </div>
              </button>

              <button
                className="rounded-lg shadow-lg border-2 hover:scale-105 duration-150 bg-white"
                onClick={() => handleNavigation('Feedback')}
                type="button"
              >
                <div className="flex justify-between items-center py-4 px-5">
                  <div>
                    <h1 className="text-4xl font-bold">{feedbackCount}</h1>
                    <h2>Feedback</h2>
                  </div>
                </div>
                <div className="flex rounded-b-lg items-center justify-between bg-[#41924B] text-white py-4 px-5">
                  <h1>View More</h1>
                  <FaArrowRightLong size={30} />
                </div>
              </button>
            </div>
          </div>

          <div className="w-full h-full flex flex-col px-5 py-6 border-2 rounded-lg shadow-lg bg-white">
            <h1 className="font-bold text-2xl">Analytics</h1>
          </div>
        </div>

        <div className="grid grid-rows-4 w-1/5 space-y-5">
          <div className="flex flex-col items-center justify-center border-2 rounded-lg py-8 space-y-3 shadow-lg bg-white">
            <img
              src={user?.profile || DefaultPp}
              alt="profilePicture"
              className="size-16 object-cover rounded-full object-center"
            />
            <h1 className="text-xl">{user?.name}</h1>
          </div>
          <div className="flex flex-col px-5 py-6 row-span-3 border-2 rounded-lg shadow-lg bg-white">
            <h1 className="font-bold text-2xl">Latest Spa</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
