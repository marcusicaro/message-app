'use client';
import React, { useState } from 'react';
import Button from '@/components/shared/Button';
import FormContainer from '@/components/shared/FormContainer';
import InputField from '@/components/shared/InputField';
import { failToast, successToast } from '@/lib/toast';
import { useRouter } from 'next/navigation';
import Loader from '../ui/loader';

export default function CreateAccountForm() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function createAccount() {
    setLoading(true);
    if (password !== confirmPassword) {
      setLoading(false);
      return failToast('Passwords do not match');
    }

    try {
      const res = await fetch(projectUrl + '/user/signup', {
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
        setLoading(false);
        return failToast('error 500');
      }
      const data = await res.json();

      if (data.email) {
        setLoading(false);
        successToast('Account created, check your email to verify');
        router.push('/');
        return;
      }
      setLoading(false);
      successToast('Account created');
    } catch (err) {
      setLoading(false);
      failToast('Failed to create account');
    }
  }

  return (
    <>
      {loading && <Loader />}
      {loading === false && (
        <FormContainer title='Create your account'>
          <div className='relative z-0 w-full mb-6 group'>
            <InputField
              value={username}
              label='Username'
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
      )}
    </>
  );
}
