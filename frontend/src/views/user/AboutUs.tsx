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
      <div className="flex relative md:h-[602px]">
        <img
          src={Image17}
          alt="Background"
          className="object-cover h-full w-full"
        />
        <div className="absolute flex items-center justify-center top-0 left-0 w-full h-full z-10">
          <h1 className="font-bold text-slate-50 text-4xl md:text-6xl text-center">
            ABOUT US
          </h1>
        </div>
      </div>
      <div className="p-10">
        <p className="word-spacing-wide">
          Welcome to SPAvailable, your trusted platform for discovering and
          scheduling spa appointments with ease. At SPAvailable, we understand
          the importance of self-care and relaxation in today's busy world. Our
          mission is to connect individuals with top-rated spas and wellness
          centers, helping them find the perfect sanctuary to rejuvenate mind,
          body, and spirit. Whether you're in need of a soothing massage, a
          refreshing facial, or a luxurious spa day, we've got you covered. Our
          user-friendly platform allows you to explore a curated selection of
          spa services, read reviews from fellow spa- goers, and conveniently
          book appointments online. We pride ourselves on partnering with
          reputable spa providers who share our commitment to exceptional
          service and customer satisfaction. Each spa listed on our platform is
          carefully vetted to ensure a premium experience for our users. At
          SPAvailable, we're more than just a booking platform - we're your
          trusted wellness companion. Our goal is to make self-care accessible
          and enjoyable for everyone, empowering you to prioritize your
          well-being in a hectic world. Join us on a journey of relaxation and
          rejuvenation. Discover your perfect spa experience today with
          SPAvailable.
        </p>
      </div>
      <div className="flex bg-[#41924B] h-52 justify-center items-center">
        <p className="font-bold text-center w-3/5 text-4xl md:text-6xl text-slate-50">
          OUR TEAM
        </p>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-10 bg-slate-50">
          <OurTeam />
        </div>
      </div>
      <Menu />
      <Footer />
    </div>
  );
}
export default AboutUs;
