import { useState } from 'react';
import {
  IoLocationOutline,
  IoTimeOutline,
  IoCameraSharp,
} from 'react-icons/io5';
import { FaEdit } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { LuPhone } from 'react-icons/lu';
import axios, { AxiosError } from 'axios';
import StarRating from './StarRating';
import Image12 from '../img/image12.png';
import SpaState from '../interface/SpaState';
import { useAppDispatch } from '../store/store';
import { updateSpa } from '../store/reducer/spaSlice';
import { useToast } from '../hooks/useToast';
import DefaultPp from '../img/defaultPp.png';
import UserState from '../interface/UserState';
import SavePhotoModal from './Modal/SavePhotoModal';

function SpaDetails({
  item,
  user,
  setLoading,
}: {
  item: SpaState;
  user: UserState;
  setLoading: (v: boolean) => void;
}) {
  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':');
    const intHours = parseInt(hours, 10); // Parse hours as an integer
    let formattedTime = '';

    if (intHours > 12) {
      formattedTime += `${intHours - 12}:${minutes} PM`;
    } else if (intHours === 0) {
      formattedTime += `12:${minutes} AM`;
    } else if (intHours === 12) {
      formattedTime += `12:${minutes} PM`;
    } else {
      formattedTime += `${hours}:${minutes} AM`;
    }

    return formattedTime;
  };

  const [isEditing, setIsEditing] = useState(false);
  const [nameText, setNameText] = useState(item?.name || '');
  const [addressText, setAddressText] = useState(item?.address || '');
  const [openTime, setOpenTime] = useState(item?.openTime || '');
  const [closeTime, setCloseTime] = useState(item?.closeTime || '');

  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutText, setAboutText] = useState(item?.desc || '');

  const [isEditingContact, setIsEditingContact] = useState(false);
  const [newEmail, setNewEmail] = useState(item?.email || '');
  const [newContact, setNewContact] = useState(item?.contact || '');

  const [displayPhoto, setDisplayPhoto] = useState<string>(
    item?.display_photo || ''
  );
  const [showModal, setShowModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { showSuccessToast, showErrorToast } = useToast();

  const handleDisplayPhotoChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDisplayPhoto = URL.createObjectURL(file);
      setDisplayPhoto(newDisplayPhoto);
      setShowModal(true);
    }
  };

  const handleSaveChanges = () => {
    setShowModal(false);
  };

  const handleCancel = () => {
    setDisplayPhoto(item?.display_photo || '');
    setShowModal(false);
  };

  const handleFirstSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    const updatedSpa: SpaState = {
      id: item?.id,
      name: nameText,
      address: addressText,
      openTime,
      closeTime,
    };
    if (updatedSpa.name === item?.name) {
      delete updatedSpa.name;
    }
    if (updatedSpa.address === item?.address) {
      delete updatedSpa.address;
    }
    if (updatedSpa.openTime === item?.openTime) {
      delete updatedSpa.openTime;
    }
    if (updatedSpa.closeTime === item?.closeTime) {
      delete updatedSpa.closeTime;
    }
    if (
      !updatedSpa.name &&
      !updatedSpa.address &&
      !updatedSpa.openTime &&
      !updatedSpa.closeTime
    ) {
      setNameText(item?.name || '');
      setAddressText(item?.address || '');
      setOpenTime(item?.openTime || '');
      setCloseTime(item?.closeTime || '');
      setLoading(false);
      setIsEditing(false);
      return;
    }
    try {
      const response = await axios.put('/api/v1/spa/control', updatedSpa);
      if (response.status >= 200 && response.status < 300) {
        dispatch(updateSpa(updatedSpa));
        showSuccessToast('Updated Successfully');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        showErrorToast(err);
      } else {
        showErrorToast('Unable to fetch Spa List');
      }
    } finally {
      setNameText(item?.name || '');
      setAddressText(item?.address || '');
      setOpenTime(item?.openTime || '');
      setCloseTime(item?.closeTime || '');
      setLoading(false);
      setIsEditing(false);
    }
  };

  const handleAboutChange = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    const updatedSpa: SpaState = {
      id: item?.id,
      desc: aboutText,
    };
    if (updatedSpa.desc === item?.desc) {
      setLoading(false);
      setAboutText(item?.desc || '');
      setIsEditingAbout(false);
      return;
    }
    try {
      const response = await axios.put('/api/v1/spa/control', updatedSpa);
      if (response.status >= 200 && response.status < 300) {
        dispatch(updateSpa(updatedSpa));
        showSuccessToast('Updated Successfully');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        showErrorToast(err);
      } else {
        showErrorToast('Unable to fetch Spa List');
      }
    } finally {
      setLoading(false);
      setAboutText(item?.desc || '');
      setIsEditingAbout(false);
    }
  };

  const handleContactChanges = async () => {
    setLoading(true);
    const updatedSpa: SpaState = {
      id: item?.id,
      email: newEmail,
      contact: newContact,
    };

    if (updatedSpa.email === item?.email) {
      delete updatedSpa.email;
    }

    if (updatedSpa.contact === item?.contact) {
      delete updatedSpa.contact;
    }

    if (!updatedSpa.email && !updatedSpa.contact) {
      setLoading(false);
      setIsEditingContact(false);
      return;
    }

    try {
      const response = await axios.put('/api/v1/spa/control', updatedSpa);
      if (response.status >= 200 && response.status < 300) {
        dispatch(updateSpa(updatedSpa));
        showSuccessToast('Changes Saved Successfully');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        showErrorToast(err);
      } else {
        showErrorToast('Unable to save changes');
      }
    } finally {
      setLoading(false);
      setIsEditingContact(false);
    }
  };

  if (!item) {
    return null;
  }

  return (
    <div className="bg-white ">
      <div className="grid grid-cols-2 items-center justify-center ">
        <div className="card flex justify-start items-center pl-12 ">
          <div className="flex flex-col  justify-start border-b-4 border-black pb-20">
            <div className="flex items-center mb-5 gap-x-4">
              {isEditing ? (
                <input
                  type="text"
                  value={nameText}
                  onChange={(e) => setNameText(e.target.value)}
                  className="border-b-2 text-5xl focus:outline-none"
                />
              ) : (
                <h1 className="text-5xl font-bold">{item?.name}</h1>
              )}
              {item?.owner?.id === user?.id && (
                <button type="button" onClick={() => setIsEditing(!isEditing)}>
                  <FaEdit size={30} />
                </button>
              )}
            </div>
            <div className="flex items-center mb-5">
              <div>
                <IoLocationOutline size={25} />
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={addressText}
                  onChange={(e) => setAddressText(e.target.value)}
                  className="border-b-2 text-xl w-full focus:outline-none"
                />
              ) : (
                <p className="text-xl ml-2 ">{item?.address}</p>
              )}
            </div>
            <div className="flex items-center mb-5">
              <div>
                <IoTimeOutline size={25} />
              </div>
              {isEditing ? (
                <>
                  <input
                    type="time"
                    value={openTime}
                    onChange={(e) => setOpenTime(e.target.value)}
                    className="border-b-2 border-blue-500 focus:outline-none mr-2"
                  />
                  <span className="text-xl">-</span>
                  <input
                    type="time"
                    value={closeTime}
                    onChange={(e) => setCloseTime(e.target.value)}
                    className="border-b-2 border-blue-500 focus:outline-none ml-2"
                  />
                </>
              ) : (
                <>
                  <p className="text-xl ml-2 ">
                    {item?.openTime ? formatTime(item.openTime) : ''}
                  </p>
                  <span className="text-xl mx-2">-</span>
                  <p className="text-xl ">
                    {item?.closeTime ? formatTime(item.closeTime) : ''}
                  </p>
                </>
              )}
            </div>
            <div>
              {isEditing && (
                <div className="w-full flex justify-end">
                  <button
                    type="button"
                    onClick={handleFirstSave}
                    className="mt-3 px-4 py-2 bg-[#41924B] text-white rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center">
              <p className="text-2xl mr-2 font-semibold">5.0</p>
              <StarRating totalStars={5} />
              <p className="text-lg ml-2">(10,020 reviews)</p>
            </div>
          </div>
        </div>

        <div className="card flex items-center justify-center z-10 relative">
          <div className="h-[400px] w-7/12 rounded-lg relative">
            <img
              alt=""
              src={displayPhoto || Image12}
              className="w-full h-full object-cover -mt-20 rounded-lg shadow-xl"
              id="displayPhoto"
            />
            {item?.owner?.id === user?.id && (
              <label
                htmlFor="fileInputDisplayPhoto"
                className="absolute bottom-24 right-4 p-2 bg-[#41924B] rounded-full cursor-pointer"
              >
                <input
                  type="file"
                  id="fileInputDisplayPhoto"
                  accept="image/*"
                  onChange={handleDisplayPhotoChange}
                  className="hidden"
                />
                <IoCameraSharp size={25} color="white" />
              </label>
            )}
          </div>
        </div>
      </div>

      <div className="px-12 pb-10 ">
        <div className="border-b-4 border-black pb-10">
          <div className="flex items-center mb-5 gap-x-4">
            <h1 className="text-4xl font-semibold ">About Us</h1>
            {item?.owner?.id === user?.id && (
              <button type="button">
                <FaEdit
                  size={30}
                  onClick={() => setIsEditingAbout(!isEditingAbout)}
                />
              </button>
            )}
          </div>
          {isEditingAbout ? (
            <textarea
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              className="w-full h-32 border rounded-lg px-3 py-2 resize-none"
            />
          ) : (
            <p className="text-xl leading-10 italic">{item?.desc}</p>
          )}
          {isEditingAbout && (
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={handleAboutChange}
                className="mt-3 px-4 py-2 bg-[#41924B] text-white rounded-lg"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="px-12 pb-10 ">
        <div className="border-b-4 border-black pb-10">
          <div className="flex items-center mb-5 gap-x-4">
            <h1 className="text-4xl font-semibold ">Contact Us</h1>
            {item?.owner?.id === user?.id && (
              <button
                type="button"
                onClick={() => setIsEditingContact(!isEditingContact)}
              >
                <FaEdit size={30} />
              </button>
            )}
          </div>
          <div className="flex flex-col gap-y-5">
            <div className="flex items-center gap-x-2">
              <img
                src={item?.owner?.profile || DefaultPp}
                referrerPolicy="no-referrer"
                alt=""
                className="size-8 rounded-full object-cover object-center border-[1px] border-[#41924B]"
              />
              <h1 className="text-xl">{item?.owner?.name || 'Creator'}</h1>
            </div>
            <div>
              {isEditingContact ? (
                <div className="flex flex-col gap-y-5">
                  <input
                    type="text"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="New Email"
                    className="border-b-2 text-xl w-[30%] focus:outline-none"
                  />
                  <input
                    type="tel"
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                    placeholder="New Contact Number"
                    className="border-b-2 text-xl w-[30%] focus:outline-none"
                  />
                  <div className="w-full flex justify-end">
                    <button
                      type="button"
                      onClick={handleContactChanges}
                      className="px-4 py-2 bg-[#41924B] text-white rounded-lg"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-y-5">
                  <div className="flex items-center gap-x-2">
                    <MdOutlineMail size={25} />
                    <h1 className="text-xl">{item?.email || 'Creator'}</h1>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <LuPhone size={25} />
                    <h1 className="text-xl">
                      {item?.contact || 'Contact Number'}{' '}
                    </h1>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <SavePhotoModal
        isOpen={showModal}
        onCancel={handleCancel}
        onSaveChanges={handleSaveChanges}
      />
    </div>
  );
}

export default SpaDetails;
