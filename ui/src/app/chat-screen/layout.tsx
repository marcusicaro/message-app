import { ReactNode } from 'react';
import BgHome from '../../components/home/BgHome';
import { Toaster } from '@/components/ui/toaster';

export default function MainLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <div className='flex w-screen h-screen'>{children}</div>;
      <Toaster />
    </>
  );
}
