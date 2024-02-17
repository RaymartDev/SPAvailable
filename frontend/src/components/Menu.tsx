function Menu() {
  return (
    <div className="flex flex-col pl-5 py-5 bg-slate-50">
      <div className="border-b-2 border-black">
        <h1 className="text-2xl font-bold pb-3">ABOUT</h1>
      </div>
      <div className="flex flex-col items-start pt-5 ">
        <button
          type="button"
          className="text-xl mb-3 hover:bg-[#41924B] hover:text-slate-50 rounded-lg px-5 py-2 duration-200"
        >
          About Us
        </button>
        <button
          type="button"
          className="text-xl mb-3 hover:bg-[#41924B] hover:text-slate-50 rounded-lg px-5 py-2 duration-200"
        >
          Privacy
        </button>
        <button
          type="button"
          className="text-xl hover:bg-[#41924B] hover:text-slate-50 rounded-lg px-5 py-2 duration-200"
        >
          Terms and Condition
        </button>
      </div>
    </div>
  );
}

export default Menu;
