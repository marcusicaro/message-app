import React from 'react';
import Image from 'next/image';
import chatimePicture from '../../../public/chatime.jpg';

export default function BgHome() {
  return (
    <div className='h-full flex'>
      <Image
        src={chatimePicture}
        alt="Chatime"
        style={{height: 'auto'}}
      />
    </div>
  );
}