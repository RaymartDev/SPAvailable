import { useState } from 'react';
import NavbarLogged from '../../components/Navbar/NavbarLogged';
import { useAppSelector } from '../../store/store';
import Loader from '../../components/Loader Component/Loader';
import BasicInfo from '../../components/BasicInfo';
import SpaInfo from '../../components/SpaInfo';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';

function AddSpa() {
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [showBasicInfo, setShowBasicInfo] = useState<boolean>(true);

  const handleNextClick = () => {
    setShowBasicInfo(false);
  };

  const handleReturnClick = () => {
    setShowBasicInfo(true);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <NavbarLogged setLoading={setLoading} user={user} />
      <div className="flex flex-col h-screen bg-white">
        <div className="bg-white h-full">
          <div className="h-5/6">
            {showBasicInfo ? (
              <BasicInfo onNextClick={handleNextClick} />
            ) : (
              <SpaInfo onReturnClick={handleReturnClick} />
            )}
          </div>
          <Menu />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AddSpa;
