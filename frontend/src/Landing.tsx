/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from './store/reducer/userSlice';
import { useToast } from './hooks/useToast';
import { useAppDispatch, useAppSelector } from './store/store';
import LoginModal from './components/Modal/LoginModal';
import SignUpModal from './components/Modal/SignUpModal';
import PasswordModal from './components/Modal/PasswordModal';
import LandingComp from './components/LandingComp';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Logo from './img/logo.png';
import Suite from './img/suite.png';
import Image9 from './img/image9.png';
import Loader from './components/Loader Component/Loader';
import ForgotPModal from './components/Modal/ForgotPModal';

function Landing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [forgotPModal, setForgotPModalOpen] = useState(false);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const { showErrorToast, showSuccessToast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const switchToSignUp = () => {
    setOpenLoginModal(false);
    setOpenSignUpModal(true);
  };

  const switchToLogIn = () => {
    setOpenLoginModal(true);
    setOpenSignUpModal(false);
  };

  const handleContinueToPasswordModal = () => {
    setOpenLoginModal(false);
    setPasswordModalOpen(true);
  };

  const userObj = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userObj?.id) {
      navigate('/user/dashboard');
    }
  }, [userObj]);

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = async (
    e
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setLoading(true);
      try {
        const response = await axios.post('/api/v1/user/login', {
          email: user,
          password,
        });
        dispatch(setCredentials(response.data));
        showSuccessToast('Successfully logged in');
        setPasswordModalOpen(false);
        navigate(response.data.active ? '/user/dashboard' : '/user/pending');
      } catch (err) {
        if (err instanceof AxiosError) {
          showErrorToast(err);
        } else {
          showErrorToast('Unable to login');
        }
      } finally {
        setUser('');
        setPassword('');
        setPasswordModalOpen(false);
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/v1/user/login', {
        email: user,
        password,
      });
      dispatch(setCredentials(response.data));
      showSuccessToast('Successfully logged in');
      setPasswordModalOpen(false);
      navigate(response.data.active ? '/user/dashboard' : '/user/pending');
    } catch (err) {
      if (err instanceof AxiosError) {
        showErrorToast(err);
      } else {
        showErrorToast('Unable to login');
      }
    } finally {
      setUser('');
      setPassword('');
      setPasswordModalOpen(false);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 ">
      <div className="flex sticky top-0 justify-between items-center py-2 md:py-4 z-20 bg-white px-5 shadow-lg ">
        <div className="flex items-center">
          <div className="mr-2">
            <img src={Logo} className="size-16 md:size-14" alt="Logo" />
          </div>
          <div className="flex text-2xl md:text-3xl font-bold text-[#05bc64] cursor-pointer">
            SPA <h1 className="text-neutral-950">vailable</h1>{' '}
          </div>
        </div>
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setOpenLoginModal(true)}
            className="mr-5 font-bold hover:rounded p-3 hover:bg-[#41924B] hover:text-slate-50"
          >
            Login
          </button>
          <LoginModal
            open={openLoginModal}
            setUser={setUser}
            user={user}
            onClose={() => {
              setOpenLoginModal(false);
              setUser('');
            }}
            onContinueToPasswordModal={handleContinueToPasswordModal}
            onSwitchToSignUp={switchToSignUp}
            setLoading={setLoading}
          />
          <button
            type="button"
            onClick={() => setOpenSignUpModal(true)}
            className="font-bold hover:rounded p-3 hover:bg-[#41924B] hover:text-slate-50"
          >
            Sign Up
          </button>
          {openSignUpModal && (
            <SignUpModal
              onClose={() => setOpenSignUpModal(false)}
              onSwitchToLogin={switchToLogIn}
            />
          )}

          {passwordModalOpen && (
            <PasswordModal
              setPassword={setPassword}
              password={password}
              onClose={() => {
                setPasswordModalOpen(false);
                setPassword('');
              }}
              handleSubmit={handleSubmit}
              handleKeyPress={handleKeyPress}
              handleForgotPassword={() => {
                setPasswordModalOpen(false);
                setPassword('');
                setForgotPModalOpen(true);
              }}
            />
          )}

          {forgotPModal && (
            <ForgotPModal
              email={user}
              onClose={() => {
                setForgotPModalOpen(false);
                setPassword('');
                setUser('');
              }}
            />
          )}
        </div>
      </div>

      <div className="flex relative md:h-[602px]">
        <img src={Suite} alt="Suite" className="object-cover h-full w-full" />
        <div className="absolute flex items-center justify-center top-0 left-0 w-full h-full z-10">
          <h1 className="font-bold text-slate-50 text-4xl md:text-6xl text-center text-stroke-black">
            FIND SPA NEAR YOU
          </h1>
        </div>
      </div>

      <div className="py-8 md:py-12 bg-white">
        <div className="flex flex-col ">
          <div className="flex justify-center items-center mb-6">
            <h1 className="text-xl md:text-2xl">
              MASSAGE, AESTHETICS, WELLNESS & VITALITY
            </h1>
          </div>
          <div className="flex mb-10 text-center  justify-center items-center">
            <p className="w-3/5 md:w-3/5">
              SPAvailable featured establishments provide a comprehensive range
              of services and classes aimed at promoting your well-being,
              mindfulness, and beauty. Whether it&apos;s yoga or barre workouts,
              indulgent facials, or advanced treatments like laser hair removal,
              our diverse network of spas has it all.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center bg-[#41924B] p-5">
              <h1 className="text-xl md:text-3xl text-slate-50 font-bold">
                FIND A MASSAGE
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-10">
              <LandingComp />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col">
          <div className="w-full md:h-[602px]">
            <img
              src={Image9}
              alt="Image9"
              className=" object-cover w-full h-full"
            />
          </div>

          <div className="flex bg-[#41924B] h-52 justify-center items-center">
            <p className="font-bold text-center w-3/5 text-4xl md:text-6xl text-slate-50">
              YOUR RELAXATION AWAITS.
            </p>
          </div>
        </div>
      </div>

      <Menu />
      <Footer />
    </div>
  );
}

export default Landing;
