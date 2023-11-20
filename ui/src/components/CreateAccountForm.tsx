'use client';
import React, { useState } from 'react';
import Button from '@/components/Button';
import FormContainer from './FormContainer';
import InputField from '@/components/InputField';

export default function CreateAccountForm() {
  const [username, setUsername] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  return (
    <FormContainer>
      <h1 className='text-xl mb-6 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
        Create your account
      </h1>
      <div className='relative z-0 w-full mb-6 group'>
        <InputField
          value={username}
          label='Name'
          type='text'
          placeholder=''
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='relative z-0 w-full mb-6 group'>
        <InputField
          value={login}
          label='Email address'
          type='email'
          placeholder=''
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>
      <div className='relative z-0 w-full mb-6 group'>
        <InputField
          value={password}
          label='Password'
          type='password'
          placeholder=' '
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='relative z-0 w-full mb-6 group'>
        <InputField
          value={confirmPassword}
          label='Confirm password'
          type='password'
          placeholder='Confirm password'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <Button onClick={() => {}} text={'Submit'} />
    </FormContainer>
  );
}
