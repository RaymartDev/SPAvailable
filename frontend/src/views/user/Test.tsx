import { useState } from 'react';
import Logo from '../../img/logo.png';
import AddProductModal from '../../components/Modal/AddProductModal';
import AddServiceModal from '../../components/Modal/AddServiceModal';
import ProductSwiper from '../../components/ProductSwiper';

function Test() {
  const [openProductModal, setOpenProductModal] = useState(false);
  const [openServiceModal, setOpenServiceModal] = useState(false);

  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <div className="max-w-screen-2xl mx-auto flex sticky top-0 justify-between items-center py-2 md:py-4 z-20 bg-white shadow-lg ">
        <div className="flex items-center pl-5">
          <div className="mr-2">
            <img alt="logo" src={Logo} className="size-16 md:size-14" />
          </div>
          <div className="flex cursor-pointer text-2xl md:text-3xl font-bold text-[#05bc64]">
            SPA<h1 className="text-neutral-950">vailable.</h1>{' '}
          </div>
        </div>
        <div>
          <button
            type="button"
            onClick={() => setOpenProductModal(true)}
            className="mr-5 font-bold hover:rounded p-3 hover:bg-[#41924B] hover:text-slate-50"
          >
            ADD PRODUCT
          </button>
          <AddProductModal
            open={openProductModal}
            onClose={() => {
              setOpenProductModal(false);
            }}
          />

          <button
            type="button"
            onClick={() => setOpenServiceModal(true)}
            className="mr-5 font-bold hover:rounded p-3 hover:bg-[#41924B] hover:text-slate-50"
          >
            ADD SERVICE
          </button>
          <AddServiceModal
            open={openServiceModal}
            onClose={() => {
              setOpenServiceModal(false);
            }}
          />
        </div>
      </div>
      <ProductSwiper />
    </div>
  );
}

export default Test;
