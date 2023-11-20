'use client';
import React, { useState } from 'react';
import Button from './Button';
import FormContainer from './FormContainer';
import InputField from './InputField';

export default function ForgotPasswordModal() {
  const [email, setEmail] = useState('');

  return (
    <FormContainer title='Send a verification code to your email'>
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
