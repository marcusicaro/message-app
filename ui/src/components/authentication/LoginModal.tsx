// LoginModal.jsx
import Button from '@/components/shared/Button';
import FormContainer from '@/components/shared/FormContainer';
import InputField from '@/components/shared/InputField';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUser } from '../context/user';
import { failToast } from '@/lib/toast';

export default function LoginModal() {
  const { state, dispatch } = useUser();
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  function handleLoginResponse(data: any): void {
    const { profilePicture, username } = data;

    dispatch({
      type: 'LOGIN',
      payload: {
        profilePicture: 'http://localhost:3002/' + profilePicture,
        username: username,
      },
    });
    router.push('/chat-screen');
  }

  async function handleLogin(): Promise<void> {
    try {
      const res = await fetch('http://localhost:3002/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
          username: login,
          password: password,
        }),
      });

      if (res.status === 500) {
        return console.log('error 500');
      }

      const data = await res.json();

      handleLoginResponse(data);
    } catch (err) {
      failToast('Failed to login');
    }
  }

  return (
    <FormContainer title='Sign in to your account'>
      <InputField
        onChange={(e) => setLogin(e.target.value)}
        type='text'
        label='Your username'
        placeholder='username'
        required
        value={login}
      />
      <InputField
        onChange={(e) => setPassword(e.target.value)}
        type='password'
        label='Password'
        placeholder='password'
        required
        value={password}
      />
      <div className='flex items-center justify-between mt-4'>
        <div className='flex items-center'>
          <div className='flex items-center h-5'>
            <input
              id='remember'
              aria-describedby='remember'
              type='checkbox'
              className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300'
            />
          </div>
          <div className='ml-1 text-sm flex'>
            <label htmlFor='remember' className='text-gray-500 leading-none'>
              Remember me
            </label>
          </div>
        </div>
        <Link
          href='/forgot-password'
          className='text-sm leading-none flex font-medium text-primary-600 hover:underline'
        >
          Forgot password?
        </Link>
      </div>
      <Button onClick={() => handleLogin()} text={'Sign in'} />
      <p className='text-sm font-light text-gray-500'>
        Don't have an account yet?
        <Link
          href='/create-account'
          className='font-medium text-primary-600 hover:underline'
        >
          &nbsp;Sign up
        </Link>
      </p>
    </FormContainer>
  );
}
