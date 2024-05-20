import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import UserState from '../../../interface/UserState';
import { useAppSelector } from '../../../store/store';
import DeleteModal from '../adminModal/DeleteModal';
import UserModal from '../adminModal/UserModal';

function AdminUsers() {
  const users: UserState[] = useAppSelector((state) => state.users);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<UserState | null>(null);
  const [showUserModal, setUserSpaModal] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<UserState>(null);
  const [search, setSearch] = useState<string>('');

  const handleCancel = () => {
    setShowModal(false);
    setUserToDelete(null);
  };

  const handleDelete = () => {
    console.log('Deleting user:', userToDelete);
    setShowModal(false);
    setUserToDelete(null);
  };

  const openModal = (user: UserState) => {
    setUserToDelete(user);
    setShowModal(true);
  };

  const handleUserCancel = () => {
    setUserSpaModal(false);
  };

  const openUserModal = () => {
    setUserSpaModal(true);
  };

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
                        className="bg-[#41924B] hover:bg-green-900 border-2 rounded-full w-28 py-2 text-white"
                        aria-label="Edit"
                        type="button"
                        onClick={() => {
                          openUserModal();
                          setEditingUser(user);
                        }}
                      >
                        EDIT
                      </button>
                      <button
                        onClick={() => openModal(user)}
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
        <DeleteModal onCancel={handleCancel} onDelete={handleDelete} />
      )}
      {showUserModal && (
        <UserModal user={editingUser} onCancel={handleUserCancel} />
      )}
    </div>
  );
}

export default AdminUsers;
