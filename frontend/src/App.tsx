import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import Loader from './components/Loader Component/Loader';
// Lazy loading the route components

const Landing = lazy(() => import('./Landing'));
const Home = lazy(() => import('./views/user/Home'));
const Registration = lazy(() => import('./views/user/Registration'));
const EditProfile = lazy(() => import('./views/user/EditProfile'));
const Pending = lazy(() => import('./views/user/Pending'));
const AboutSpa = lazy(() => import('./views/user/AboutSpa'));
const VerifyPage = lazy(() => import('./views/user/Verify'));
const AboutUs = lazy(() => import('./views/user/AboutUs'));
const Product = lazy(() => import('./views/user/Product'));
const Service = lazy(() => import('./views/user/Service'));
const PrivacyPolicy = lazy(() => import('./views/user/PrivacyPolicy'));
const Terms = lazy(() => import('./views/user/TermsAndCondition'));
const Test = lazy(() => import('./views/user/Test'));
const NotFound = lazy(() => import('./views/user/404/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <Landing />
              <ToastContainer />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<Loader />}>
              <Registration />
              <ToastContainer />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<Loader />}>
              <AboutUs />
              <ToastContainer />
            </Suspense>
          }
        />
        <Route
          path="/terms"
          element={
            <Suspense fallback={<Loader />}>
              <Terms />
              <ToastContainer />
            </Suspense>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <Suspense fallback={<Loader />}>
              <PrivacyPolicy />
              <ToastContainer />
            </Suspense>
          }
        />
        <Route
          path="/test"
          element={
            <Suspense fallback={<Loader />}>
              <Test />
              <ToastContainer />
            </Suspense>
          }
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/user/dashboard"
          element={
            <Suspense fallback={<Loader />}>
              <Home />
              <ToastContainer />
            </Suspense>
          }
        />
        <Route
          path="/user/profile"
          element={
            <Suspense fallback={<Loader />}>
              <EditProfile />
              <ToastContainer />
            </Suspense>
          }
        />
        <Route
          path="/user/pending"
          element={
            <Suspense fallback={<Loader />}>
              <Pending />
              <ToastContainer />
            </Suspense>
          }
        />
        <Route
          path="/user/verify"
          element={
            <Suspense fallback={<Loader />}>
              <VerifyPage />
              <ToastContainer />
            </Suspense>
          }
        />

        <Route
          path="/spa/about"
          element={
            <Suspense fallback={<Loader />}>
              <AboutSpa />
              <ToastContainer />
            </Suspense>
          }
        />

        <Route
          path="/spa/product"
          element={
            <Suspense fallback={<Loader />}>
              <Product />
              <ToastContainer />
            </Suspense>
          }
        />

        <Route
          path="/spa/service"
          element={
            <Suspense fallback={<Loader />}>
              <Service />
              <ToastContainer />
            </Suspense>
          }
        />

        <Route path="/loader" element={<Loader />} />

        <Route
          path="*"
          element={
            <Suspense fallback={<Loader />}>
              <NotFound />
              <ToastContainer />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
