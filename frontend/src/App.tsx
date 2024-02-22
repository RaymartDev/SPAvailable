import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from './components/Loader Component/Loader';
import Landing from './Landing';
// Lazy loading the route components

const Home = lazy(() => import('./views/user/Home'));
const Registration = lazy(() => import('./views/user/Registration'));
const EditProfile = lazy(() => import('./views/user/EditProfile'));
const Pending = lazy(() => import('./views/user/Pending'));
const AboutSpa = lazy(() => import('./views/user/AboutSpa'));
const VerifyPage = lazy(() => import('./views/user/Verify'));
const AboutUs = lazy(() => import('./views/user/AboutUs'));
const Terms = lazy(() => import('./views/user/TermsAndCondition'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/register"
          element={
            <Suspense fallback={<Loader />}>
              <Registration />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<Loader />}>
              <AboutUs />
            </Suspense>
          }
        />
        <Route
          path="/terms"
          element={
            <Suspense fallback={<Loader />}>
              <Terms />
            </Suspense>
          }
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/user/dashboard"
          element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/user/profile"
          element={
            <Suspense fallback={<Loader />}>
              <EditProfile />
            </Suspense>
          }
        />
        <Route
          path="/user/pending"
          element={
            <Suspense fallback={<Loader />}>
              <Pending />
            </Suspense>
          }
        />
        <Route
          path="/user/verify"
          element={
            <Suspense fallback={<Loader />}>
              <VerifyPage />
            </Suspense>
          }
        />

        <Route
          path="/spa/about"
          element={
            <Suspense fallback={<Loader />}>
              <AboutSpa />
            </Suspense>
          }
        />

        <Route path="/loader" element={<Loader />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
