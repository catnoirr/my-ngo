'use client';

import { useState } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Image from 'next/image';

const PatientSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dietaryNeeds: '',
    password: '',
    medicalDocumentation: null,
    consent: false,
  });

  const [isLogin, setIsLogin] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFormData({ ...formData, medicalDocumentation: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.password) {
      setMessage('Password is required.');
      setLoading(false);
      return;
    }

    try {
      if (!isLogin) {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: formData.name });
        await addDoc(collection(db, 'patients'), {
          uid: user.uid,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          dietaryNeeds: formData.dietaryNeeds,
          consent: formData.consent,
        });

        setMessage('Successfully registered! Redirecting to login...');
        setTimeout(() => {
          setIsLogin(true);
          setMessage('');
          setLoading(false);
        }, 3000);
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        setMessage('Logged in successfully! Redirecting to dashboard...');
        setTimeout(() => {
          router.push('/patients/dashboard');
          setLoading(false);
        }, 3000);
      }
    } catch (error) {
      let errorMessage = '';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'User does not exist. Please sign up.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Please check your password.';
      } else {
        errorMessage = 'Check your details. Please try again.';
      }
      setMessage(errorMessage);
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setIsForgotPassword(false);
    setMessage('');
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
    setIsLogin(false);
    setMessage('');
  };

  return (
    <div className="flex flex-col md:flex-row max-w-5xl mx-auto mb-8 p-8 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-xl mt-10 md:gap-4">
      <div className="md:w-1/2 overflow-hidden rounded-l-lg hidden md:block">
        <Image src="/boy.png" alt="Patient Illustration" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" width={400} height={400} />
      </div>
      <div className="md:w-1/2 p-6 bg-white rounded-r-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-yellow-600">
          {isForgotPassword ? 'Reset Password' : isLogin ? 'Patient Login' : 'Patient Sign Up'}
        </h2>
        {message && <div className="mb-4 text-center text-yellow-600">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isForgotPassword && (
            <>
              {!isLogin && (
                <>
                  <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg" />
                  <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg" />
                  <input type="file" onChange={handleFileChange} className="w-full p-3 border border-gray-300 rounded-lg" />
                </>
              )}
              <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg" />
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg" />
                <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 cursor-pointer">
                  {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                </span>
              </div>
              <div className="flex items-center mb-4">
                <input type="checkbox" name="consent" onChange={(e) => setFormData({ ...formData, consent: e.target.checked })} className="mr-2" />
                <label className="text-gray-700 text-sm">I consent to data sharing with volunteers</label>
              </div>
            </>
          )}
          <button type="submit" className="w-full bg-yellow-600 text-white p-3 rounded-lg">
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              isForgotPassword ? 'Send Reset Link' : isLogin ? 'Login' : 'Sign Up'
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          {isForgotPassword ? (
            <span onClick={toggleForgotPassword} className="text-yellow-600 cursor-pointer">Back to Login</span>
          ) : (
            <>
              {isLogin ? <>Don&apos;t have an account? <span onClick={toggleForm} className="text-yellow-600 cursor-pointer">Sign Up</span></> :
                <>Already have an account? <span onClick={toggleForm} className="text-yellow-600 cursor-pointer">Login</span></>
              }
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default PatientSignUp;
