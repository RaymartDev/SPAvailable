/* eslint-disable react/no-unescaped-entities */
import Navbar from '../../components/Navbar/Navbar';
import OurTeam from '../../components/OurTeam';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import Image17 from '../../img/image17.png';

function AboutUs() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <Navbar />
      <div className="relative h-[602px] md:h-[602px]">
        <img
          src={Image17}
          alt="Background"
          className="object-cover h-full w-full"
        />
        <div className="absolute flex flex-col gap-y-4 md:gap-y-10 items-center justify-center top-0 left-0 w-full h-full z-10 bg-neutral-950 bg-opacity-50 p-4 md:p-20">
          <h1 className="font-bold text-slate-50 text-2xl md:text-4xl lg:text-7xl text-center font-poppins">
            ABOUT US
          </h1>
          <p className="whitespace-pre-wrap break-words text-slate-50 text-center text-sm md:text-lg px-4 md:px-10 max-w-full md:max-w-4xl">
            Welcome to SPAvailable, an easy way to find a spa near you. At
            SPAvailable, we recognize the value of self-care and relaxing in
            today's hectic environment. Our objective is to connect individuals
            with top-rated spas and wellness centers, helping them find the
            ideal refuge to refresh mind, body, and spirit. Whether you're in
            need of a soothing massage, a refreshing facial, or a luxurious spa
            day, we've got you covered. Our user-friendly portal offers a
            selected variety of spa services and feedback from other spa-goers.
            We collaborate with renowned spa providers who share our dedication
            to outstanding service and client happiness. Our platform thoroughly
            vets all spas to provide a high-quality experience for users.Join us
            on a journey of relaxation and rejuvenation. Discover your perfect
            spa experience today with SPAvailable.
          </p>
        </div>
      </div>
      <div className="flex bg-[#41924B] h-32 md:h-52 justify-center items-center">
        <p className="font-bold text-center w-4/5 md:w-3/5 text-2xl md:text-4xl lg:text-6xl text-slate-50">
          OUR TEAM
        </p>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-white">
          <OurTeam />
        </div>
      </div>
      <Menu />
      <Footer />
    </div>
  );
}

export default AboutUs;
