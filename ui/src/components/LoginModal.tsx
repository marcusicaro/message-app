// LoginModal.jsx
import React, { useState } from 'react';
import Button from './Button';
import FormContainer from './FormContainer';
import InputField from './InputField';

export default function LoginModal() {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <FormContainer title='Sign in to your account'>
      <InputField
        onChange={(e) => setLogin(e.target.value)}
        type='email'
        label='Your email'
        placeholder='name@company.com'
        required
        value={login}
      />
      <InputField
        onChange={(e) => setPassword(e.target.value)}
        type='password'
        label='Password'
        placeholder='password'
        required
        value={password}
      />
      <div className='flex items-center justify-between mt-4'>
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
      <Button onClick={() => {}} text={'Sign in'} />
      <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
        Don't have an account yet?
        <a
          href='/create-account'
          className='font-medium text-primary-600 hover:underline dark:text-primary-500'
        >
          Sign up
        </a>
      </p>
    </FormContainer>
  );
}
