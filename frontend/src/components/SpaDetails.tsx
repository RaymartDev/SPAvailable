import { IoLocationOutline, IoTimeOutline } from 'react-icons/io5';
import StarRating from './StarRating';
import Image12 from '../img/image12.png';

function SpaDetails() {
  return (
    <div className="bg-white ">
      <div className="grid grid-cols-2 items-center justify-center ">
        <div className="card flex justify-start items-center pl-12 ">
          <div className="flex flex-col  justify-start border-b-4 border-black pb-20">
            <h1 className="text-5xl font-bold mb-5">Mandarin Spa</h1>
            <div className="flex items-center mb-5">
              <div>
                <IoLocationOutline size={25} />
              </div>
              <p className="text-xl ml-2 ">
                Congressional Road Brgy 172, Caloocan City, Metro Manila
              </p>
            </div>
            <div className="flex items-center mb-5">
              <div>
                <IoTimeOutline size={25} />
              </div>
              <p className="text-xl ml-2 ">Opens Mon-Sun 8am-6pm</p>
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
            src={Image12}
            className="size-[450px] -mt-10 rounded-lg "
          />
        </div>
      </div>

      <div className="px-12 pb-10 ">
        <div className="border-b-4 border-black pb-10">
          <h1 className="text-4xl font-semibold mb-5">About Us</h1>
          <p className="text-xl leading-10 italic">
            Indulge your senses and rejuvenate your spirit at our exquisite spa
            retreat. Nestled in the heart of Caloocan, our sanctuary offers a
            haven of tranquility amidst the bustling cityscape. Step into a
            world of serenity as our skilled therapists guide you on a journey
            of relaxation and renewal. From soothing massages to invigorating
            body treatments, each experience is tailored to nourish your body,
            mind, and soul. Our luxurious amenities and serene ambiance create
            the perfect setting for blissful escape. Immerse yourself in the
            ultimate pampering experience and emerge refreshed, revitalized, and
            radiant. Welcome to a place where relaxation meets luxury, and every
            moment is designed to elevate your well-being.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SpaDetails;
