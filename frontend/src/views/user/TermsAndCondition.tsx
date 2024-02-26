/* eslint-disable react/no-unescaped-entities */
import Navbar from '../../components/Navbar/Navbar';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';

function TermsAndCondition() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <Navbar />
      <div className="flex bg-[#41924B] h-52 items-center px-10">
        <h1 className="font-bold text-center text-4xl md:text-6xl text-slate-50 w-fit">
          Terms and Condition
        </h1>
      </div>
      <div className="p-20 bg-slate-50">
        <p className="word-spacing-wide">
          Welcome to SPAvailable. These Terms and Conditions govern your use our
          online platform for scheduling spa appointments. By accessing or using
          any part of our website, you agree to be bound by these terms. If you
          do not agree to all the terms and conditions of this agreement, then
          you may not access the website or use any services.
        </p>
      </div>
      <div className="flex flex-col bg-[#CCD3CA] justify-center items-start p-10 gap-y-5 rounded-xl">
        <div>
          <h1 className="font-semibold text-xl">User Responsibilities:</h1>
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
          <h1 className="font-semibold text-xl">Payment:</h1>
          <p>
            a. Payment for spa services is typically made directly to the spa at
            the time of the appointment, unless otherwise specified.
          </p>
          <p>
            b. We do not handle payments for spa services booked through our
            platform.
          </p>
        </div>

        <div>
          <h1 className="font-semibold text-xl">
            Cancellation and Rescheduling:
          </h1>
          <p>
            a. Users are responsible for managing their appointments and
            adhering to the cancellation and rescheduling policies of the
            respective spa.
          </p>
          <p>
            b. Cancellation or rescheduling fees, if any, are determined by the
            individual spas and may vary.
          </p>
        </div>

        <div>
          <h1 className="font-semibold text-xl">Liability:</h1>
          <p>
            a. While we strive to provide accurate information and facilitate
            appointment bookings, we shall not be held liable for any
            discrepancies, errors, or issues arising from appointments booked
            through our platform.
          </p>
          <p>
            b. Users are solely responsible for their interactions with the spas
            listed on our website.
          </p>
        </div>

        <div>
          <h1 className="font-semibold text-xl">Privacy:</h1>
          <p>
            a. We respect your privacy and will handle your personal information
            in accordance with our Privacy Policy.
          </p>
          <p>
            b. By using our platform, you consent to the collection and use of
            your information as described in our Privacy Policy.
          </p>
        </div>

        <div>
          <h1 className="font-semibold text-xl">Changes to Terms:</h1>
          <p>
            a. We reserve the right to modify or update these Terms and
            Conditions at any time without prior notice. Changes will be
            effective immediately upon posting to our website.
          </p>
          <p>
            b. It is your responsibility to review these Terms periodically for
            any updates.
          </p>
        </div>
      </div>
      <div className="p-20 bg-slate-50">
        <h1 className="font-semibold text-center text-xl">
          By using our platform to schedule spa appointments, you agree to abide
          by these Terms and Conditions. If you have any questions or concerns,
          please contact us at (+63) 967-947-2818.
        </h1>
      </div>
      <Menu />
      <Footer />
    </div>
  );
}
export default TermsAndCondition;
