/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoCameraSharp } from 'react-icons/io5';
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
import { useAppSelector } from '../../store/store';

function AboutSpa() {
  const [loading, setLoading] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state || !location.state.item) {
      navigate('/user/dashboard');
    }
  }, [location.state]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <NavbarLogged setLoading={setLoading} user={user} />
      <div className="flex h-[450px] md:h-[500px] z-10 relative">
        <img
          src={location.state.item.cover_photo || Image11}
          className="object-cover h-full w-full"
        />
        <button
          type="button"
          className="absolute bottom-5 left-5 bg-[#41924B] text-white px-5 py-2 rounded-lg flex items-center gap-x-2 font-semibold"
        >
          <IoCameraSharp size={20} />
          Edit Cover Photo
        </button>
      </div>
      <SpaDetails item={location.state.item} />
      <ServiceSwiper />
      <ProductSwiper />
      <GallerySwiper />
      <MapLocation />
      <Menu />
      <Footer />
    </div>
  );
}

export default AboutSpa;
