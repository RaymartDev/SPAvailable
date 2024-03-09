import { IoLocationOutline, IoTimeOutline } from 'react-icons/io5';
import StarRating from './StarRating';
import Image12 from '../img/image12.png';
import SpaState from '../interface/SpaState';

function SpaDetails({ item }: { item: SpaState }) {
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

  return (
    <div className="bg-white ">
      <div className="grid grid-cols-2 items-center justify-center ">
        <div className="card flex justify-start items-center pl-12 ">
          <div className="flex flex-col  justify-start border-b-4 border-black pb-20">
            <h1 className="text-5xl font-bold mb-5">{item?.name}</h1>
            <div className="flex items-center mb-5">
              <div>
                <IoLocationOutline size={25} />
              </div>
              <p className="text-xl ml-2 ">{item?.address}</p>
            </div>
            <div className="flex items-center mb-5">
              <div>
                <IoTimeOutline size={25} />
              </div>
              <p className="text-xl ml-2 ">
                Opens{' '}
                {item?.openTime && item.closeTime
                  ? `${formatTime(item.openTime)} - ${formatTime(item.closeTime)}`
                  : ''}
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-2xl mr-2 font-semibold">5.0</p>
              <StarRating totalStars={5} />
              <p className="text-lg ml-2">(10,020 reviews)</p>
            </div>
          </div>
        </div>

        <div className="card flex items-center justify-center z-10 ">
          <img
            alt=""
            src={item?.display_photo || Image12}
            className="size-[450px] -mt-20 rounded-lg"
          />
        </div>
      </div>

      <div className="px-12 pb-10 ">
        <div className="border-b-4 border-black pb-10">
          <h1 className="text-4xl font-semibold mb-5">About Us</h1>
          <p className="text-xl leading-10 italic">{item?.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default SpaDetails;
