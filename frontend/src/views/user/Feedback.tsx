import { useState } from 'react';
import { BsStarFill } from 'react-icons/bs';
import NavbarLogged from '../../components/Navbar/NavbarLogged';
import { useAppSelector } from '../../store/store';
import Loader from '../../components/Loader Component/Loader';
import Image22 from '../../img/image22.png';
import DefaultPp from '../../img/defaultPp.png';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';

function Feedback() {
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const rating = 1;
  const feedbackTimestamp = new Date('2024-05-18T12:00:00Z');

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={`text-2xl ${star <= rating ? 'text-[#41924B]' : 'text-gray-400'}`}
      >
        <BsStarFill size={40} />
      </span>
    ));
  };

  const timeSincePosted = (timestamp: Date): string => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return `${interval} year${interval > 1 ? 's' : ''} ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return `${interval} month${interval > 1 ? 's' : ''} ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return `${interval} day${interval > 1 ? 's' : ''} ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return `${interval} hour${interval > 1 ? 's' : ''} ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return `${interval} minute${interval > 1 ? 's' : ''} ago`;
    }
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <NavbarLogged setLoading={setLoading} user={user} />
      <div className="flex relative h-[450px] md:h-[598px]">
        <img alt="cover" src={Image22} className="object-cover h-full w-full" />
        <div className="absolute flex flex-col top-0 left-0 justify-center items-center h-full w-full">
          <h1 className="font-bold text-slate-50 text-5xl text-center md:text-8xl text-stroke-black">
            Customers Feedback
          </h1>
        </div>
      </div>
      <div className="py-20 px-10 bg-white min-h-fit flex flex-col">
        <div className="flex w-full flex-col space-y-8">
          <div className="flex flex-col">
            <div className="flex items-center space-x-5">
              <img
                src={DefaultPp}
                alt="profilePicture"
                className="size-16 object-cover rounded-full object-center"
              />
              <h1 className="text-xl">James Allan</h1>
            </div>
            <div className="pl-20">
              <div className="flex">{renderStars()}</div>
            </div>
          </div>
          <div className="pl-20">
            <div className="border-2 border-black px-6 py-8 bg-[#CCD3CA] rounded-2xl">
              <p className=" whitespace-pre-wrap break-words">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia,
                harum? A est temporibus accusamus fugit, incidunt natus? Facere
                aut, tenetur a doloribus ducimus ut illo itaque animi, adipisci
                molestias quia.
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <p className="text-lg">{timeSincePosted(feedbackTimestamp)}</p>
          </div>
        </div>
      </div>
      <Menu />
      <Footer />
    </div>
  );
}

export default Feedback;
