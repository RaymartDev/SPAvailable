/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoCameraSharp } from 'react-icons/io5';
import axios, { AxiosError } from 'axios';
import NavbarLogged from '../../components/Navbar/NavbarLogged';
import SpaDetails from '../../components/SpaDetails';
import ServiceSwiper from '../../components/ServiceSwiper';
import ProductSwiper from '../../components/ProductSwiper';
import GallerySwiper from '../../components/GallerySwiper';
import MapLocation from '../../components/MapLocation';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import Image11 from '../../img/image11.png';
import Loader from '../../components/Loader Component/Loader';
import { useAppDispatch, useAppSelector } from '../../store/store';
import SpaState from '../../interface/SpaState';
import SavePhotoModal from '../../components/Modal/SavePhotoModal';
import { useToast } from '../../hooks/useToast';
import { updateSpa } from '../../store/reducer/spaSlice';

function AboutSpa() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user);
  const spa = useAppSelector((state) => state.spa);
  const { id } = useParams();
  const item = spa.find(
    (itemSpa) => itemSpa?.id === parseInt(id as string, 10)
  ) as SpaState;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showSuccessToast, showErrorToast } = useToast();
  const [coverPhoto, setCoverPhoto] = useState<string>(item?.cover_photo || '');

  useEffect(() => {
    if (!item) {
      navigate('/user/dashboard');
    }
  }, [id]);

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        showErrorToast('File is too large. Please upload 3MB or less.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setCoverPhoto(base64String);
        setShowModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    setShowModal(false);
    const updatedSpa: SpaState = {
      id: item?.id,
      cover_photo: coverPhoto,
    };
    if (updatedSpa.cover_photo === item?.cover_photo) {
      delete updatedSpa.cover_photo;
    }
    if (!updatedSpa.cover_photo) {
      setShowModal(false);
      return;
    }
    const saveChanges = async () => {
      try {
        setLoading(true);
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
        setShowModal(false);
        setLoading(false);
      }
    };
    saveChanges();
  };

  const handleCancel = () => {
    setCoverPhoto(item?.cover_photo || '');
    setShowModal(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <NavbarLogged setLoading={setLoading} user={user} />
      <div className="flex h-[450px] md:h-[500px] z-10 relative">
        <img
          src={coverPhoto || Image11}
          className="object-cover h-full w-full"
          id="coverPhoto"
        />
        {item?.owner?.id === user?.id && (
          <label
            htmlFor="fileInput"
            className="absolute bottom-5 left-5 bg-[#41924B] text-white px-5 py-2 rounded-lg flex items-center gap-x-2 font-semibold cursor-pointer"
          >
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleCoverPhotoChange}
              className="hidden"
            />
            <IoCameraSharp size={20} />
            Edit Cover Photo
          </label>
        )}
      </div>
      <SpaDetails setLoading={setLoading} item={item} user={user} />
      <ServiceSwiper />
      <ProductSwiper />
      <GallerySwiper />
      <MapLocation />
      <Menu />
      <Footer />
      {showModal && (
        <SavePhotoModal
          onCancel={handleCancel}
          onSaveChanges={handleSaveChanges}
        />
      )}
    </div>
  );
}

export default AboutSpa;
