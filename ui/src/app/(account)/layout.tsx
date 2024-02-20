import { ReactNode } from 'react';
import BgHome from '../../components/home/BgHome';

export default function MainLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className='flex w-screen h-screen'>
      <div className='w-42 h-full flex items-center justify-center left-0 rounded-md bg-white z-10 '>
        <section className='bg-gray-50'>
          <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
            {children}
          </div>
        </section>
      </div>
      <BgHome />
    </div>
  );
}
