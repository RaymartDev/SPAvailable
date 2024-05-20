/* eslint-disable @typescript-eslint/no-shadow */
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { useAppSelector } from '../../../store/store';
import SpaState from '../../../interface/SpaState';
import DeleteModal from '../adminModal/DeleteModal';

function AdminSpa() {
  const spa: SpaState[] = useAppSelector((state) => state.spa);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [spaToDelete, setSpaToDelete] = useState<SpaState | null>(null);

  const handleCancel = () => {
    setShowModal(false);
    setSpaToDelete(null);
  };

  const handleDelete = () => {
    console.log('Deleting user:', spaToDelete);
    setShowModal(false);
    setSpaToDelete(null);
  };

  const openModal = (spa: SpaState) => {
    setSpaToDelete(spa);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col">
      <div className="space-y-10">
        <div className="flex items-center justify-between">
          <div className="flex space-x-8">
            <h1 className="text-5xl font-bold">Spa</h1>
            <div className="relative">
              <FaSearch className="absolute top-1/2 left-5 transform -translate-y-1/2 text-black" />
              <input
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
                  SPA NAME
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider"
                >
                  POSTED BY
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider"
                >
                  EMAIL ADDRESS
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider"
                >
                  ADDRESS
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {spa.map((spa) => (
                <tr key={spa?.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {spa?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {spa?.owner?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {spa?.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 overflow-hidden">
                    {spa?.address}
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
                      onClick={() => openModal(spa)}
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
    </div>
  );
}

export default AdminSpa;
