/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/iframe-has-title */
import { IoLocationOutline } from 'react-icons/io5';

function MapLocation() {
  return (
    <div className="bg-white py-8 px-12 max-h-screen ">
      <div className="flex flex-col gap-y-4">
        <h1 className="text-4xl font-semibold text-center w-fit">Location</h1>
        <button type="button" className="w-fit text-[#0000FF]">
          CLICK HERE TO KNOW HOW TO ADD YOUR LOCATION
        </button>
      </div>
      <div className="flex flex-col justify-center items-center py-10">
        <div className="w-11/12 rounded-lg border-black border-2 shadow-lg">
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.2653988354764!2d121.02906847590596!3d14.754072073299145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b1cc5ffb90cf%3A0xf1e37bb3f2086d!2sCongressional%20Rd%20Ext%2C%20Barangay%20171%2C%20Caloocan%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1708931611777!5m2!1sen!2sph"
              height="700"
              width="700"
              className="w-full rounded-lg"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="flex items-center p-5">
            <div className="px-5">
              <IoLocationOutline size={40} />
            </div>
            <div className="flex flex-col">
              <h1 className="font-semibold">Get Directions</h1>
              <p>Congressional Road Brgy 171, Caloocan City, Metro Manila</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MapLocation;
