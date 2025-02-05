// SignIn.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Login = () => {


  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    console.log(response); // Log user information
    // Extract user details from the response
    response = await jwtDecode(response.credential);
    console.log(response); //
    const userDetails = {
      name: response.given_name + " " + response.family_name,
      email: response.email,
      address: '', // You may need to fetch the address separately using Google APIs
      phone: '', // You may need to fetch the phone number separately using Google APIs
    };
    // Store user details in local storage
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    // Handle Google sign-in response
    navigate('/dashboard');
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in with Google</h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <GoogleLogin
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              buttonText="Sign in with Google"
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
