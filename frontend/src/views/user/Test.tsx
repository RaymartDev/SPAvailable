import { useState } from 'react';
import Logo from '../../img/logo.png';
import TermsModal from '../../components/Modal/TermsModal';
import ForgotPModal from '../../components/Modal/ForgotPModal';
import RatingModal from '../../components/Modal/RatingModal';

function Test() {
  const [openTermsModal, setOpenTermsModal] = useState(false);
  const [openPrivacyModal, setOpenPrivacyModal] = useState(false);
  const [openRatingModal, setOpenRatingModal] = useState(false);

  return (
    <div className="max-w-screen-2xl mx-auto flex sticky top-0 justify-between items-center py-2 md:py-4 z-20 bg-white shadow-lg ">
      <div className="flex items-center pl-5">
        <div className="mr-2">
          <img alt="logo" src={Logo} className="size-16 md:size-14" />
        </div>
        <div className="flex cursor-pointer text-2xl md:text-3xl font-bold text-[#05bc64]">
          SPA<h1 className="text-neutral-950">vailable</h1>{' '}
        </div>
      </div>
      <div>
        <button
          type="button"
          onClick={() => setOpenTermsModal(true)}
          className="mr-5 font-bold hover:rounded p-3 hover:bg-[#41924B] hover:text-slate-50"
        >
          Terms
        </button>
        <TermsModal
          open={openTermsModal}
          onClose={() => {
            setOpenTermsModal(false);
          }}
        />
        <button
          type="button"
          onClick={() => setOpenPrivacyModal(true)}
          className="mr-5 font-bold hover:rounded p-3 hover:bg-[#41924B] hover:text-slate-50"
        >
          Forgot Password
        </button>
        <ForgotPModal
          open={openPrivacyModal}
          user=""
          onClose={() => {
            setOpenPrivacyModal(false);
          }}
        />
        <button
          type="button"
          onClick={() => setOpenRatingModal(true)}
          className="mr-5 font-bold hover:rounded p-3 hover:bg-[#41924B] hover:text-slate-50"
        >
          Rating
        </button>
        <RatingModal
          open={openRatingModal}
          onClose={() => {
            setOpenRatingModal(false);
          }}
        />
      </div>
    </div>
  );
}

export default Test;
