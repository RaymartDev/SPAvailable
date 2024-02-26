/* eslint-disable jsx-a11y/anchor-is-valid */
import { IoClose } from 'react-icons/io5';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

function TermsModal({ open, onClose }: LoginModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-20">
      <div className="flex flex-col items-center w-[464px] h-[659px] bg-slate-50 rounded-2xl pb-10">
        <div className="flex justify-end items-start w-full h-fit">
          <button type="button" onClick={onClose} className="m-3">
            <IoClose size={30} />
          </button>
        </div>

        <div className="flex flex-col justify-center items-center w-[300px] h-fit pb-5">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-xl">Terms and Condition</h1>
          </div>
        </div>

        <div className="flex flex-col overflow-y-scroll h-full px-10 text-sm">
          <div>
            <div className="">
              <p className="">
                Welcome to SPAvailable. These Terms and Conditions govern your
                use our online platform for scheduling spa appointments. By
                accessing or using any part of our website, you agree to be
                bound by these terms. If you do not agree to all the terms and
                conditions of this agreement, then you may not access the
                website or use any services.
              </p>
            </div>
            <h1 className="font-semibold">User Responsibilities:</h1>
            <p>
              a. Users are responsible for providing accurate and up-to-date
              information when scheduling appointments
            </p>
            <p>
              b. Users must adhere to the cancellation and rescheduling policies
              of the respective spa where the appointment is booked.
            </p>
          </div>

          <div>
            <h1 className="font-semibold">Payment:</h1>
            <p>
              a. Payment for spa services is typically made directly to the spa
              at the time of the appointment, unless otherwise specified.
            </p>
            <p>
              b. We do not handle payments for spa services booked through our
              platform.
            </p>
          </div>

          <div>
            <h1 className="font-semibold">Cancellation and Rescheduling:</h1>
            <p>
              a. Users are responsible for managing their appointments and
              adhering to the cancellation and rescheduling policies of the
              respective spa.
            </p>
            <p>
              b. Cancellation or rescheduling fees, if any, are determined by
              the individual spas and may vary.
            </p>
          </div>

          <div>
            <h1 className="font-semibold">Liability:</h1>
            <p>
              a. While we strive to provide accurate information and facilitate
              appointment bookings, we shall not be held liable for any
              discrepancies, errors, or issues arising from appointments booked
              through our platform.
            </p>
            <p>
              b. Users are solely responsible for their interactions with the
              spas listed on our website.
            </p>
          </div>

          <div>
            <h1 className="font-semibold">Privacy:</h1>
            <p>
              a. We respect your privacy and will handle your personal
              information in accordance with our Privacy Policy.
            </p>
            <p>
              b. By using our platform, you consent to the collection and use of
              your information as described in our Privacy Policy.
            </p>
          </div>

          <div>
            <h1 className="font-semibold">Changes to Terms:</h1>
            <p>
              a. We reserve the right to modify or update these Terms and
              Conditions at any time without prior notice. Changes will be
              effective immediately upon posting to our website.
            </p>
            <p>
              b. It is your responsibility to review these Terms periodically
              for any updates.
            </p>
          </div>
          <div className="flex justify-between p-5">
            <button type="button" className="bg-green-500 px-5 py-3 rounded-lg">
              Accept
            </button>
            <button type="button" className="bg-red-500 px-5 py-3 rounded-lg">
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsModal;
