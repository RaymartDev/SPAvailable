import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import Loader from '../Loader Component/Loader';

function Page({
  component: Component,
}: {
  component: React.ComponentType<unknown>;
}) {
  return (
    <Suspense fallback={<Loader />}>
      <ToastContainer />
      <Component />
    </Suspense>
  );
}

export default Page;
