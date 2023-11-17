'use client';
import Link from 'next/link';
import React, { useState } from 'react';

export default function LoginModal() {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className='bg-gray-50 border focus:border-cyan-400 outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='name@company.com'
              required
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type='password'
              name='password'
              id='password'
              placeholder='password'
              className='bg-gray-50 border focus:border-cyan-400 outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              required
            />
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <div className='flex items-center h-5'>
                <input
                  id='remember'
                  aria-describedby='remember'
                  type='checkbox'
                  className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                  required
                />
              </div>
              <div className='ml-1 text-sm flex'>
                <label
                  htmlFor='remember'
                  className='text-gray-500 dark:text-gray-300 leading-none'
                >
                  Remember me
                </label>
              </div>
            </div>
            <a
              href='#'
              className='text-sm leading-none flex font-medium text-primary-600 hover:underline dark:text-primary-500'
            >
              Forgot password?
            </a>
          </div>
          <button
            type='submit'
            className='w-full text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all hover:bg-blue-500 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
          >
            Sign in
          </button>
          <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
            Don't have an account yet?
            <Link
              href='/create-account'
              className='font-medium text-primary-600 hover:underline dark:text-primary-500'
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
