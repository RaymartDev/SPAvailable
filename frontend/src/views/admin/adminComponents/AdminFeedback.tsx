import { useState } from 'react';
import { FaTrash } from 'react-icons/fa6';
import FeedbackState from '../../../interface/FeedbackState';
import { useAppSelector } from '../../../store/store';
import DeleteModal from '../adminModal/DeleteModal';

function AdminFeedback() {
  const feedbacks: FeedbackState[] = useAppSelector((state) => state.feedback);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    console.log('Deleting user:');
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <div className="flex flex-col min-w-full">
      <div className="space-y-10">
        <div className="flex items-center justify-between">
          <div className="flex space-x-8">
            <h1 className="text-5xl font-bold">Feedback</h1>
          </div>
        </div>

        <div className="flex w-full space-x-10">
          <div className="flex w-full">
            <div className="grid grid-rows-1 w-full h-fit">
              <div className="flex flex-col border-2 bg-white rounded-lg ">
                {feedbacks.map((feedback) => (
                  <div key={feedback?.id}>
                    <div className="flex px-10 py-8">
                      <div className="flex space-x-5 items-center w-3/12">
                        <div className="flex w-1/3 items-center justify-center">
                          <div className="flex items-center size-16 rounded-full border-2">
                            <img
                              src={feedback?.owner?.profile}
                              alt="profilePicture"
                              className="w-full h-full object-cover rounded-full object-center"
                            />
                          </div>
                        </div>
                        <div className="w-2/3">
                          <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                            {feedback?.owner?.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex w-9/12">
                        <div className="flex items-center justify-center w-full">
                          <p className="text-center whitespace-pre-wrap break-words font-bold">
                            {feedback?.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="flex items-center justify-center w-full bg-red-600 py-3 rounded-b-lg space-x-3 text-white"
                      aria-label="Delete"
                      onClick={openModal}
                    >
                      <p>Delete</p>
                      <FaTrash color="white" size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <DeleteModal onCancel={handleCancel} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default AdminFeedback;
