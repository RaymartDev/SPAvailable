/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { useAppDispatch } from '../../store/store';
import { verify } from '../../store/reducer/userSlice';

function VerifyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { showErrorToast, showSuccessToast } = useToast();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const verifyToken = async (tokenToVerify: string) => {
      try {
        const response = await axios.get(
          `/api/v1/user/verify?token=${tokenToVerify}`
        );
        if (response.status === 200) {
          dispatch(verify());
          showSuccessToast('Successfully verified');
          const timeoutId = setTimeout(() => {
            navigate('/user/dashboard');
          }, 1500);
          return () => clearTimeout(timeoutId);
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          showErrorToast(err);
        } else {
          showErrorToast('Unable to register');
        }
      }
    };

    if (!token) {
      // Redirect to home page after 5 seconds
      const timeoutId = setTimeout(() => {
        navigate('/');
      }, 3000);

      return () => clearTimeout(timeoutId);
    }

    verifyToken(token);
  }, [location.search]);

  return (
    <div>
      <h2>Verification Page</h2>
      <p>Verifying...</p>
    </div>
  );
}

export default VerifyPage;
