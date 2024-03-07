import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    setLoading(true);
    const pb = new PocketBase('https://tangerine-panda.pikapod.net');

    try {
      const authData = await pb.collection('users').authWithPassword(
        formData.email,
        formData.password
      );

      if (authData) {
        // If login is successful, redirect the user to the profile page
        router.push('/profiles');
      } else {
        setError('Incorrect email or password.');
      }
    } catch (error) {
      setError('May be incorrect password or Email ID');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-500 to-orange-400">
          <h2 className="text-3xl font-bold text-white mb-2">Log In</h2>
          <p className="text-white text-sm">Log in to your account</p>
        </div>
        <div className="p-6 bg-white">
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-yellow-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-yellow-500" />
            </div>
            <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600" disabled={loading}>
              {loading ? 'Logging In...' : 'Log In'}
            </button>
          </form>
          <p className="text-center mt-4 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
