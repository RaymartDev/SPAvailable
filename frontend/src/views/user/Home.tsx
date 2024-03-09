import { useDeferredValue, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import axios, { AxiosError } from 'axios';
import NavbarLogged from '../../components/Navbar/NavbarLogged';
import Image10 from '../../img/image10.png';
import SpaGrid from '../../components/SpaGrid';
import Image17 from '../../img/image17.png';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import { useAppDispatch, useAppSelector } from '../../store/store';
import Loader from '../../components/Loader Component/Loader';
import SearchMode from '../../interface/SearchMode';
import { useToast } from '../../hooks/useToast';
import { setSpa } from '../../store/reducer/spaSlice';
import SpaState from '../../interface/SpaState';

function MainHome() {
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchSpa, setSearchSpa] = useState('');
  const searchValue = useDeferredValue(searchSpa);
  const navigate = useNavigate();
  const [searchMode, setSearchMode] = useState<SearchMode>(SearchMode.ALL);

  const spaList: SpaState[] = useAppSelector((state) => state.spa);

  const dispatch = useAppDispatch();
  const { showErrorToast } = useToast();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const handleFetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/v1/spa/control', {
          cancelToken: source.token,
        });
        const responseState: SpaState[] = response.data;
        if (response.status === 304) {
          return;
        }
        if (responseState.length > 0) {
          dispatch(setSpa(responseState));
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          showErrorToast(err);
        } else {
          showErrorToast('Unable to fetch Spa List');
        }
      } finally {
        setLoading(false);
      }
    };

    handleFetch();

    return () => {
      source.cancel('Request canceled by cleanup');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddSpaClick = () => {
    navigate('/user/add-spa');
  };

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

      <div className="flex w-full justify-between items-center px-10 pt-10 pb-5 bg-white">
        <div className="flex gap-x-5">
          <button
            type="button"
            onClick={() => {
              if (searchMode === SearchMode.ALL) return;
              setSearchMode(SearchMode.ALL);
            }}
            className={`${searchMode === SearchMode.ALL ? 'bg-[#41924B]' : 'bg-white'} border-2 border-[#41924B] ${searchMode === SearchMode.ALL ? 'text-white' : 'text-[#41924B]'} rounded-full w-36 font-semibold py-2`}
          >
            ALL
          </button>
          <button
            type="button"
            onClick={() => {
              if (searchMode === SearchMode.OWNED) return;
              setSearchMode(SearchMode.OWNED);
            }}
            className={`${searchMode === SearchMode.OWNED ? 'bg-[#41924B]' : 'bg-white'} border-2 border-[#41924B] ${searchMode === SearchMode.OWNED ? 'text-white' : 'text-[#41924B]'} rounded-full w-36 font-semibold py-2`}
          >
            OWNED
          </button>
        </div>
        <div>
          <button
            type="button"
            className="bg-[#41924B] border-2 border-[#41924B] text-white rounded-full w-36 flex justify-center items-center font-semibold py-2"
            onClick={handleAddSpaClick}
          >
            ADD SPA{' '}
            <p>
              <GoPlus size={20} />
            </p>{' '}
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-white pb-16">
        <SpaGrid
          searchSpa={searchValue}
          spaItems={spaList}
          searchMode={searchMode}
        />
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
