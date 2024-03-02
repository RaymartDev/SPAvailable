import { useDeferredValue, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import NavbarLogged from '../../components/Navbar/NavbarLogged';
import Image10 from '../../img/image10.png';
import SpaGrid from '../../components/SpaGrid';
import Image17 from '../../img/image17.png';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import { useAppSelector } from '../../store/store';
import Loader from '../../components/Loader Component/Loader';

function MainHome() {
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchSpa, setSearchSpa] = useState('');
  const searchValue = useDeferredValue(searchSpa);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <NavbarLogged setLoading={setLoading} user={user} />
      <div className="flex relative h-[450px] md:h-[598px]">
        <img alt="cover" src={Image10} className="object-cover h-full w-full" />
        <div className="absolute flex flex-col top-0 left-0 justify-center items-center h-full w-full">
          <h1 className="font-bold text-slate-50 text-5xl text-center md:text-8xl text-stroke-black">
            Find your perfect spa
          </h1>
          <div className="flex mt-20">
            <div className="flex flex-col items-center md:flex-row gap-x-5">
              <div className="relative">
                <FaSearch className="absolute top-1/2 left-5 transform -translate-y-1/2 text-black" />
                <input
                  type="search"
                  className="rounded-full py-3 pl-12 pr-5 w-full md:w-[450px] border-4 border-[#41924B]"
                  placeholder="Search Spa"
                  value={searchSpa}
                  onChange={(e) => setSearchSpa(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="bg-[#41924B] py-3 px-10 rounded-full text-slate-50"
                >
                  Advanced Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center items-center px-5 pt-10 pb-5 bg-white">
        <h1 className="w-fit justify-center items-center text-4xl md:text-6xl text-neutral-950 font-bold">
          SPA NEAR ME
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center bg-white pb-16">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 justify-center items-center">
          <SpaGrid searchSpa={searchValue} />
        </div>
      </div>

      <div className="flex relative md:h-[800px] bg-white">
        <img alt="cover" src={Image17} className="object-cover h-full w-full" />
        <div className="absolute flex items-center justify-center top-0 left-0 w-full h-full z-10 text-stroke-black">
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
