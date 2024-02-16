import React, {useState} from "react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer";
import Menu from "../../components/Menu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTrash } from "react-icons/fa6";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import DefaultPp from "../../img/defaultPp.png"

const Registration: React.FC = () => {

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [visiblePass, setVisiblePass] = useState(false);
    const [visibleRePass, setVisibleRePass] = useState(false);
    const [contactNumber, setContactNumber] = useState("");
    const [profilePicture, setProfilePicture] = useState<string>(DefaultPp);
    const [isPictureRemoved, setIsPictureRemoved] = useState(false);

    const togglePassword = () => {
        setVisiblePass(!visiblePass)
    }

    const toggleRePassword = () => {
        setVisibleRePass(!visibleRePass)
    }

    const removeProfilePicture = () => {
        setProfilePicture("");
        setIsPictureRemoved(true);
    };

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 10) {
          setContactNumber(value);
        }
    };

      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setProfilePicture(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    return ( 
        <>
            <div className="max-w-screen-2xl mx-auto px-4">
                <Navbar />

                <div className="flex">

                    <div className="flex flex-col w-4/12 p-10 bg-[#41924B] items-center">
                        <div className="relative mb-10" id="profilePicture">
                            <img src={profilePicture || DefaultPp} className={`bg-white border-2 rounded-full object-cover size-60  ${isPictureRemoved ? 'bg-white' : ''}`}/>
                            <FaTrash color="white" className="absolute bottom-5 right-7 cursor-pointer" onClick={removeProfilePicture} size={30}/>
                        </div>
                        <div className="mb-10">
                            <input type="file" accept="image/*" id="profilePhoto" onChange={handleFileChange} className="hidden" />
                            <label htmlFor="profilePhoto" className="bg-neutral-50 rounded-full px-10 py-2 font-semibold cursor-pointer">UPLOAD</label>
                        </div>
                    </div>

                    <div className="flex w-full flex-col pl-20 bg-slate-50 p-5">

                        <div className="border-b-2 pb-5 my-10">
                            <h1 className="text-3xl font-bold">Basic Details</h1>
                        </div>

                        <div className="grid grid-cols-2 mx-10 ">
                            <div className="card mb-8">
                                <h2 className="text-xl text-neutral-400 font-semibold mb-3">First Name</h2>
                                <input type="text" className="w-9/12 border-b-2 px-1 py-2 bg-transparent" />
                            </div>
                            <div className="card mb-8">
                                <h2 className="text-xl text-neutral-400 font-semibold mb-3">Last Name</h2>
                                <input type="text"  className="w-9/12 border-b-2 px-1 py-2 bg-transparent"/>
                            </div>
                            <div className="card mb-8">
                                <h2 className="text-xl text-neutral-400 font-semibold mb-3">Email</h2>
                                <input type="email" className="w-9/12 border-b-2 px-1 py-2 bg-transparent" />
                            </div>
                            <div className="card mb-8">
                                <h2 className="text-xl text-neutral-400 font-semibold mb-3">Contact</h2>
                                <div className="flex w-9/12 border-b-2">
                                    <div className="flex w-1/12 items-center">+63</div>
                                    <input type="tel" value={contactNumber} onChange={handleContactChange} maxLength={10} className="ml-1 px-1 py-2 w-11/12 bg-transparent" />
                                </div>
                                
                            </div>
                            <div className="card mb-8 relative">
                                <h2 className="text-xl text-neutral-400 font-semibold mb-3">Password</h2>
                                <div className="flex items-center w-9/12 border-b-2 relative">
                                    <input type={(visiblePass === false)? "password": "text"} className="w-full px-1 py-2 bg-transparent" />
                                    <div className="absolute right-0 top-0 bottom-0 flex items-center px-2">
                                        {
                                            (visiblePass === false) ? <BsFillEyeFill size={25} onClick={togglePassword}/> :
                                            <BsFillEyeSlashFill size={25} onClick={togglePassword}/>
                                        }                                       
                                    </div>
                                </div>                               
                            </div>
                            <div className="card mb-8">
                                <h2 className="text-xl text-neutral-400 font-semibold mb-3">Retype Password</h2>
                                <div className="flex items-center w-9/12 border-b-2 relative">
                                    <input type={(visiblePass === false)? "password": "text"} className="w-full px-1 py-2 bg-transparent" />
                                    <div className="absolute right-0 top-0 bottom-0 flex items-center px-2">
                                        {
                                            (visiblePass === false) ? <BsFillEyeFill size={25} onClick={togglePassword}/> :
                                            <BsFillEyeSlashFill size={25} onClick={togglePassword}/>
                                        }                                       
                                    </div>
                                </div>                         
                            </div>
                            <div className="card">
                                <h2 className="text-xl text-neutral-400 font-semibold mb-3">Birthday</h2>
                                <div className="flex items-center w-9/12 border-b-2 px-1 py-2 ">
                                    <DatePicker
                                        className="px-1 py-2 bg-transparent "
                                        placeholderText="Select Your Birthday"
                                        selected={selectedDate}
                                        onChange={(date: Date) => setSelectedDate(date)}
                                    />
                                </div>
                                
                            </div>
                            <div className="card">
                                <h2 className="text-xl text-neutral-400 font-semibold mb-3">Gender</h2>
                                <div className="flex items-center w-9/12 border-b-2 px-1 py-2 ">
                                    <select name="gender" id="gender" className="px-1 py-2 bg-transparent ">
                                        <option value="" disabled selected><p className="text-slate-50">Select Gender</p></option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Prefer Not To Say</option>
                                    </select>
                                </div>             
                            </div>
                        </div>

                        <div className="flex justify-end pb-40 mx-10 mt-20">
                            <div className="flex items-center justify-center mr-10 ">
                                <button className="text-lg font-semibold text-neutral-400 rounded-full border-2 px-16 py-3">Reset All</button>
                            </div>
                            <div className="bg-[#41924B] rounded-full mr-[126px]">
                                <button className="text-slate-50 font-semibold px-16 py-3 text-lg ">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div> 

                <Menu />

                <Footer />      
            </div>
           
            
        </>
    );
}
 
export default Registration;