import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import Page from './components/Util/Page';
import Landing from './Landing';
import 'react-toastify/dist/ReactToastify.css';

/**
 * LAZY LOADED COMPONENTS
 */
const Home = lazy(() => import('./views/user/Home'));
const Registration = lazy(() => import('./views/user/Registration'));
const EditProfile = lazy(() => import('./views/user/EditProfile'));
const ResetPassword = lazy(() => import('./views/user/ResetPassword'));
const Pending = lazy(() => import('./views/user/Pending'));
const AboutSpa = lazy(() => import('./views/user/AboutSpa'));
const VerifyPage = lazy(() => import('./views/user/Verify'));
const AboutUs = lazy(() => import('./views/user/AboutUs'));
const Product = lazy(() => import('./views/user/Product'));
const Service = lazy(() => import('./views/user/Service'));
const AboutProduct = lazy(() => import('./views/user/AboutProduct'));
const AboutService = lazy(() => import('./views/user/AboutService'));
const AddSpa = lazy(() => import('./views/user/AddSpa'));
const PrivacyPolicy = lazy(() => import('./views/user/PrivacyPolicy'));
const Terms = lazy(() => import('./views/user/TermsAndCondition'));
const Swiper = lazy(() => import('./components/ProductSwiper'));

const SpaLocation = lazy(() => import('./views/user/SpaLocation'));
const Admin = lazy(() => import('./views/admin/Admin'));
const Feedback = lazy(() => import('./views/user/Feedback'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* REGULAR ROUTES */}
        <Route
          path="/"
          element={
            <>
              <ToastContainer newestOnTop closeOnClick />
              <Landing />
            </>
          }
        />
        <Route path="/register" element={<Page component={Registration} />} />
        <Route path="/about" element={<Page component={AboutUs} />} />
        <Route path="/terms" element={<Page component={Terms} />} />
        <Route
          path="/privacy-policy"
          element={<Page component={PrivacyPolicy} />}
        />

        {/* USER ROUTES */}
        <Route path="/user/dashboard" element={<Page component={Home} />} />
        <Route
          path="/user/profile"
          element={<Page component={EditProfile} />}
        />
        <Route path="/user/pending" element={<Page component={Pending} />} />
        <Route path="/user/verify" element={<Page component={VerifyPage} />} />
        <Route
          path="/user/reset"
          element={<Page component={ResetPassword} />}
        />
        <Route path="/user/add-spa" element={<Page component={AddSpa} />} />

        {/* SPA ROUTES */}
        <Route path="/spa/about/:id" element={<Page component={AboutSpa} />} />
        <Route path="/spa/product" element={<Page component={Product} />} />
        <Route path="/spa/service" element={<Page component={Service} />} />

        {/* MISC */}
        <Route path="/reset" element={<Page component={ResetPassword} />} />
        <Route path="*" element={<Page component={Home} />} />

        {/* PAAYOS MART */}
        <Route
          path="/about/product"
          element={<Page component={AboutProduct} />}
        />
        <Route
          path="/about/service"
          element={<Page component={AboutService} />}
        />
        <Route
          path="/spa/location"
          element={<Page component={SpaLocation} />}
        />

        <Route path="/admin" element={<Page component={Admin} />} />

        <Route path="/swiper" element={<Page component={Swiper} />} />

        <Route path="/feedback" element={<Page component={Feedback} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
