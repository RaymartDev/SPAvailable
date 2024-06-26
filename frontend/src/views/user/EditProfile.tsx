/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa6';
import axios, { AxiosError } from 'axios';
import DefaultPp from '../../img/defaultPp.png';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useToast } from '../../hooks/useToast';
import NavbarLogged from '../../components/Navbar/NavbarLogged';
import { updateInfo } from '../../store/reducer/userSlice';
import Loader from '../../components/Loader Component/Loader';
import { formatDate } from '../../components/Util/dateUtil';

interface UpdateInfo {
  password?: string;
  name?: string;
  contact?: string;
  profile?: string;
}

function EditProfile() {
  const user = useAppSelector((state) => state.user);
  const [visiblePass, setVisiblePass] = useState(false);
  const [visibleRePass, setVisibleRePass] = useState(false);
  const [pass, setPass] = useState<string>('');
  const [pass2, setPass2] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string>(
    user?.profile || DefaultPp
  );
  const [name, setName] = useState<string>(user?.name ? user.name : '');
  const [contact, setContact] = useState<string>(
    user?.contact ? user.contact : ''
  );
  const { showErrorToast, showSuccessToast } = useToast();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const togglePassword = () => {
    setVisiblePass(!visiblePass);
  };

  const toggleRePassword = () => {
    setVisibleRePass(!visibleRePass);
  };

  const removeProfilePicture = () => {
    setProfilePicture('');
  };

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    if (pass !== pass2) {
      showErrorToast('Password do not match');
      setLoading(false);
      return;
    }
    if (!name || name.length <= 3) {
      showErrorToast('Please enter a proper full name');
      setLoading(false);
      return;
    }
    const toUpdate: UpdateInfo = {
      password: pass,
      name,
      contact,
      profile: profilePicture,
    };

    if (user?.name === toUpdate.name) {
      delete toUpdate.name;
    }

    if (user?.contact === toUpdate.contact) {
      delete toUpdate.contact;
    }

    if (user?.profile === toUpdate.profile) {
      delete toUpdate.profile;
    }

    if (
      !toUpdate.profile &&
      !toUpdate.contact &&
      !toUpdate.name &&
      !toUpdate.password
    ) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put('/api/v1/user/profile', toUpdate);
      if (response.status === 200) {
        showSuccessToast('Successfully updated profile');
        dispatch(updateInfo(toUpdate));
        setName(toUpdate.name ? toUpdate.name : user?.name || '');
        setContact(toUpdate.contact ? toUpdate.contact : user?.contact || '');
        setPass('');
        setPass2('');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        showErrorToast(err);
      } else {
        showErrorToast('Unable to update profile');
      }
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-screen-2xl min-h-screen mx-auto px-4">
      <NavbarLogged setLoading={setLoading} user={user} />
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col gap-y-10 w-full md:w-4/12 min-h-screen p-5 md:p-10 bg-[#41924B] items-center overflow-auto">
          <div className="text-slate-50">
            <h1 className="text-3xl font-bold text-center">{user?.name}</h1>
          </div>
          <div className="relative" id="profilePicture">
            <div className="w-48 h-48 rounded-full overflow-hidden flex justify-center items-center border-4 p-1">
              <img
                alt="profilePicture"
                src={profilePicture || DefaultPp}
                className={`w-full h-full object-cover rounded-full object-center ${
                  profilePicture || DefaultPp ? 'bg-white' : ''
                }`}
              />
            </div>
            <FaTrash
              color="red"
              className="absolute bottom-0 right-4 cursor-pointer"
              onClick={removeProfilePicture}
              size={30}
            />
          </div>
          <div>
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
          <div className="text-center rounded-lg py-3 px-5 text-sm bg-[#F1F6FA]">
            <p className="mb-2">
              Upload a new avatar. Larger image will be resized automatically.
            </p>
            <p>
              Maximum upload size is <b>1 MB</b>.
            </p>
          </div>
          <div className="flex flex-row text-sm text-slate-50">
            <p className="mr-2">Member Since: </p>
            <p className="font-bold">{formatDate(user?.created_at)}</p>
          </div>
        </div>

        <div className="flex w-full flex-col lg:pl-20 bg-slate-50 p-5">
          <div className="border-b-2 pb-5 my-10">
            <h1 className="text-3xl font-bold text-neutral-950">
              Edit Profile
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-2 md:mx-10">
            <div className="card mb-8">
              <div className="flex items-center mb-3 text-neutral-400">
                <h2 className="text-xl font-semibold pr-2">Full Name</h2>
              </div>
              <input
                type="text"
                value={name}
                className="w-full border-b-2 px-1 py-2 bg-transparent"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="card mb-8">
              <h2 className="text-xl text-neutral-400 font-semibold mb-3">
                Email Address
              </h2>
              <input
                type="text"
                readOnly
                value={user?.email}
                disabled
                className="w-full border-b-2 px-1 py-2 cursor-not-allowed bg-transparent"
              />
            </div>
            <div className="card mb-8">
              <div className="flex items-center mb-3 text-neutral-400">
                <h2 className="text-xl font-semibold pr-2">New Password</h2>
              </div>

              <div className="flex items-center w-full border-b-2 relative">
                <input
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
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
            <div className="card mb-8">
              <div className="flex items-center mb-3 text-neutral-400">
                <h2 className="text-xl font-semibold pr-2">
                  Confirm New Password
                </h2>
              </div>
              <div className="flex items-center w-full border-b-2 relative">
                <input
                  value={pass2}
                  onChange={(e) => setPass2(e.target.value)}
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
            <div className="card mb-8">
              <h2 className="text-xl text-neutral-400 font-semibold mb-3">
                Contact
              </h2>
              <div className="border-b-2 flex items-center">
                <p className="px-2">+63</p>
                <input
                  type="tel"
                  value={contact}
                  maxLength={10}
                  className="px-1 py-2 w-full bg-transparent"
                  onChange={(e) => {
                    const input = e.target.value;
                    if (/^\d*$/.test(input)) {
                      setContact(input);
                    }
                  }}
                />
              </div>
            </div>
            <div className="card mb-8">
              <h2 className="text-xl text-neutral-400 font-semibold mb-3">
                Gender
              </h2>
              <input
                type="text"
                value={user?.gender ? 'Male' : 'Female'}
                readOnly
                disabled
                className="w-full border-b-2 px-1 py-2 cursor-not-allowed bg-transparent"
              />
            </div>
          </div>
          <div className="flex justify-center md:justify-end mx-2 md:mx-10 mt-10">
            <div className="bg-[#41924B] rounded-full">
              <button
                type="button"
                className="text-slate-50 font-semibold px-16 py-3 text-lg"
                onClick={handleUpdate}
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
