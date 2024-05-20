import { ImCross } from 'react-icons/im';

interface DeleteModalProps {
  onCancel: () => void;
  onDelete: () => void;
}

function DeleteModal({ onCancel, onDelete }: DeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center bg-white justify-center rounded-lg shadow-lg w-1/4 h-2/5 px-5">
        <div className="flex flex-col items-center space-y-8">
          <div>
            <ImCross
              color="white"
              size={120}
              className="border-2 p-4 rounded-full bg-red-600"
            />
          </div>
          <div className="flex flex-col items-center space-y-3">
            <h2 className="text-4xl font-bold">Are you sure?</h2>
            <p className="text-lg text-center">
              Do you really want to delete these records? This process cannot be
              undone
            </p>
          </div>
          <div className="flex space-x-4 w-full justify-between px-5">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onCancel();
              }}
              className="bg-gray-300 text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg w-1/2 px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onDelete();
              }}
              className="bg-red-600 text-white hover:bg-red-900 rounded-lg w-1/2 px-4 py-2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
