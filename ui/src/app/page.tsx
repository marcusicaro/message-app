import Image from 'next/image';
import chatimePicture from '../../public/chatime.jpg';

export default function Home() {
  return (
    <div className='flex w-screen h-screen'>
      <div className='w-42 h-full flex items-center justify-center left-0 absolute rounded-md bg-white z-10'>
        <div className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 '>
          <div className='relative bg-white dark:bg-gray-900 rounded-md flex flex-col gap-4'>
            <div>
              <label
                htmlFor='login'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Login
              </label>
              <input
                type='text'
                id='login'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Login'
                required
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Password'
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div className='w-7/12 h-full right-0 absolute'>
        <Image alt='Chatime background' src={chatimePicture} fill={true} />
      </div>
    </div>
  );
}
