import { useState } from 'react';
import { useAppSelector } from '../../store/store';
import Loader from '../../components/Loader Component/Loader';
import NavbarLogged from '../../components/Navbar/NavbarLogged';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import Image24 from '../../img/image24.png';

function AboutService() {
  const [loading, setLoading] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <NavbarLogged setLoading={setLoading} user={user} />
      <div className="h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white h-5/6">
          <div className="card flex justify-center items-center px-4">
            <div className="lg:w-5/6 lg:h-1/2">
              <img
                src={Image24}
                alt=""
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
          <div className="card flex flex-col justify-center items-center overflow-auto">
            <div className="flex flex-col gap-y-8 w-5/6 h-1/2">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold">
                  Facial Treatments
                </h1>
              </div>
              <div className="flex flex-col justify-center gap-y-2">
                <h1 className="text-2xl font-semibold">Description</h1>
                <p className="text-sm lg:text-base">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Enim, placeat quibusdam aut quasi maxime laudantium, rem alias
                  optio laborum vel repellendus consequuntur culpa ut ipsum
                  numquam illum odio nam quam.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Menu />
        <Footer />
      </div>
    </div>
  );
}

export default AboutService;
