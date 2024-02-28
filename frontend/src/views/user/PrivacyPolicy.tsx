/* eslint-disable react/no-unescaped-entities */
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar/Navbar';

function PrivacyPolicy() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <Navbar />
      <div className="flex bg-[#41924B] h-52 justify-center items-center ">
        <h1 className="font-bold text-center text-4xl md:text-7xl text-slate-50 w-fit font-poppins">
          Privacy Policy
        </h1>
      </div>
      <div className="px-40 bg-white">
        <p className="word-spacing-wide text-xl text-center font-poppins py-10">
          Thank you for using SPAvailable. This Privacy Policy explains how we
          collect, use, and protect your personal information when you use our
          website to discover and schedule spa appointments. By using our
          website, you consent to the data practices described in this policy.
        </p>
      </div>
      <div className="px-40 py-10 bg-white">
        <div className="flex flex-col bg-[#CCD3CA] justify-center items-start p-10 gap-y-5 rounded-xl">
          <div>
            <h1 className="font-semibold text-xl">Information We Collect:</h1>
            <p>
              a. Personal Information: When you create an account or book a spa
              appointment through our website, we may collect personal
              information such as your name, email address, phone number, and
              payment details.
            </p>
            <p>
              b. Usage Data: We automatically collect information about your
              interaction with our website, including your IP address, browser
              type, device information, and pages visited.
            </p>
          </div>

          <div>
            <h1 className="font-semibold text-xl">Use of Information:</h1>
            <p>
              a. We use the information we collect to facilitate spa bookings,
              communicate with you about your appointments, and personalize your
              experience on our website.
            </p>
            <p>
              b. Your payment information is securely processed by our payment
              gateway partners and is not stored on our servers.
            </p>
          </div>

          <div>
            <h1 className="font-semibold text-xl">Sharing of Information:</h1>
            <p>
              a. We may share your personal information with spa providers to
              facilitate your bookings and provide the services you request.
            </p>
            <p>
              b. We may also share aggregated or anonymized data for analytical
              purposes or to improve our services.
            </p>
          </div>

          <div>
            <h1 className="font-semibold text-xl">Data Security:</h1>
            <p>
              a. We employ industry-standard security measures to protect your
              personal information from unauthorized access, disclosure,
              alteration, or destruction.
            </p>
            <p>
              b. However, no method of transmission over the internet or
              electronic storage is 100% secure, and we cannot guarantee
              absolute security.
            </p>
          </div>

          <div>
            <h1 className="font-semibold text-xl">Third-Party Services:</h1>
            <p>
              a. Our website may contain links to third-party websites or
              services that are not owned or controlled by us. We are not
              responsible for the privacy practices or content of these
              third-party sites.
            </p>
            <p>
              b. We encourage you to review the privacy policies of any
              third-party sites you visit.
            </p>
          </div>

          <div>
            <h1 className="font-semibold text-xl">Your Choices:</h1>
            <p>
              a. You have the right to access, update, or delete your personal
              information. You can manage your account settings or contact us
              for assistance.
            </p>
            <p>
              b. You can opt out of receiving promotional emails from us by
              following the unsubscribe instructions provided in the email.
            </p>
          </div>

          <div>
            <h1 className="font-semibold text-xl">Children's Privacy:</h1>
            <p>
              a. Our website is not intended for children under the age of 13.
              We do not knowingly collect or solicit personal information from
              children.
            </p>
          </div>

          <div>
            <h1 className="font-semibold text-xl">Changes to This Policy:</h1>
            <p>
              a. We reserve the right to update or revise this Privacy Policy at
              any time. Any changes will be effective immediately upon posting
              the updated policy on our website.
            </p>
            <p>
              b. We encourage you to review this Privacy Policy periodically for
              any updates.
            </p>
          </div>
        </div>
      </div>

      <div className="px-40 py-10 bg-white">
        <h1 className="font-semibold text-center text-xl font-poppins">
          If you have any questions or concerns about our Privacy Policy, please
          contact us at (+63) 967-947-2818.
        </h1>
      </div>
      <Menu />
      <Footer />
    </div>
  );
}
export default PrivacyPolicy;
