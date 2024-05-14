import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import Dashboard from './adminComponents/Dashboard';
import Users from './adminComponents/AdminUsers';
import Spa from './adminComponents/AdminSpa';
import Feedback from './adminComponents/AdminFeedback';
import Products from './adminComponents/AdminProducts';
import Services from './adminComponents/AdminServices';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setSpa } from '../../store/reducer/spaSlice';
import { useToast } from '../../hooks/useToast';
import Loader from '../../components/Loader Component/Loader';

function Admin() {
  const [activeContent, setActiveContent] = useState<string>('Dashboard');
  const [loading, setLoading] = useState<boolean>(false);
  const { showErrorToast } = useToast();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate(user.active ? '/admin' : '/');
      return;
    }
    navigate('/');
  }, []);

  useEffect(() => {
    const handleFetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/v1/spa/control');
        if (response.status >= 200 && response.status < 300) {
          if (response.data.length > 0) {
            dispatch(setSpa(response.data));
          }
        }
      } catch (err) {
        if (err) {
          if (err instanceof AxiosError) {
            showErrorToast(err);
          } else {
            showErrorToast('Unable to fetch Spa List');
          }
        }
      } finally {
        setLoading(false);
      }
    };

    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />;
  }

  let ContentComponent: React.FC;

  switch (activeContent) {
    case 'Dashboard':
      ContentComponent = Dashboard;
      break;
    case 'Users':
      ContentComponent = Users;
      break;
    case 'Spa':
      ContentComponent = Spa;
      break;
    case 'Feedback':
      ContentComponent = Feedback;
      break;
    case 'Products':
      ContentComponent = Products;
      break;
    case 'Services':
      ContentComponent = Services;
      break;
    default:
      ContentComponent = Dashboard;
  }

  return (
    <div className="flex min-w-full">
      <div className="w-1/5">
        <SideBar
          setActiveContent={setActiveContent}
          activeContent={activeContent}
        />
      </div>
      <div className="py-6 px-10 w-4/5">
        <ContentComponent />
      </div>
    </div>
  );
}

export default Admin;
