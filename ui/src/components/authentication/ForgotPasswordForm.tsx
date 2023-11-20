'use client';
import React, { useState } from 'react';
import Button from '@/components/shared/Button';
import FormContainer from '@/components/shared/FormContainer';
import InputField from '@/components/shared/InputField';

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
