import React from 'react';
import Image from 'next/image';
import chatimePicture from '../../../public/chatime.jpg';

export default function BgHome() {
  return (
    <div className='w-7/12 h-full right-0 absolute'>
      <Image alt='Chatime background' src={chatimePicture} fill={true} />
    </div>
  );
}
