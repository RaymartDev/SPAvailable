interface SavePhotoModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onSaveChanges: () => void;
}

function SavePhotoModal({
  isOpen,
  onCancel,
  onSaveChanges,
}: SavePhotoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed max-w-screen-2xl px-4 mx-auto inset-[88px] flex justify-center items-start z-50">
      <div className="bg-black bg-opacity-20 w-full py-3 px-10">
        <div className="flex justify-between">
          <div className="flex items-center">
            <p className="text-lg font-semibold text-white">Save Changes?</p>
          </div>
          <div className="flex gap-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSaveChanges}
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
