import { IoSearchSharp } from 'react-icons/io5';
import { useState } from 'react';
import NavbarLogged from '../../components/Navbar/NavbarLogged';
import Image22 from '../../img/image22.png';
import ProductComp from '../../components/ProductComp';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import { useAppSelector } from '../../store/store';
import Loader from '../../components/Loader Component/Loader';

function Product() {
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <NavbarLogged setLoading={setLoading} user={user} />
      <div className="flex relative h-[450px] md:h-[598px]">
        <img alt="cover" src={Image22} className="object-cover h-full w-full" />
        <div className="absolute flex flex-col top-0 left-0 justify-center items-center h-full w-full">
          <h1 className="font-bold text-slate-50 text-5xl text-center md:text-8xl">
            PRODUCT
          </h1>
          <div className="flex mt-20">
            <div className="flex flex-col items-center md:flex-row">
              <div>
                <input
                  type="search"
                  className="rounded-full py-3 px-5 w-full md:w-[450px] mr-5 my-3"
                />
              </div>

              <div className="flex items-center justify-center rounded-full bg-[#41924B] py-3 px-5 font-semibold text-slate-50 md:w-[221px]">
                <IoSearchSharp size={20} className="mr-1" />
                <button type="button" className="font-semibold text-slate-50">
                  SEARCH
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-white">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 justify-center items-center">
          <ProductComp />
        </div>
      </div>

      <Menu />
      <Footer />
    </div>
  );
}

export default Product;
