/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import { useNavigate } from 'react-router-dom';
import Image11 from '../img/image11.png';
import StarRating from './StarRating';
import DefaultPp from '../img/defaultPp.png';
import SpaState from '../interface/SpaState';
import SearchMode from '../interface/SearchMode';
import { useAppSelector } from '../store/store';

function SpaGrid({
  searchSpa,
  spaItems,
  searchMode,
}: {
  searchSpa: string;
  spaItems: SpaState[];
  searchMode: SearchMode;
}) {
  const navigate = useNavigate();

  const items = spaItems;
  const user = useAppSelector((state) => state.user);

  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':');
    const intHours = parseInt(hours, 10); // Parse hours as an integer
    let formattedTime = '';

    if (intHours > 12) {
      formattedTime += `${intHours - 12}:${minutes} PM`;
    } else if (intHours === 0) {
      formattedTime += `12:${minutes} AM`;
    } else if (intHours === 12) {
      formattedTime += `12:${minutes} PM`;
    } else {
      formattedTime += `${hours}:${minutes} AM`;
    }

    return formattedTime;
  };

  const filteredItems = items.filter((item) => {
    const searchName = item?.name?.toLowerCase();
    const matchesSearch =
      searchName && searchName.includes(searchSpa.toLowerCase());

    if (searchMode === SearchMode.OWNED) {
      const isOwnedByUser = item?.owner?.id === user?.id;
      return matchesSearch && isOwnedByUser;
    }
    return matchesSearch;
  });

  const filteredItemsOwned = items.filter((item) => {
    if (searchMode === SearchMode.OWNED) {
      const isOwnedByUser = item?.owner?.id === user?.id;
      return isOwnedByUser;
    }
    return item;
  });

  function limitString(inputString: string, maxLength: number): string {
    if (inputString.length <= maxLength) {
      return inputString;
    }
    return `${inputString.substring(0, maxLength)} ...`;
  }

  if (searchSpa) {
    return (
      <div
        className={`max-w-screen-2xl mx-auto grid my-5 justify-center items-center grid-cols-1 ${
          filteredItemsOwned.length === 0 || filteredItems.length === 0
            ? 'place-items-center'
            : 'md:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {filteredItemsOwned.length > 0 && filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item?.id}
              className="rounded-3xl border-2 p-2 mx-4 mt-4 hover:shadow-lg w"
              onClick={() =>
                navigate('/spa/about', {
                  state: { item },
                })
              }
            >
              <div className="flex flex-col h-full cursor-pointer p-5 ">
                <div className="w-full h-[300px] overflow-hidden">
                  <img
                    src={item?.display_photo || Image11}
                    className="object-cover w-full h-full rounded-3xl  hover:scale-125 transition-all ease-in-out delay-150  duration-500"
                    alt={item?.name}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <h1 className="font-bold text-2xl text-neutral-950 mt-5">
                    {item?.name}
                  </h1>
                  <h1 className="mt-5 text-[#41924B] font-semibold">
                    {item?.openTime && item.closeTime
                      ? `${formatTime(item.openTime)} - ${formatTime(item.closeTime)}`
                      : ''}
                  </h1>
                </div>
                <div className="flex items-center gap-x-2">
                  <img
                    src={item?.owner?.profile || DefaultPp}
                    alt=""
                    className="size-8 rounded-full object-cover object-center border-[1px] border-[#41924B]"
                  />
                  <h1>{item?.owner?.name || 'Creator'}</h1>
                </div>
                <p className="text-sm my-2">
                  {limitString(item?.address || 'address', 52)}
                </p>
                <StarRating totalStars={5} />
                <div className="flex items-center justify-center my-5">
                  <button
                    type="button"
                    onClick={() =>
                      navigate('/spa/about', {
                        state: { item },
                      })
                    }
                    className="transition-all ease-in-out delay-150 rounded-full bg-[#41924B] font-semibold text-sm text-slate-50 py-3 px-10 hover:text-[#41924B] hover:bg-slate-50 hover:border-neutral-950 hover:border-[1px] border-green-800 border-[1px]"
                  >
                    SEE MORE
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-10">
            <p className="text-2xl text-[#41924B] font-bold">
              No results found.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`max-w-screen-2xl mx-auto grid grid-cols-1 my-5 justify-center items-center ${items.length === 0 || filteredItemsOwned.length === 0 ? 'place-items-center' : 'md:grid-cols-2 lg:grid-cols-3'}`}
    >
      {filteredItemsOwned.length > 0 &&
        filteredItemsOwned.map((item) => (
          <div
            key={item?.id}
            className="rounded-3xl border-2 p-2 mx-4 mt-4 hover:shadow-lg"
            onClick={() =>
              navigate('/spa/about', {
                state: { item },
              })
            }
          >
            <div className="flex flex-col h-full cursor-pointer p-5 gap-y-2">
              <div className="w-full h-[300px] overflow-hidden rounded-3xl">
                <img
                  src={item?.display_photo || Image11}
                  className="object-cover w-full h-full rounded-3xl  hover:scale-125 transition-all ease-in-out delay-150  duration-500"
                  alt={item?.name}
                />
              </div>
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-2xl text-neutral-950 mt-5">
                  {item?.name}
                </h1>
                <h1 className="mt-5 text-[#41924B] font-semibold">
                  {item?.openTime && item.closeTime
                    ? `${formatTime(item.openTime)} - ${formatTime(item.closeTime)}`
                    : ''}
                </h1>
              </div>
              <div className="flex items-center gap-x-2">
                <img
                  src={item?.owner?.profile || DefaultPp}
                  alt=""
                  className="size-8 rounded-full object-cover object-center border-[1px] border-[#41924B]"
                />
                <h1>{item?.owner?.name || 'Creator'}</h1>
              </div>

              <p className="text-sm">
                {limitString(item?.address || 'address', 52)}
              </p>
              <StarRating totalStars={5} />
              <div className="flex items-center justify-center mt-5">
                <button
                  type="button"
                  onClick={() =>
                    navigate('/spa/about', {
                      state: { item },
                    })
                  }
                  className="transition-all ease-in-out delay-150 rounded-full bg-[#41924B] font-semibold text-sm text-slate-50 py-3 px-10 hover:text-[#41924B] hover:bg-slate-50 hover:border-neutral-950 hover:border-[1px] border-green-800 border-[1px]"
                >
                  SEE MORE
                </button>
              </div>
            </div>
          </div>
        ))}
      {filteredItemsOwned.length === 0 && (
        <div className="p-10">
          <p className="text-2xl text-[#41924B] font-bold">
            There are no Spa posted at the moment.
          </p>
        </div>
      )}
    </div>
  );
}

export default SpaGrid;
