import { ReactNode } from 'react';
import BgHome from '../../components/bg-home.js';

export default function MainLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className='flex w-screen h-screen'>
      {children}
      <BgHome />
    </div>
  );
}
