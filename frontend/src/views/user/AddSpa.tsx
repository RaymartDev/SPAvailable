import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarLogged from '../../components/Navbar/NavbarLogged';
import { useAppDispatch, useAppSelector } from '../../store/store';
import Loader from '../../components/Loader Component/Loader';
import BasicInfo from '../../components/BasicInfo';
import SpaInfo from '../../components/SpaInfo';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import { useToast } from '../../hooks/useToast';
import { createSpa } from '../../store/reducer/spaSlice';

function AddSpa() {
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [showBasicInfo, setShowBasicInfo] = useState<boolean>(true);
  const [spaName, setSpaName] = useState<string>('');
  const [spaDesc, setSpaDesc] = useState<string>('');
  const [spaEmail, setSpaEmail] = useState<string>('');
  const [spaContact, setSpaContact] = useState<string>('');
  const [spaAddress, setSpaAddress] = useState<string>('');
  const [coverPhoto, setCoverPhoto] = useState<string>('');
  const [displayPhoto, setDisplayPhoto] = useState<string>('');
  const [openTime, setOpenTime] = useState<string>('');
  const [closeTime, setCloseTime] = useState<string>('');
  const { showErrorToast, showSuccessToast } = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const resetAll = () => {
    setSpaName('');
    setSpaDesc('');
    setSpaEmail('');
    setSpaContact('');
    setOpenTime('');
    setCloseTime('');
    setSpaAddress('');
    setDisplayPhoto('');
    setCoverPhoto('');
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();

    if (!spaEmail || !spaAddress) {
      showErrorToast('Please input all required fields.');
      setLoading(false);
      return;
    }

    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(spaEmail)) {
      showErrorToast('Please input a valid email address.');
      setLoading(false);
      return;
    }

    if (spaContact && !/^(09|\+639)\d{9,10}$/.test(`09${spaContact}`)) {
      showErrorToast('Please input a valid phone number');
      setLoading(false);
      return;
    }

    const handlePost = async () => {
      try {
        const response = await axios.post('/api/v1/spa/control', {
          name: spaName,
          desc: spaDesc,
          email: spaEmail,
          contact: spaContact ? `09${spaContact}` : '',
          openTime,
          closeTime,
          address: spaAddress,
          display_photo: displayPhoto,
          cover_photo: coverPhoto,
          ownerId: user?.id,
        });
        dispatch(createSpa(response.data));
        setLoading(false);
      } catch (err) {
        if (err instanceof AxiosError) {
          showErrorToast(err);
        } else {
          showErrorToast('Unable to register');
        }
      } finally {
        setLoading(false);
      }
    };

    handlePost();
    showSuccessToast('Successfully created a new spa');
    resetAll();
    navigate('/user/dashboard');
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <NavbarLogged setLoading={setLoading} user={user} />
      <div className="flex flex-col h-screen bg-white">
        <div className="bg-white h-full">
          <div className="h-5/6">
            {showBasicInfo ? (
              <BasicInfo
                onNextClick={() => {
                  if (!spaName || !spaDesc) {
                    showErrorToast('Please input all required fields.');
                    return;
                  }
                  setShowBasicInfo(false);
                }}
                setSpaName={setSpaName}
                setSpaDesc={setSpaDesc}
                setDisplayPhoto={setDisplayPhoto}
                name={spaName}
                desc={spaDesc}
                displayPhoto={displayPhoto}
              />
            ) : (
              <SpaInfo
                onReturnClick={() => setShowBasicInfo(true)}
                setSpaAddress={setSpaAddress}
                setSpaEmail={setSpaEmail}
                setSpaContact={setSpaContact}
                setCoverPhoto={setCoverPhoto}
                setCloseTime={setCloseTime}
                setOpenTime={setOpenTime}
                email={spaEmail}
                address={spaAddress}
                contact={spaContact}
                coverPhoto={coverPhoto}
                handleSubmit={handleSubmit}
                closeTime={closeTime}
                openTime={openTime}
              />
            )}
          </div>
          <Menu />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AddSpa;
