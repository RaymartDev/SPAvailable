/* eslint-disable react/no-unescaped-entities */
import { FaSearch } from 'react-icons/fa';
import { FaTrash, FaArrowTrendUp } from 'react-icons/fa6';
import DefaultPp from '../../../img/defaultPp.png';

function AdminFeedback() {
  return (
    <div className="flex flex-col space-y-10 min-w-full">
      <div className="flex items-center justify-between">
        <div className="flex space-x-8">
          <h1 className="text-5xl font-bold">Feedback</h1>
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-5 transform -translate-y-1/2 text-black" />
            <input
              type="search"
              className="rounded-full py-3 pl-12 pr-5 w-full md:w-[450px] border-2 border-[#41924B]"
            />
          </div>
        </div>
      </div>

      <div className="flex w-full space-x-10">
        <div className="flex w-4/5">
          <div className="grid grid-rows-1 w-full h-fit">
            <div className="flex flex-col border-2 bg-white rounded-lg ">
              <div className="flex px-5 py-8 ">
                <div className="flex space-x-5 items-center w-4/12">
                  <div className="flex w-1/3 items-center justify-center">
                    <div className="flex items-center size-16 rounded-full border-2">
                      <img
                        src={DefaultPp}
                        alt="profilePicture"
                        className="w-full h-full object-cover rounded-full object-center"
                      />
                    </div>
                  </div>
                  <div className="w-2/3">
                    <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                      James Allan
                    </p>
                    <p>04/11/2024</p>
                    <p>3 hours ago</p>
                  </div>
                </div>
                <div className="flex w-8/12">
                  <div className="flex items-center justify-center w-full">
                    <p className="text-center whitespace-pre-wrap break-words">
                      "User-friendly"
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center bg-[#41924B] py-3 rounded-b-lg space-x-3">
                <button type="button" className="text-white">
                  Delete
                </button>
                <FaTrash color="white" size={25} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-rows-4 w-1/5 space-y-5">
          <div className="flex flex-col items-center row-span-2 justify-center border-2 rounded-lg py-8 space-y-3 shadow-lg bg-white">
            <img src={DefaultPp} alt="profilePicture" className="size-16" />
            <h1 className="text-xl">James Allan</h1>
          </div>
          <div className="flex justify-between px-5 py-6 row-span-2 border-2 rounded-lg shadow-lg bg-white">
            <h1 className="font-bold text-2xl">Filter Feedback</h1>
            <FaArrowTrendUp size={40} color="green" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminFeedback;
