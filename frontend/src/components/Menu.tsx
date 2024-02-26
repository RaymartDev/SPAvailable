import { useNavigate } from 'react-router-dom';

function Menu() {
  const navigate = useNavigate();

  const clickAboutUs = () => {
    navigate('/about');
  };

  const clickTermsAndCondition = () => {
    navigate('/terms');
  };

  const clickPrivacyPolicy = () => {
    navigate('/privacy-policy');
  };

  return (
    <div className="flex flex-col pl-5 py-5 bg-slate-50">
      <div className="border-b-2 border-black">
        <h1 className="text-2xl font-bold pb-3">ABOUT</h1>
      </div>
      <div className="flex flex-col items-start pt-5 ">
        <button
          type="button"
          className="text-xl mb-3 hover:bg-[#41924B] hover:text-slate-50 rounded-lg px-5 py-2 duration-200"
          onClick={clickAboutUs}
        >
          About Us
        </button>
        <button
          type="button"
          className="text-xl mb-3 hover:bg-[#41924B] hover:text-slate-50 rounded-lg px-5 py-2 duration-200"
          onClick={clickPrivacyPolicy}
        >
          Privacy Policy
        </button>
        <button
          type="button"
          className="text-xl hover:bg-[#41924B] hover:text-slate-50 rounded-lg px-5 py-2 duration-200"
          onClick={clickTermsAndCondition}
        >
          Terms and Condition
        </button>
      </div>
    </div>
  );
}

export default Menu;
