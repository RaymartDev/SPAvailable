import { useDeferredValue, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import NavbarLogged from '../../components/Navbar/NavbarLogged';
import Image23 from '../../img/image23.png';
import ServiceComp from '../../components/ServiceComp';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import { useAppSelector } from '../../store/store';
import Loader from '../../components/Loader Component/Loader';

function Service() {
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchService, setSearchService] = useState('');
  const searchValue = useDeferredValue(searchService);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <NavbarLogged setLoading={setLoading} user={user} />
      <div className="flex relative h-[450px] md:h-[598px]">
        <img alt="cover" src={Image23} className="object-cover h-full w-full" />
        <div className="absolute flex flex-col top-0 left-0 justify-center items-center h-full w-full">
          <h1 className="font-bold text-slate-50 text-5xl text-center md:text-8xl text-stroke-black">
            SERVICES
          </h1>
          <div className="flex mt-20">
            <div className="flex flex-col items-center md:flex-row gap-x-5">
              <div className="relative">
                <FaSearch className="absolute top-1/2 left-5 transform -translate-y-1/2 text-black" />
                <input
                  type="search"
                  className="rounded-full py-3 pl-12 pr-5 w-full md:w-[450px] border-4 border-[rgb(65,146,75)]"
                  placeholder="Search Service"
                  value={searchService}
                  onChange={(e) => setSearchService(e.target.value)}
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

      <div className="flex flex-col items-center justify-center bg-white">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 justify-center items-center">
          <ServiceComp searchService={searchValue} />
        </div>
      </div>

      <Menu />
      <Footer />
    </div>
  );
}

export default Service;
