import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import Home from './views/user/Home';
import Registration from './views/user/Registration';
import EditProfile from './views/user/EditProfile';
import Verify from './views/user/Verify';
import AboutSpa from './views/user/AboutSpa';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Registration />} />

        <Route path="/home" element={<Home />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/verify/:id" element={<Verify />} />
        <Route path="/about" element={<AboutSpa />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
