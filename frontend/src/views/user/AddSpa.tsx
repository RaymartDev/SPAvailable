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

  const initialFormData = {
    spaName: '',
    spaDesc: '',
    spaEmail: '',
    spaContact: '',
    spaAddress: '',
    spaCity: '',
    coverPhoto: '',
    displayPhoto: '',
    openTime: '',
    closeTime: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetFormData = () => {
    setFormData(initialFormData);
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [showBasicInfo, setShowBasicInfo] = useState<boolean>(true);
  const { showErrorToast, showSuccessToast } = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const resetAll = () => {
    resetFormData();
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();

    if (!formData.spaEmail) {
      showErrorToast('Email field is required.');
      setLoading(false);
      return;
    }

    if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.spaEmail)
    ) {
      showErrorToast('Please input a valid email address.');
      setLoading(false);
      return;
    }

    if (
      formData.spaContact &&
      !/^(09|\+639)\d{9,10}$/.test(`09${formData.spaContact}`)
    ) {
      showErrorToast('Please input a valid phone number');
      setLoading(false);
      return;
    }

    if (!formData.openTime) {
      showErrorToast('Open time field is required.');
      setLoading(false);
      return;
    }

    if (!formData.closeTime) {
      showErrorToast('Closed time field is required.');
      setLoading(false);
      return;
    }

    if (!formData.spaCity) {
      showErrorToast('City field is required.');
      setLoading(false);
      return;
    }

    if (!formData.spaAddress) {
      showErrorToast('Address field is required.');
      setLoading(false);
      return;
    }

    const handlePost = async () => {
      try {
        const response = await axios.post('/api/v1/spa/control', {
          name: formData.spaName,
          desc: formData.spaDesc,
          email: formData.spaEmail,
          contact: formData.spaContact ? `09${formData.spaContact}` : '',
          openTime: formData.openTime,
          closeTime: formData.closeTime,
          address: `${formData.spaAddress} ${formData.spaCity}`,
          display_photo: formData.displayPhoto,
          cover_photo: formData.coverPhoto,
          ownerId: user?.id,
        });
        dispatch(createSpa({ ...response.data, owner: user }));
        showSuccessToast('Successfully created a new spa');
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
                  if (!formData.spaName) {
                    showErrorToast('Name of the spa is required field.');
                    return;
                  }
                  if (!formData.spaDesc) {
                    showErrorToast('Description of the spa is required field.');
                    return;
                  }
                  setShowBasicInfo(false);
                }}
                handleChange={handleChange}
                setFormData={setFormData}
                formData={formData}
              />
            ) : (
              <SpaInfo
                onReturnClick={() => setShowBasicInfo(true)}
                setFormData={setFormData}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
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
