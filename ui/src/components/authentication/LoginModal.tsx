// LoginModal.jsx
import React, { useState } from 'react';
import Button from '@/components/shared/Button';
import FormContainer from '@/components/shared/FormContainer';
import InputField from '@/components/shared/InputField';
import Link from 'next/link';

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
              className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300'
              required
            />
          </div>
          <div className='ml-1 text-sm flex'>
            <label
              htmlFor='remember'
              className='text-gray-500 leading-none'
            >
              Remember me
            </label>
          </div>
        </div>
        <Link
          href='#'
          className='text-sm leading-none flex font-medium text-primary-600 hover:underline'
        >
          Forgot password?
        </Link>
      </div>
      <Button onClick={() => {}} text={'Sign in'} />
      <p className='text-sm font-light text-gray-500'>
        Don't have an account yet?
        <Link
          href='/create-account'
          className='font-medium text-primary-600 hover:underline'
        >
          Sign up
        </Link>
      </p>
    </FormContainer>
  );
}
