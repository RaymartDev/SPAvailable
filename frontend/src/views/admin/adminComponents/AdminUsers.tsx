import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import UserState from '../../../interface/UserState';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import DeleteModal from '../adminModal/DeleteModal';
import { useToast } from '../../../hooks/useToast';
import Loader from '../../../components/Loader Component/Loader';
import { deleteUser } from '../../../store/reducer/usersSlice';

function AdminUsers() {
  const users: UserState[] = useAppSelector((state) => state.users);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<UserState | null>(null);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { showErrorToast, showSuccessToast } = useToast();

  const handleCancel = () => {
    setShowModal(false);
    setUserToDelete(null);
  };

  const openModal = (user: UserState) => {
    setUserToDelete(user);
    setShowModal(true);
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    setLoading(true);
    try {
      const response = await axios.delete(
        `/api/v1/user/delete/${userToDelete?.id}`
      );
      if (response.status >= 200 && response.status < 300) {
        dispatch(deleteUser(userToDelete));
        showSuccessToast('Deleted successfully');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        showErrorToast(err);
      } else {
        showErrorToast('Unable to delete spa');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    <Loader />;
  }

  return (
    <div className="flex flex-col">
      <div className="space-y-10">
        <div className="flex items-center justify-between">
          <div className="flex space-x-8">
            <h1 className="text-5xl font-bold">Users</h1>
            <div className="relative">
              <FaSearch className="absolute top-1/2 left-5 transform -translate-y-1/2 text-black" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                className="rounded-full py-3 pl-12 pr-5 w-full md:w-[450px] border-2 border-[#41924B]"
              />
            </div>
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
              {users
                .filter((user) => {
                  if (
                    user?.email?.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return true;
                  }
                  if (
                    user?.name?.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return true;
                  }
                  return false;
                })
                .map((user) => (
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
                      {(user?.admin ? 'YES' : 'NO') || 'NO'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-medium space-x-10">
                      <button
                        onClick={() => {
                          openModal(user);
                          setUserToDelete(user);
                        }}
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
      {showModal && (
        <DeleteModal onCancel={handleCancel} onDelete={handleDeleteUser} />
      )}
    </div>
  );
}

export default AdminUsers;
