'use client';
import Button from '@/components/shared/Button';
import FormContainer from '@/components/shared/FormContainer';
import InputField from '@/components/shared/InputField';
import { failToast } from '@/lib/toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ForgotPasswordModal() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  function handleSendRecoveryLink() {
    try {
      fetch('http://localhost:3002/user/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
          email,
        }),
      });
      router.push('/change-password');
    } catch (err) {
      failToast('Failed to send recovery link');
    }
  }

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
      <Button onClick={handleSendRecoveryLink} text={'Send recovery link'} />
    </FormContainer>
  );
}
