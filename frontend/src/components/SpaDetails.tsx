import { useState } from 'react';
import {
  IoLocationOutline,
  IoTimeOutline,
  IoCameraSharp,
} from 'react-icons/io5';
import { FaEdit } from 'react-icons/fa';
import axios, { AxiosError } from 'axios';
import StarRating from './StarRating';
import Image12 from '../img/image12.png';
import SpaState from '../interface/SpaState';
import { useAppDispatch } from '../store/store';
import { updateSpa } from '../store/reducer/spaSlice';
import { useToast } from '../hooks/useToast';

function SpaDetails({
  item,
  setLoading,
}: {
  item: SpaState;
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
  const [aboutText, setAboutText] = useState(item?.desc || '');
  const [isEditingAbout, setIsEditingAbout] = useState(false);

  const dispatch = useAppDispatch();
  const { showSuccessToast, showErrorToast } = useToast();
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
      !updateSpa.name &&
      !updatedSpa.address &&
      !updatedSpa.openTime &&
      !updatedSpa.closeTime
    ) {
      setLoading(false);
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
              <button type="button" onClick={() => setIsEditing(!isEditing)}>
                <FaEdit size={30} />
              </button>
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
              src={item?.display_photo || Image12}
              className="w-full h-full object-cover -mt-20 rounded-lg shadow-xl"
            />
            <button
              type="button"
              className="absolute bottom-24 right-4 p-2 bg-[#41924B] rounded-full"
            >
              <IoCameraSharp color="white" size={25} />
            </button>
          </div>
        </div>
      </div>

      <div className="px-12 pb-10 ">
        <div className="border-b-4 border-black pb-10">
          <div className="flex items-center mb-5 gap-x-4">
            <h1 className="text-4xl font-semibold ">About Us</h1>
            <button type="button">
              <FaEdit
                size={30}
                onClick={() => setIsEditingAbout(!isEditingAbout)}
              />
            </button>
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
    </div>
  );
}

export default SpaDetails;
