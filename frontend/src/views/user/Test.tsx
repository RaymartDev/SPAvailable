
import Navbar from '../../components/Navbar';
import ImageRec from '../../img/imageRec.png';

function Test() {

  return (
    <div className="max-w-screen-2xl max-h-screen mx-auto px-4 overflow-hidden">
      <Navbar />
      <div className="flex justify-center h-screen bg-white p-5">
        <div className="flex w-full flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center ">
            <h1 className="text-6xl mb-10">Verify Your Email</h1>
            <h2 className="text-2xl ">
              Check your email & click the link to activate your account.
            </h2>
          </div>
          <div className="my-16">
            <img alt="" src={ImageRec} className="size-80" />
          </div>
          <div className="flex justify-center items-center mb-28">
            <button
              type="button"
              className="bg-[#41924B] rounded-full text-slate-50 font-semibold  py-3 text-lg border-black border-[1px] w-64 hover:bg-slate-50 hover:text-[#41924B] duration-300"
            >
              Resend Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
