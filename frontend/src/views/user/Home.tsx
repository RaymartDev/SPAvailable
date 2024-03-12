import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import axios, { AxiosError } from 'axios';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import NavbarLogged from '../../components/Navbar/NavbarLogged';
import Image10 from '../../img/image10.png';
import SpaGrid from '../../components/SpaGrid';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import { useAppDispatch, useAppSelector } from '../../store/store';
import Loader from '../../components/Loader Component/Loader';
import SearchMode from '../../interface/SearchMode';
import { useToast } from '../../hooks/useToast';
import { setSpa } from '../../store/reducer/spaSlice';
import SpaState from '../../interface/SpaState';
import useDebounce from '../../hooks/useDebounce';

function MainHome() {
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchSpa, setSearchSpa] = useState('');
  const debouncedSearchTerm = useDebounce(searchSpa, 300);
  const navigate = useNavigate();
  const [searchMode, setSearchMode] = useState<SearchMode>(SearchMode.ALL);
  const [page, setPage] = useState<number>(1);

  const spaList: SpaState[] = useAppSelector((state) => state.spa);

  const dispatch = useAppDispatch();
  const { showErrorToast } = useToast();

  useEffect(() => {
    if (spaList.length > 0) {
      return () => {};
    }
    const source = axios.CancelToken.source();
    const handleFetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/v1/spa/control', {
          cancelToken: source.token,
        });
        const responseState: SpaState[] = response.data;
        if (response.status === 304) {
          setLoading(false);
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
  }, [spaList]);

  const handleAddSpaClick = () => {
    navigate('/user/add-spa');
  };

  const maxPage = Math.max(
    Math.ceil(
      spaList.filter((item) => {
        if (searchMode === SearchMode.OWNED) {
          const isOwnedByUser = item?.owner?.id === user?.id;
          return isOwnedByUser;
        }
        return item;
      }).length / 9
    ),
    1
  );

  const handlePrevPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  const handleNextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (page === maxPage) {
      return;
    }
    setPage(page + 1);
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
              setPage(1);
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
              setPage(1);
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

      <div className="flex flex-col items-center justify-center gap-24 bg-white pb-16 min-h-[37.5em]">
        <SpaGrid
          setLoading={setLoading}
          searchSpa={debouncedSearchTerm}
          spaItems={spaList}
          searchMode={searchMode}
          page={page}
        />
      </div>
      <div className="flex bg-white items-center justify-center pb-10">
        <div className="bg-[#41924B] flex justify-between items-center px-5 py-2 gap-x-20 text-white rounded-lg">
          <button
            type="button"
            onClick={handlePrevPage}
            className="hover:bg-white p-3 hover:text-black rounded-full"
          >
            <FaArrowLeftLong />
          </button>
          <div className="flex gap-x-5 items-center">
            <h1 className="p-3 font-semibold">{page}</h1>
            <p className="font-semibold">/</p>
            <h1 className="p-3 font-semibold">{maxPage}</h1>
          </div>
          <button
            type="button"
            onClick={handleNextPage}
            className="hover:bg-white p-3 hover:text-black rounded-full"
          >
            <FaArrowRightLong />
          </button>
        </div>
      </div>

      <Menu />
      <Footer />
    </div>
  );
}

export default MainHome;
