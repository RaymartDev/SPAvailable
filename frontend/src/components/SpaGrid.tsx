import { useState } from 'react';
import Image11 from '../img/image11.png';
import StarRating from './StarRating';
import SpaModal from './SpaModal';

function SpaGrid() {
  const [openSpaModal, setsSpaModal] = useState(false);

  return (
    <div className="rounded-3xl border-2 p-2 mx-4 mt-4 hover: shadow-lg h-max">
      <div>
        <img alt="" src={Image11} className="rounded-3xl" />
      </div>
      <div className="flex flex-col mt-5 ml-5 w-fit">
        <h1 className="font-bold text-2xl text-neutral-950">Mandarin Spa</h1>
        <p className="text-sm my-2">
          Congressional Road Brgy 171, Caloocan City, Metro Manila
        </p>
        <StarRating totalStars={5} />
      </div>
      <div className="flex items-center justify-center my-5">
        <button
          type="button"
          onClick={() => setsSpaModal(true)}
          className="rounded-full bg-[#41924B] font-semibold text-sm text-slate-50 py-3 px-10 hover:text-[#41924B] hover:bg-slate-50 hover:border-neutral-950 hover:border-2"
        >
          SEE MORE
        </button>
        <SpaModal open={openSpaModal} onClose={() => setsSpaModal(false)} />
      </div>
    </div>
  );
}

export default SpaGrid;
