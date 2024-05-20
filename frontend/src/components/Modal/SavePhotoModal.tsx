interface SavePhotoModalProps {
  onCancel: () => void;
  onSaveChanges: () => void;
}

function SavePhotoModal({ onCancel, onSaveChanges }: SavePhotoModalProps) {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-black bg-opacity-30 w-full h-full flex justify-center items-center">
        <div className="bg-white w-11/12 max-w-md p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold">Save Changes?</p>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onCancel();
              }}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onSaveChanges();
              }}
              className="bg-[#41924B] text-white px-4 py-2 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavePhotoModal;
