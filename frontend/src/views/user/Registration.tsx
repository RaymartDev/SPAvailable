/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { FaTrash } from 'react-icons/fa6';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import axios, { AxiosError } from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import 'react-datepicker/dist/react-datepicker.css';
import DefaultPp from '../../img/defaultPp.png';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useToast } from '../../hooks/useToast';
import { setCredentials } from '../../store/reducer/userSlice';
import Loader from '../../components/Loader Component/Loader';
import { formatDate2Digit } from '../../components/Util/dateUtil';

function Registration() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.user);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [visiblePass, setVisiblePass] = useState(false);
  const [visibleRePass, setVisibleRePass] = useState(false);
  const [contactNumber, setContactNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState<string>(
    location.state.picture || DefaultPp
  );

  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const [firstName, setFirstName] = useState(location.state.firstName || '');
  const [lastName, setLastName] = useState(location.state.lastName || '');
  const [email, setEmail] = useState(location.state.email || '');
  const [gender, setGender] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [genderError, setGenderError] = useState('');

  const [loading, setLoading] = useState<boolean>(false);

  const { showErrorToast, showSuccessToast } = useToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const togglePassword = () => {
    setVisiblePass(!visiblePass);
  };

  const toggleRePassword = () => {
    setVisibleRePass(!visibleRePass);
  };

  const removeProfilePicture = () => {
    setProfilePicture('');
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setContactNumber(value);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        showErrorToast('File is too large. Please upload 1MB or less.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePicture(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordMismatch(false);
    setPasswordError('');
  };

  const handleRetypePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRetypePassword(e.target.value);
    setPasswordMismatch(false);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    setFirstNameError('');
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    setLastNameError('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
    setGenderError('');
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleResetAll = () => {
    setFirstName(location.state.firstName || '');
    setLastName(location.state.lastName || '');
    setEmail(location.state.email || '');
    setGender('');
    setContactNumber('');
    setProfilePicture(location.state.picture || DefaultPp);
    setPassword('');
    setRetypePassword('');
    setPasswordMismatch(false);
    setSelectedDate(null);
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPasswordError('');
    setGenderError('');
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!firstName) {
      setFirstNameError('First name is required');
      setLoading(false);
      return;
    }
    if (!lastName) {
      setLastNameError('Last name is required');
      setLoading(false);
      return;
    }
    if (!email) {
      setEmailError('Email is required');
      setLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email address');
      setLoading(false);
      return;
    }
    if (!gender) {
      setGenderError('Gender is required');
      setLoading(false);
      return;
    }
    if (!password) {
      setPasswordError('Password is required');
      setLoading(false);
      return;
    }
    if (password !== retypePassword) {
      setPasswordMismatch(true);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/v1/user/register', {
        name: `${firstName} ${lastName}`,
        email,
        contact: contactNumber ? `0${contactNumber}` : '',
        password,
        birth_date: formatDate2Digit(selectedDate),
        gender: gender === 'Male',
        active: !!location.state.email_verified,
        profile: profilePicture,
      });
      dispatch(setCredentials({ user: response.data }));
      showSuccessToast('Successfully registered');
      navigate('/user/pending');
    } catch (err) {
      if (err instanceof AxiosError) {
        showErrorToast(err);
      } else {
        showErrorToast('Unable to register');
      }
    } finally {
      handleResetAll();
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-screen-2xl max-h-screen mx-auto px-4 overflow-hidden">
      <Navbar />
      <div className="flex ">
        <div className="flex flex-col w-4/12 p-10 bg-[#41924B] items-center">
          <div className="relative mb-10" id="profilePicture">
            <div className="size-56 rounded-full overflow-hidden flex justify-center items-center">
              <img
                alt="Profile"
                src={profilePicture || DefaultPp}
                className={`w-full h-full object-cover rounded-full object-center  ${profilePicture ? 'bg-white' : ''}`}
              />
            </div>
            <FaTrash
              color="#e74c3c"
              className="absolute bottom-0 right-4 cursor-pointer"
              onClick={removeProfilePicture}
              size={30}
            />
          </div>
          <div className="mb-10">
            <input
              type="file"
              accept="image/*"
              id="profilePhoto"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="profilePhoto"
              className="bg-neutral-50 rounded-full px-10 py-2 font-semibold cursor-pointer"
            >
              UPLOAD
            </label>
          </div>
          <div className="text-center rounded-lg py-3 px-5 text-sm bg-[#F1F6FA] mb-10">
            <p className="mb-2">
              Upload an avatar. Larger image will be resized automatically
            </p>
            <p>
              Maximum upload size is <b>1 MB</b>
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col pl-20 bg-slate-50 p-5">
          <div className="border-b-2 pb-5 my-10">
            <h1 className="text-3xl font-bold">Basic Details</h1>
          </div>

          <div className="grid grid-cols-2 mx-10 ">
            <div className="card mb-8">
              <h2 className="text-xl font-semibold mb-3">First Name</h2>
              <input
                type="text"
                value={firstName}
                onChange={handleFirstNameChange}
                className={`w-9/12 border-b-2 px-1 py-2 bg-transparent ${firstNameError ? 'border-red-500' : ''}`}
              />
              {firstNameError && (
                <p className="text-red-500">{firstNameError}</p>
              )}
            </div>
            <div className="card mb-8">
              <h2 className="text-xl font-semibold mb-3">Last Name</h2>
              <input
                type="text"
                value={lastName}
                onChange={handleLastNameChange}
                className={`w-9/12 border-b-2 px-1 py-2 bg-transparent ${lastNameError ? 'border-red-500' : ''}`}
              />
              {lastNameError && <p className="text-red-500">{lastNameError}</p>}
            </div>
            <div className="card mb-8">
              <h2 className="text-xl font-semibold mb-3">Email</h2>
              <input
                type="email"
                disabled={location.state.google}
                value={email}
                onChange={handleEmailChange}
                className={`w-9/12 border-b-2 px-1 py-2 bg-transparent ${emailError ? 'border-red-500' : ''}`}
              />
              {emailError && <p className="text-red-500">{emailError}</p>}
            </div>
            <div className="card mb-8">
              <h2 className="text-xl font-semibold mb-3">Contact</h2>
              <div className="flex w-9/12 border-b-2">
                <div className="flex w-1/12 items-center">+63</div>
                <input
                  type="tel"
                  value={contactNumber}
                  onChange={handleContactChange}
                  maxLength={10}
                  className="ml-1 px-1 py-2 w-11/12 bg-transparent"
                />
              </div>
            </div>
            <div
              className={`card mb-8 relative ${passwordMismatch ? 'border-red-500' : ''}`}
            >
              <h2 className="text-xl font-semibold mb-3">Password</h2>
              <div className="flex items-center w-9/12 border-b-2 relative">
                <input
                  type={visiblePass === false ? 'password' : 'text'}
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full px-1 py-2 bg-transparent"
                />
                <div className="absolute right-0 top-0 bottom-0 flex items-center px-2">
                  {visiblePass === false ? (
                    <BsFillEyeSlashFill size={25} onClick={togglePassword} />
                  ) : (
                    <BsFillEyeFill size={25} onClick={togglePassword} />
                  )}
                </div>
              </div>
              {passwordError && <p className="text-red-500">{passwordError}</p>}
            </div>
            <div
              className={`card mb-8 ${passwordMismatch ? 'border-red-500' : ''}`}
            >
              <h2 className="text-xl font-semibold mb-3">Retype Password</h2>
              <div className="flex items-center w-9/12 border-b-2 relative">
                <input
                  type={visibleRePass === false ? 'password' : 'text'}
                  value={retypePassword}
                  onChange={handleRetypePasswordChange}
                  className="w-full px-1 py-2 bg-transparent"
                />
                <div className="absolute right-0 top-0 bottom-0 flex items-center px-2">
                  {visibleRePass === false ? (
                    <BsFillEyeSlashFill size={25} onClick={toggleRePassword} />
                  ) : (
                    <BsFillEyeFill size={25} onClick={toggleRePassword} />
                  )}
                </div>
              </div>
              {passwordMismatch && (
                <p className="text-red-500">Password does not match</p>
              )}
            </div>
            <div className="card">
              <h2 className="text-xl font-semibold mb-3">Birthday</h2>
              <div className="flex items-center w-9/12 border-b-2 px-1 py-2 ">
                <DatePicker
                  className="px-1 py-2 bg-transparent "
                  placeholderText="Select Your Birthday"
                  selected={selectedDate}
                  onChange={handleDateChange}
                />
              </div>
            </div>
            <div className="card">
              <h2 className="text-xl font-semibold mb-3">Gender</h2>
              <div className="flex items-center w-9/12 border-b-2 px-1 py-2 ">
                <select
                  name="gender"
                  id="gender"
                  value={gender}
                  onChange={handleGenderChange}
                  className={`px-1 py-2 bg-transparent ${genderError ? 'border-red-500' : ''}`}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              {genderError && <p className="text-red-500">{genderError}</p>}
            </div>
          </div>

          <div className="flex justify-end pb-40 mx-10 mt-20">
            <div className="flex items-center justify-center mr-10 ">
              <button
                type="button"
                className="text-lg font-semibold text-neutral-400 rounded-full border-2 px-16 py-3"
                onClick={handleResetAll}
              >
                Reset All
              </button>
            </div>
            <div className="bg-[#41924B] rounded-full mr-[126px]">
              <button
                type="button"
                className="text-slate-50 font-semibold px-16 py-3 text-lg"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
