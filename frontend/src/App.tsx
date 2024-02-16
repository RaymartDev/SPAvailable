import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Home from "./views/user/MainHome";
import Registration from "./views/user/Registration"
import EditProfile from "./views/user/EditProfile";
import Verify from "./views/user/Verify";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/Home" element={<Home/>}/>
          <Route path="/Registration" element={<Registration/>}/>
          <Route path="/EditProfile" element={<EditProfile/>}/>
          <Route path="/Verify" element={<Verify/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
