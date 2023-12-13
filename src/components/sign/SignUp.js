import { useState, useEffect } from 'react';
import Image from "next/image";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { FiEye, FiEyeOff } from 'react-icons/fi'; 
import Link from "next/link";
import { db } from "../../firebase/firebase";
import { collection, addDoc, setDoc } from "firebase/firestore";

const SignUp = ({data}) => {
  console.log(data)
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    setError(null);

    if (!name || !dob || !phone || !email || !state || !pincode || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userId = user.uid;
      const userEmail = user.email;

      const userState= state;
      const userPincode= pincode;
      const userDob = dob;
      const userPhone = phone;
      const userName = name;


      const added = await addDataToFireStore(userId, userEmail, userName, userPhone, userState, userPincode, userDob);
        if(added) {
            setName(""),
            setDob(""),
            setPhone(""),
            setEmail(""),
            setState(""),
            setPincode(""),
            setPassword(""),
            setConfirmPassword(""),

           alert ("Data stored to database");
        }

      console.log('User signed up successfully! UID:', userId, 'Email:', userEmail, 'Name: ', 
      userName, 'Phone: ',userPhone, 'userDob: ', userDob, 'userState: ', userState, 'userPincode: ', userPincode);
    } catch (error) {
      console.error('Error signing up:', error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  async function addDataToFireStore(userId, userEmail, userName, userPhone, userState , userPincode,userDob){
    try{
      const docRef = await addDoc(collection(db, "SignUp"), {
        userId: userId,
        userEmail: userEmail,
        userName: userName,
        userPhone: userPhone,
        userState: userState,
        userPincode: userPincode,
        userDob: userDob,
        role: "user",        
      });
      console.log("first", docRef.id);
      return true;
    } catch (error) {
      console.error("error adding document", error)
      return false;
    }
  }

  const [detail, setDetail] = useState([]);
  useEffect(() => {
    setDetail(data?.cities);
  }, [data?.cities]);
  console.log(detail)

  return (
    <div className="flex flex-row items-center justify-between">
   
     {/* form */}
      <div className="w-full md:w-[70%] max-w-3xl px-10 mx-10  bg-white rounded-md shadow-md my-10 ">
      <h2 className="text-2xl font-semibold mb-4 text-center text-secondary border-b-2 pb-2">Sign Up</h2>
      <form className="space-y-3">

        {/* name and username */}
        <div className="flex flex-col sm:flex-row sm:space-x-8 sm:items-center">
      <div className="mb-4 sm:w-1/2">
        <label htmlFor="name" className="block text-gray-700 mb-1">
          Full Name:
        </label>
        <input
          type="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl focus:outline-0 focus:border-primary bg-slate-50"
        />
      </div>

      <div className="mb-4 sm:w-1/2">
        <label htmlFor="dob" className="block text-gray-700 mb-1">
          Date of Birth:
        </label>
        <input
          type="dob"
          id="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl focus:outline-0 focus:border-primary bg-slate-50"
        />
      </div>
    </div>
        

    <div className="flex flex-col sm:flex-row sm:space-x-8 sm:items-center">
      <div className="mb-4 sm:w-1/2">
        <label htmlFor="phone" className="block text-gray-700 mb-1">
          Contact Number:
        </label>
        <input
          type="phone"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl focus:outline-0 focus:border-primary bg-slate-50"
        />
      </div>

      <div className="mb-4 sm:w-1/2">
        <label htmlFor="email" className="block text-gray-700 mb-1">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl focus:outline-0 focus:border-primary bg-slate-50"
        />
      </div>
    </div>

    <div className="flex flex-col sm:flex-row sm:space-x-8 sm:items-center">
           <div className="mb-4 sm:w-1/2">
          <label htmlFor="state" className="block text-gray-700 mb-1">
            Select State
          </label>
          <select
            id="state"
            name="state" 
            value={state} 
            onChange={(e) => setState(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-0 focus:border-primary bg-slate-50"
            required
          >
            <option value="" disabled>
              Select a State
            </option>
            {detail?.map((state, index) => (
            <option key={index} value={state.name}>
              {state.name}
            </option>
          ))}
          </select>
        </div>

      <div className="mb-4 sm:w-1/2">
        <label htmlFor="pincode" className="block text-gray-700 mb-1">
          Pin Code:
        </label>
        <input
          type="pincode"
          id="pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl focus:outline-0 focus:border-primary bg-slate-50"
        />
      </div>
    </div>
 

            {/* <label className="block text-gray-700 my-2 ">Password:</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl focus:outline-0 focus:border-primary bg-slate-50"
              />
              <span
                className="absolute top-2 right-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
    
            <label className="block text-gray-700">Confirm Password:</label>
            <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-0 focus:border-primary bg-slate-50"
            />
            <span
                className="absolute top-2 right-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div> */}

<div className="flex flex-col sm:flex-row sm:space-x-8 sm:items-center">
      <div className="mb-4 sm:w-1/2">
        <label htmlFor="password" className="block text-gray-700 mb-1">
          Password:
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-0 focus:border-primary bg-slate-50"
          />
          <span
            className="absolute top-2 right-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
      </div>

      <div className="mb-4 sm:w-1/2">
        <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">
          Confirm Password:
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-0 focus:border-primary bg-slate-50"
          />
          <span
            className="absolute top-2 right-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
      </div>
    </div>

 
        {error && <p className="text-red-500">{error}</p>}

        <button
          type="button"
          onClick={handleSignUp}
          className="w-full px-4 py-2 bg-secondary text-white rounded-md focus:outline-none hover:bg-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <p>If already a user? <Link href="./signin" className="font-bold text-primary ml-2"> SignIn</Link></p>
      </form>
    </div>

     {/* image */}
     <div className="hidden md:flex ">
        <div>
           <Image src="/signup.svg" height={900} width={400} alt="" className="h-full"/>
        </div>
     </div>
    </ div>
  );
};

export default SignUp;



