/* eslint-disable import/prefer-default-export */
import { AxiosError } from 'axios';
import { Bounce, toast } from 'react-toastify';

export const useToast = () => {
  const showErrorToast = (message: string | AxiosError) => {
    let errorMessage: string;
    if (typeof message === 'string') {
      errorMessage = message;
    } else {
      errorMessage =
        (message as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || 'Unknown error occurred';
    }
    toast.error(errorMessage, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
  };

  const showInfoToast = (message: string) => {
    toast.info(message, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
  };

  const showSuccessToast = (message: string) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
  };

  return { showErrorToast, showInfoToast, showSuccessToast };
};
