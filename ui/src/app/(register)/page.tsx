'use client';
import LoginModal from '@/components/LoginModal';
import dynamic from 'next/dynamic';
import { useState } from 'react';

// // Client Components:
// const ComponentA = dynamic(() => import('../../components/login-modal.tsx'), {
//   ssr: false,
// });
// const ComponentB = dynamic(
//   () => import('../../components/create-account-form.tsx'),
//   {
//     ssr: false,
//   }
// );

export default function Home() {
  return <LoginModal />;
}
