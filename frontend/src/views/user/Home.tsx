import { IoSearchSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from '../../components/Navbar';
import Image10 from '../../img/image10.png';
import SpaGrid from '../../components/SpaGrid';
import Image17 from '../../img/image17.png';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import { useAppSelector } from '../../store/store';

function MainHome() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    if (!user.active) {
      navigate('/user/pending');
    }
  }, [user, navigate]);

  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <Navbar />
      <ToastContainer />
      <div className="flex relative h-[450px] md:h-[598px]">
        <img alt="cover" src={Image10} className="object-cover h-full w-full" />
        <div className="absolute flex flex-col top-0 left-0 justify-center items-center h-full w-full">
          <h1 className="font-bold text-slate-50 text-5xl text-center md:text-8xl d">
            Find your perfect spa
          </h1>
          <div className="flex mt-20">
            <div className="flex flex-col items-center md:flex-row">
              <div>
                <input
                  type="search"
                  className="rounded-full py-3 px-5 w-full md:w-[450px] mr-5 my-3"
                />
              </div>

              <div className="flex items-center justify-center rounded-full bg-[#41924B] py-3 px-5 font-semibold text-slate-50 md:w-[221px]">
                <IoSearchSharp size={20} className="mr-1" />
                <button type="button" className="font-semibold text-slate-50">
                  FIND SPA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center items-center p-5 py-10 bg-slate-50">
        <h1 className="w-fit justify-center items-center text-4xl md:text-6xl text-neutral-950 font-bold">
          SPA NEAR ME
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center bg-slate-50 pb-16">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 my-5 justify-center items-center">
          <SpaGrid />
          <SpaGrid />
          <SpaGrid />
          <SpaGrid />
          <SpaGrid />
          <SpaGrid />
        </div>
      </div>

      <div className="flex relative md:h-[800px] bg-slate-50">
        <img alt="cover" src={Image17} className="object-cover h-full w-full" />
        <div className="absolute flex items-center justify-center top-0 left-0 w-full h-full z-10">
          <h1 className="font-bold text-slate-50 text-4xl md:text-8xl text-center">
            SPAVAILABLE
          </h1>
        </div>
      </div>

      <Menu />
      <Footer />
    </div>
  );
}

export default MainHome;
