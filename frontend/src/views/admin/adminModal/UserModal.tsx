import DefaultPp from '../../../img/defaultPp.png';

interface UserModalProps {
  onCancel: () => void;
}

function UserModal({ onCancel }: UserModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col bg-white px-5 py-16 rounded-2xl shadow-lg w-1/3 h-3/5 ">
        <div className="flex flex-col space-y-4 px-10">
          <div>
            <img
              src={DefaultPp}
              alt="profilePicture"
              className="size-20 object-cover rounded-full object-center border-2"
            />
          </div>
          <div>
            <h1 className="font-bold text-3xl">James Allan</h1>
            <p className="text-lg">jamesalllan@gmail.com</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-centerw-full h-2/3 px-10">
          <div className="flex flex-col space-y-3 w-full">
            <div className="flex items-center space-x-5">
              <h1 className="w-1/5 font-semibold">ID Number</h1>
              <input
                type="num"
                className="rounded border-stone-950 border p-2 w-4/5"
              />
            </div>
            <div className="flex items-center space-x-5">
              <h1 className="w-1/5 font-semibold">Username</h1>
              <input
                type="text"
                className="rounded border-stone-950 border p-2 w-4/5"
              />
            </div>
            <div className="flex items-center space-x-5">
              <h1 className="w-1/5 font-semibold">Email Address</h1>
              <input
                type="text"
                className="rounded border-stone-950 border p-2 w-4/5"
              />
            </div>
            <div className="flex items-center space-x-5">
              <h1 className="w-1/5  font-semibold">Password</h1>
              <input
                type="password"
                className="rounded border-stone-950 border p-2 w-4/5"
              />
            </div>
          </div>
          <div className="flex space-x-4 w-full justify-end ">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onCancel();
              }}
              className="bg-white text-black border-2 border-black hover:bg-red-900 hover:text-white rounded-lg px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-[#41924B] text-white border-2 border-black hover:bg-green-900 rounded-lg px-4 py-2"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserModal;
