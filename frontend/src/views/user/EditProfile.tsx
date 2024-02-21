/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import DefaultPp from '../../img/defaultPp.png';
import { useAppSelector } from '../../store/store';
import { useToast } from '../../hooks/useToast';

function EditProfile() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const [visiblePass, setVisiblePass] = useState(false);
  const [visibleRePass, setVisibleRePass] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string>(DefaultPp);
  const { showErrorToast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const togglePassword = () => {
    setVisiblePass(!visiblePass);
  };

  const toggleRePassword = () => {
    setVisibleRePass(!visibleRePass);
  };

  const removeProfilePicture = () => {
    setProfilePicture('');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = event.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        showErrorToast('File is too large. Please upload 1MB or less.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePicture(base64String);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="max-w-screen-2xl max-h-screen mx-auto px-4 overflow-hidden">
      <Navbar />

      <div className="flex ">
        <div className="flex flex-col w-4/12 h-screen p-10 bg-[#41924B] items-center">
          <div className="flex flex-col items-center text-slate-50 mb-10">
            <h1 className="text-3xl font-bold">{user?.name}</h1>
          </div>
          <div className="relative mb-10" id="profilePicture">
            <img
              alt="profilePicture"
              src={profilePicture || DefaultPp}
              className={`bg-white border-2 rounded-full object-cover size-60  ${profilePicture ? 'bg-white' : ''}`}
            />
            <FaTrash
              color="white"
              className="absolute bottom-5 right-7 cursor-pointer"
              onClick={removeProfilePicture}
              size={30}
            />
          </div>
          <div className="mb-10">
            <input
              type="file"
              accept="image/*"
              id="profilePhoto"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="profilePhoto"
              className="bg-neutral-50 rounded-full px-10 py-2 font-semibold cursor-pointer"
            >
              UPLOAD
            </label>
          </div>
          <div className="text-center rounded-lg py-3 px-5 text-sm bg-[#F1F6FA] mb-10">
            <p className="mb-2">
              Upload a new avatar. Larger image will be resized automatically
            </p>
            <p>
              Maximum upload size is <b>1 MB</b>
            </p>
          </div>
          <div className="flex flex-row text-sm text-slate-50">
            <p className="mr-2">Member Since: </p>
            <p className="font-bold">01 January 2024</p>
          </div>
        </div>

        <div className="flex w-full flex-col pl-20 bg-white p-5">
          <div className="border-b-2 pb-5 my-10">
            <h1 className="text-3xl font-bold text-neutral-950">
              Edit Profile
            </h1>
          </div>

          <div className="grid grid-cols-2 mx-10 ">
            <div className="card mb-16">
              <h2 className="text-xl text-neutral-400 font-semibold mb-3">
                Full Name
              </h2>
              <input
                type="text"
                value={user?.name}
                className="w-9/12 border-b-2 px-1 py-2 "
              />
            </div>
            <div className="card mb-16">
              <h2 className="text-xl text-neutral-400 font-semibold mb-3">
                Email Address
              </h2>
              <input
                type="text"
                readOnly
                value={user?.email}
                disabled
                className="w-9/12 border-b-2 px-1 py-2 cursor-default bg-transparent"
              />
            </div>
            <div className="card mb-16">
              <h2 className="text-xl text-neutral-400 font-semibold mb-3">
                Password
              </h2>
              <div className="flex items-center w-9/12 border-b-2 relative">
                <input
                  type={visiblePass === false ? 'password' : 'text'}
                  className="w-full px-1 py-2 bg-transparent"
                />
                <div className="absolute right-0 top-0 bottom-0 flex items-center px-2">
                  {visiblePass === false ? (
                    <BsFillEyeSlashFill size={25} onClick={togglePassword} />
                  ) : (
                    <BsFillEyeFill size={25} onClick={togglePassword} />
                  )}
                </div>
              </div>
            </div>
            <div className="card mb-16">
              <h2 className="text-xl text-neutral-400 font-semibold mb-3">
                Retype Password
              </h2>
              <div className="flex items-center w-9/12 border-b-2 relative">
                <input
                  type={visibleRePass === false ? 'password' : 'text'}
                  className="w-full px-1 py-2 bg-transparent"
                />
                <div className="absolute right-0 top-0 bottom-0 flex items-center px-2">
                  {visibleRePass === false ? (
                    <BsFillEyeSlashFill size={25} onClick={toggleRePassword} />
                  ) : (
                    <BsFillEyeFill size={25} onClick={toggleRePassword} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mx-10 mt-10">
            <div className="bg-[#41924B] rounded-full mr-[126px]">
              <button
                type="button"
                className="text-slate-50 font-semibold px-16 py-3 text-lg "
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
