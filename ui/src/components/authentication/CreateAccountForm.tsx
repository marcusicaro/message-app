'use client';
import React, { useState } from 'react';
import Button from '@/components/shared/Button';
import FormContainer from '@/components/shared/FormContainer';
import InputField from '@/components/shared/InputField';
import { failToast, successToast } from '@/lib/toast';
import { useRouter } from 'next/navigation';

export default function CreateAccountForm() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const router = useRouter();

  async function createAccount() {
    if (password !== confirmPassword) {
      return failToast('Passwords do not match');
    }

    try {
      const res = await fetch('http://localhost:3002/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (res.status === 500) {
        return failToast('error 500');
      }
      const data = await res.json();

      if (data.email) {
        successToast('Account created, check your email to verify');
        router.push('/');
        return;
      }
      successToast('Account created');
    } catch (err) {
      failToast('Failed to create account');
    }
  }

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
          value={email}
          label='Email address'
          type='email'
          placeholder=''
          onChange={(e) => setEmail(e.target.value)}
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
      <Button onClick={createAccount} text={'Submit'} />
    </FormContainer>
  );
}
