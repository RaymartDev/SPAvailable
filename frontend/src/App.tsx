import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import Home from './views/user/MainHome';
import Registration from './views/user/Registration';
import EditProfile from './views/user/EditProfile';
import Verify from './views/user/Verify';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Registration />} />

        <Route path="/home" element={<Home />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/verify/:id" element={<Verify />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;