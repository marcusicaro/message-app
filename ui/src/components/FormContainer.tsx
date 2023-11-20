import React, { useState } from 'react';

interface FormContainerProps {
  children: React.ReactNode;
  title: string;
}

export default function FormContainer({ children, title }: FormContainerProps) {
  return (
    <form
      className='flex w-96 flex-col p-0.5 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600  dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800'
      autoComplete='off'
    >
      <div className='flex space-y-4 md:space-y-6 flex-col px-6 py-8 rounded-lg group bg-white'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
          {title}
        </h1>
        {children}
      </div>
    </form>
  );
}
