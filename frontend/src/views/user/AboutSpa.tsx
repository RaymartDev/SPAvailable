/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import NavbarLogged from '../../components/NavbarLogged';
import SpaDetails from '../../components/SpaDetails';
import Services from '../../components/Services';
import Products from '../../components/Products';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import Image11 from '../../img/image11.png';

function AboutSpa() {
  
  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      
      <NavbarLogged/>

      <div className="flex relative h-[450px] md:h-[748px] z-10">
        <img src={Image11} className="object-cover h-full w-full" />
        <div className="absolute flex flex-col top-0 left-0 justify-center items-center h-full w-full">
          <h1 className="font-bold text-slate-50 text-5xl text-center md:text-8xl italic">
            You Oasis Of Relaxation
          </h1>
        </div>
      </div>

      <SpaDetails />

      <Services />

      <Products />

      <Menu />

      <Footer />
    </div>
  );
}

export default AboutSpa;
