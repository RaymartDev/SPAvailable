import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/store';
import { logout } from '../store/reducer/userSlice';
import axios, { AxiosError } from 'axios';
import DefaultPp from "../img/defaultPp.png";
import { MdOutlineFeedback } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";

function DropdownUserMenu()  {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const user = useAppSelector((state) => state.user.user);

    const dispatch = useAppDispatch();


    useEffect(() => {
        if (!user) {
        navigate('/');
        }
    }, [user, navigate]);
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        if (user) {
          try {
            const response = await axios.post('/api/v1/user/logout');
            if (response.status === 200) {
              dispatch(logout());
              alert('Successfully logged out');
            }
          } catch (err) {
            if (err instanceof AxiosError) {
                alert(err);
            } else {
                alert('Unable to register');
            }
          }
        }
        navigate('/');
      };

    return (
        <div className="relative">
            <button
                className="flex items-center focus:outline-none"
                onClick={toggleMenu}
            >
                <h1 className="font-semibold mr-2 text-lg">{user?.name}</h1>
                <img
                src={DefaultPp}
                alt="User Avatar"
                className="size-12 rounded-full"
                />
                
            </button>
        {isOpen && (
            <div className="absolute right-0 mt-2 w-[400px] bg-[#41924B] text-slate-50 rounded-md shadow-lg px-5 py-10 flex flex-col gap-y-5">
                <div className='flex items-center w-full pl-5 py-5 border-2 rounded-lg shadow-lg bg-slate-50'>
                    <img
                    src={DefaultPp}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover text size-8"
                    />
                    <h1 className="ml-2 font-semibold text-lg text-neutral-950">{user?.name}</h1>
                </div> 
                <div className='flex flex-col gap-y-3'>
                    <button className="flex items-center py-2 pl-2 hover:bg-slate-50 hover:text-neutral-950 w-full rounded-md" onClick={() => navigate('/user/profile')}>      
                        <div className='bg-slate-50 rounded-full p-2 shadow-xl '>
                            <CgProfile color='black' size={25}/>
                        </div>
                        <h1 className='text-lg ml-2'>Profile</h1>
                    </button>

                    <button className="flex items-center py-2 pl-2 hover:bg-gray-100 hover:text-neutral-950 w-full rounded-md" onClick={() => navigate('/user/profile')}>
                        <div className='bg-slate-50  rounded-full p-2'>
                            <MdOutlineFeedback color='black' size={25}/>
                        </div>
                        <h1 className='text-lg ml-2'>Feedback</h1>
                    </button>

                    <hr className="my-2" />

                    <button className="flex items-center py-2 pl-2 hover:bg-gray-100 hover:text-neutral-950 w-full rounded-md" onClick={handleLogout}>
                        <div className='bg-slate-50  rounded-full p-2'>
                            <IoIosLogOut color='black' size={25}/>
                        </div>
                        <h1 className='text-lg ml-2'>Logout</h1>
                    </button>
                </div>    
            </div>
        )}
        </div>
    );
};

export default DropdownUserMenu;
