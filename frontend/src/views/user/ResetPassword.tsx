import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios, { AxiosError } from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer';
import { useToast } from '../../hooks/useToast';
import Loader from '../../components/Loader Component/Loader';

interface DecodedToken {
  email: string;
}

function ChangePassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [visibleNewPass, setVisibleNewPass] = useState(false);
  const [visibleReNewPass, setVisibleReNewPass] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const decodeToken = (toke: string | null): DecodedToken | null => {
    return toke ? jwtDecode(toke) : null;
  };

  const isTokenExpired = useCallback((toke: string | null) => {
    if (!toke) {
      return true; // Treat undefined/null token as expired
    }

    const decodedToken = jwtDecode(toke as string);

    if (!decodedToken.exp) {
      return true; // If there is no expiration time, treat as expired
    }

    // Check if current time is greater than expiration time
    return Date.now() >= decodedToken.exp * 1000;
  }, []);

  const { showErrorToast, showSuccessToast } = useToast();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
    if (isTokenExpired(token)) {
      navigate('/');
      showErrorToast('Token expired');
    }
  }, [showErrorToast, token, location.search, navigate, isTokenExpired]);

  const toggleNewPassword = () => {
    setVisibleNewPass(!visibleNewPass);
  };

  const toggleReNewPassword = () => {
    setVisibleReNewPass(!visibleReNewPass);
  };

  const handleResetPassword = async () => {
    setLoading(true);
    if (!newPassword || !confirmNewPassword) {
      showErrorToast('Please fill all required fields');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Passwords don't match.");
      setLoading(false);
      return;
    }
    const toUpdate = {
      email: decodeToken(token)?.email,
      password: newPassword,
    };
    try {
      const response = await axios.put('/api/v1/user/reset', toUpdate);
      if (response.status === 200) {
        showSuccessToast('Successfully updated password');
        setNewPassword('');
        setConfirmNewPassword('');
        navigate('/');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        showErrorToast(err);
      } else {
        showErrorToast('Unable to reset password');
      }
    } finally {
      setLoading(false);
    }
  };

  const getDecodedEmail = (toke: string) => {
    const decoded = decodeToken(toke);
    if (decoded) {
      return decoded.email;
    }
    return '';
  };

  if (loading) {
    return <Loader />;
  }

  if (token) {
    return (
      <div className="max-w-screen-2xl max-h-screen mx-auto px-4 md:overflow-hidden">
        <Navbar />
        <div className="flex flex-col h-screen">
          <div className="flex flex-col justify-center items-center bg-white p-10 h-4/5">
            <div className="flex flex-col w-9/12 items-center p-10 h-4/5 rounded-lg gap-y-10">
              <div className="flex flex-col items-center gap-y-5">
                <h1 className="text-5xl">Reset Account Password</h1>
                <h1 className="text-xl">
                  Enter for a new password for {` ${getDecodedEmail(token)}`}
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
