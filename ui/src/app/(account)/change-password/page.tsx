'use client';
import Button from '@/components/shared/Button';
import FormContainer from '@/components/shared/FormContainer';
import InputField from '@/components/shared/InputField';
import { failToast, successToast } from '@/lib/toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ChangePasswordPage() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const router = useRouter();

  async function handleSendRecoveryLink() {
    try {
      let response = await fetch('http://localhost:3002/user/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
          token,
          password,
        }),
      });
      const data = await response.json();
      if (data.error) {
        failToast(data.error);
        return;
      }
      successToast('Password changed successfully');
      router.push('/');
    } catch (err) {
      failToast('Failed to send recovery link');
    }
  }

  return (
    <FormContainer title='Send a verification code to your email'>
      <InputField
        onChange={(e) => setPassword(e.target.value)}
        type='password'
        label='Your new password'
        placeholder='Password'
        required
        value={password}
      />
      <InputField
        onChange={(e) => setToken(e.target.value)}
        type='text'
        label='Verification token'
        placeholder='Token'
        required
        value={token}
      />
      <Button onClick={handleSendRecoveryLink} text={'Send recovery link'} />
    </FormContainer>
  );
}
