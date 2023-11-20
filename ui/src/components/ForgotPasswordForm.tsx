'use client';
import React, { useState } from 'react';
import Button from './Button';
import FormContainer from './FormContainer';
import InputField from './InputField';

export default function ForgotPasswordModal() {
  const [email, setEmail] = useState('');

  return (
    <FormContainer>
      <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
        Sign in to your account
      </h1>
      <InputField
        onChange={(e) => setEmail(e.target.value)}
        type='email'
        label='Your email'
        placeholder='name@company.com'
        required
        value={email}
      />
      <Button onClick={() => {}} text={'Send recovery link'} />
    </FormContainer>
  );
}
