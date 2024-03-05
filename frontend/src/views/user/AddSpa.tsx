import { useState } from 'react';
import NavbarLogged from '../../components/Navbar/NavbarLogged';
import { useAppSelector } from '../../store/store';
import Loader from '../../components/Loader Component/Loader';
import BasicInfo from '../../components/BasicInfo';
import SpaInfo from '../../components/SpaInfo';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import { useToast } from '../../hooks/useToast';

function AddSpa() {
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [showBasicInfo, setShowBasicInfo] = useState<boolean>(true);
  const [spaName, setSpaName] = useState<string>('');
  const [spaDesc, setSpaDesc] = useState<string>('');
  const [spaEmail, setSpaEmail] = useState<string>('');
  const [spaContact, setSpaContact] = useState<string>('');
  const [spaAddress, setSpaAddress] = useState<string>('');
  const { showErrorToast, showSuccessToast } = useToast();

  const resetAll = () => {
    setSpaAddress('');
    setSpaName('');
    setSpaDesc('');
    setSpaEmail('');
    setSpaContact('');
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();

    if (!spaEmail || !spaAddress) {
      showErrorToast('Please input all required fields.');
      setLoading(false);
      return;
    }
    setLoading(false);
    showSuccessToast('Successfully created a new spa');
    resetAll();
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
              <BasicInfo
                onNextClick={() => {
                  if (!spaName || !spaDesc) {
                    showErrorToast('Please input all required fields.');
                    return;
                  }
                  setShowBasicInfo(false);
                }}
                setSpaName={setSpaName}
                setSpaDesc={setSpaDesc}
                name={spaName}
                desc={spaDesc}
              />
            ) : (
              <SpaInfo
                onReturnClick={() => setShowBasicInfo(true)}
                setSpaAddress={setSpaAddress}
                setSpaEmail={setSpaEmail}
                setSpaContact={setSpaContact}
                email={spaEmail}
                address={spaAddress}
                contact={spaContact}
                handleSubmit={handleSubmit}
              />
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
