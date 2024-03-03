import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import Loader from './components/Loader Component/Loader';
import Page from './components/Util/Page';

/**
 * LAZY LOADED COMPONENTS
 */
const Landing = lazy(() => import('./Landing'));
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
const PrivacyPolicy = lazy(() => import('./views/user/PrivacyPolicy'));
const Terms = lazy(() => import('./views/user/TermsAndCondition'));
const NotFound = lazy(() => import('./views/user/404/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* REGULAR ROUTES */}
        <Route path="/" element={<Page component={Landing} />} />
        <Route path="/register" element={<Page component={Registration} />} />
        <Route path="/about" element={<Page component={AboutUs} />} />
        <Route path="/terms" element={<Page component={Terms} />} />
        <Route
          path="/privacy-policy"
          element={<Page component={PrivacyPolicy} />}
        />

        {/* PROTECTED ROUTES */}
        <Route path="/user/dashboard" element={<Page component={Home} />} />
        <Route
          path="/user/profile"
          element={<Page component={EditProfile} />}
        />
        <Route path="/user/pending" element={<Page component={Pending} />} />
        <Route path="/user/verify" element={<Page component={VerifyPage} />} />

        {/* SPA ROUTES */}
        <Route path="/spa/about" element={<Page component={AboutSpa} />} />
        <Route path="/spa/product" element={<Page component={Product} />} />
        <Route path="/spa/service" element={<Page component={Service} />} />

        {/* MISC */}
        <Route path="/loader" element={<Page component={Loader} />} />
        <Route path="/reset" element={<Page component={ResetPassword} />} />
        <Route path="*" element={<Page component={NotFound} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
