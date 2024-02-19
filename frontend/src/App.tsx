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
        <Route path="/about" element={<AboutSpa />} />

        <Route path="/dashboard" element={<Home />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/pending" element={<Verify />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
