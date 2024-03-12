import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting the form
    try {
      // Perform sign up logic here
      const data = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.confirmPassword,
        name: formData.username // Assuming username is also the name
      };

      const record = await pb.collection('users').create(data);
      await pb.collection('users').requestVerification(formData.email);
      
      // If registration is successful, log in the user
      await pb.collection('users').authWithPassword(formData.email, formData.password);
      const currentUser = pb.authStore.model; // Fetch user information
      router.push(`/profile/${currentUser.id}`); // Redirect to profile page
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email address is already in use.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email format.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false); // Set loading back to false after submission
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-500 to-orange-400">
          <h2 className="text-3xl font-bold text-white mb-2">Create an Account</h2>
          <p className="text-white text-sm">Sign up to get started</p>
        </div>
        <div className="p-6 bg-white">
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
              <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-yellow-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-yellow-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-yellow-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-yellow-500" />
            </div>
            <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
