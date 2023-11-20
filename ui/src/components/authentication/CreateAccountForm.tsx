'use client';
import React, { useState } from 'react';
import Button from '@/components/shared/Button';
import FormContainer from '@/components/shared/FormContainer';
import InputField from '@/components/shared/InputField';

export default function CreateAccountForm() {
  const [username, setUsername] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  return (
    <FormContainer title='Create your account'>
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
