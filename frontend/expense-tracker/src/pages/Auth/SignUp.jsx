import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';

const Signup = () => {

  const [profilePic,setProfilePic] = useState(null);
  const [fullName,setFullName] = useState('');
  const[email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  //handle signup form submit
  const handleSignup = async(e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if(!fullName){
      setError("Please enter your name");
      return;
    }

    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }
    if(!password){
      setError("Please enter a password");
      return;
    }

    setError("");

    //signup api call
    
    try{

      //upload image if present
      if(profilePic){
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes.imageurl || ""; // Changed from imageUrl to imageurl
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{ // Changed from SIGNUP to REGISTER
        fullName,
        email,
        password,
        profileImageUrl
      });
      const {token, user} = response.data;
      if(token){
        localStorage.setItem("token",token);
        updateUser(user);
        navigate("/dashboard");
      }
    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong, Please try again");
      }
    }

  };

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center '>
        <h3 className='text-xl font-semibold text-black'>Create An Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6  '>Join us today by entering your details below.</p>

        <form onSubmit={handleSignup} >

            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}  />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            label='Full Name :'
            type='text'
            placeholder='John'
            />
         

          <Input 
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address : "
          placeholder='John@example.com'
          />

            <div className='col-span-2'>

          <Input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password : "
          placeholder='Min 8 Characters'
          />
            </div>
            </div>

             {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
            
                      <button type='submit'
                       className='btn-primary '>
                        SIGNUP
                       </button>
                       <p className='text-[13px] text-slate-800 mt-3'>
                        Already have an account? {""}
                        <Link className='font-medium text-primary underline ' to='/login'>
                          Login
                        </Link>
                        </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Signup
