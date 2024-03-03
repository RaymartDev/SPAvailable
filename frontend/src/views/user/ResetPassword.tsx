import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer';
import { useToast } from '../../hooks/useToast';

function ChangePassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [visibleNewPass, setVisibleNewPass] = useState(false);
  const [visibleReNewPass, setVisibleReNewPass] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

  useEffect(() => {
    if (!email) {
      navigate('/');
    }
  }, [email, location.search, navigate]);

  const { showErrorToast } = useToast();

  const toggleNewPassword = () => {
    setVisibleNewPass(!visibleNewPass);
  };

  const toggleReNewPassword = () => {
    setVisibleReNewPass(!visibleReNewPass);
  };

  const handleResetPassword = () => {
    if (!newPassword || !confirmNewPassword) {
      showErrorToast('Please fill all required fields');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }
    setErrorMessage('');
  };

  if (email) {
    return (
      <div className="max-w-screen-2xl max-h-screen mx-auto px-4 md:overflow-hidden">
        <Navbar />
        <div className="flex flex-col h-screen">
          <div className="flex flex-col justify-center items-center bg-white p-10 h-4/5">
            <div className="flex flex-col w-9/12 items-center p-10 h-4/5 rounded-lg gap-y-10">
              <div className="flex flex-col items-center gap-y-5">
                <h1 className="text-5xl">Reset Account Password</h1>
                <h1 className="text-xl">
                  Enter for a new password for {email}
                </h1>
              </div>
              <div className="flex flex-col gap-y-5 w-1/2">
                <div className="flex items-center border-2 border-black rounded relative">
                  <input
                    type={visibleNewPass === false ? 'password' : 'text'}
                    className="w-full px-1 pl-5 py-3"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <div className="absolute right-0 top-0 bottom-0 flex items-center px-2">
                    {visibleNewPass === false ? (
                      <BsFillEyeSlashFill
                        size={25}
                        onClick={toggleNewPassword}
                      />
                    ) : (
                      <BsFillEyeFill size={25} onClick={toggleNewPassword} />
                    )}
                  </div>
                </div>
                <div className="flex items-center border-2 border-black rounded relative">
                  <input
                    type={visibleReNewPass === false ? 'password' : 'text'}
                    className="w-full px-1 pl-5 py-3"
                    placeholder="Confirm New Password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                  <div className="absolute right-0 top-0 bottom-0 flex items-center px-2">
                    {visibleReNewPass === false ? (
                      <BsFillEyeSlashFill
                        size={25}
                        onClick={toggleReNewPassword}
                      />
                    ) : (
                      <BsFillEyeFill size={25} onClick={toggleReNewPassword} />
                    )}
                  </div>
                </div>
                <div className="h-8">
                  {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  className="bg-[#41924B] rounded-full font-semibold px-16 py-3 text-lg text-slate-50"
                  onClick={handleResetPassword}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default ChangePassword;
