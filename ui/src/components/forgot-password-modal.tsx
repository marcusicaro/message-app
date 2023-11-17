'use client';
import React, { useState } from 'react';

export default function ForgotPasswordModal() {
  const [email, setEmail] = useState('');

  return (
    <div className=' relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600  dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800'>
      <div className='w-96 p-6 bg-white space-y-4 md:space-y-6 sm:p-8 rounded-lg'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
          Sign in to your account
        </h1>
        <form className='space-y-4 md:space-y-6' action='#'>
          <div>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Your email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-gray-50 border focus:border-cyan-400 outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='name@company.com'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all hover:bg-blue-500 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
          >
            Send recovery link
          </button>
        </form>
      </div>
    </div>
  );
}
