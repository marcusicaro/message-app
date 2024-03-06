'use client';
import Button from '@/components/shared/Button';
import FormContainer from '@/components/shared/FormContainer';
import InputField from '@/components/shared/InputField';
import { failToast, successToast } from '@/lib/toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Loader from '../ui/loader';

export default function ForgotPasswordModal() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  async function handleSendRecoveryLink() {
    setLoading(true);
    try {
      let res = await fetch(projectUrl + '/user/forgot-password', {
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
      const data = await res.json();
      if (data.error) {
        failToast(data.error);
        return;
      }
      setLoading(false);
      successToast('Recovery link sent');
      router.push('/change-password');
    } catch (err) {
      setLoading(false);
      failToast('Failed to send recovery link');
    }
  }

  return (
    <>
      {loading && <Loader />}
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
    </>
  );
}
