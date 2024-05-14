import { FaSearch } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import UserState from '../../../interface/UserState';
import { useAppSelector } from '../../../store/store';

function AdminUsers() {
  const users: UserState[] = useAppSelector((state) => state.users);

  return (
    <div className="flex flex-col space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex space-x-8">
          <h1 className="text-5xl font-bold">Users</h1>
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-5 transform -translate-y-1/2 text-black" />
            <input
              type="search"
              className="rounded-full py-3 pl-12 pr-5 w-full md:w-[450px] border-2 border-[#41924B]"
            />
          </div>
        </div>
        <div>
          <button
            type="button"
            className="bg-[#41924B] border-2 border-[#41924B] text-white rounded-full w-36 flex justify-center items-center font-semibold py-3"
          >
            ADD USER{' '}
            <p>
              <GoPlus size={20} />
            </p>{' '}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border-2 ">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider"
              >
                Full Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider"
              >
                Contact Number
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider"
              >
                Admin
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user?.email}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {user?.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {user?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {user?.contact}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  YES
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right font-medium space-x-10">
                  <button
                    className="bg-[#41924B] hover:bg-green-900 border-2 rounded-full w-28 py-2 text-white"
                    aria-label="Edit"
                    type="button"
                  >
                    EDIT
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-900 border-2 rounded-full w-28 py-2 text-white"
                    aria-label="Delete"
                    type="button"
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
