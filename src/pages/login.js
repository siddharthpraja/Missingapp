import Link from 'next/link';
import React, { useState } from 'react';

const Login = () => {
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'otp'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleLogin = () => {
    if (loginMethod === 'email') {
      // Handle login with email
      console.log('Logging in with email:', email);
    } else {
      // Handle login with OTP
      console.log('Logging in with OTP:', otp);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-500 to-orange-400">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
          <p className="text-white text-sm">Login to your account</p>
        </div>
        <div className="p-6 bg-white">
          <div className="flex justify-between mb-4">
            <button
              className={`text-lg font-semibold ${
                loginMethod === 'email' ? 'text-yellow-600' : 'text-gray-600'
              }`}
              onClick={() => setLoginMethod('email')}
            >
              Email
            </button>
            <button
              className={`text-lg font-semibold ${
                loginMethod === 'otp' ? 'text-yellow-600' : 'text-gray-600'
              }`}
              onClick={() => setLoginMethod('otp')}
            >
              OTP
            </button>
          </div>
          {loginMethod === 'email' ? (
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-yellow-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-yellow-500"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          )}
          <button
            className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
            onClick={handleLogin}
          >
            Login
          </button>
          <p className="text-center mt-4 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href={"./signup"}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;