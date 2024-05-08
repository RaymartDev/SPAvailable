import React, { useState } from 'react';
import SideBar from './SideBar';
import Dashboard from './adminComponents/Dashboard';
import Users from './adminComponents/AdminUsers';
import Spa from './adminComponents/AdminSpa';
import Feedback from './adminComponents/AdminFeedback';
import Products from './adminComponents/AdminProducts';
import Services from './adminComponents/AdminServices';

function Admin() {
  const [activeContent, setActiveContent] = useState<string>('Dashboard');

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
    <div className="flex">
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
