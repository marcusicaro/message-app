import React from 'react';

interface ChatPreview {
  onClick: () => void;
  name: string;
  lastMessage: string;
  imgSrc: string;
}

function ChatPreview(props: ChatPreview): JSX.Element {
  return (
    <div className='flex flex-row py-4 px-2 justify-center items-center border-b-2'>
      <div className='w-1/4'>
        <img
          src={props.imgSrc}
          className='object-cover h-12 w-12 rounded-full'
          alt=''
        />
      </div>
      <div className='w-full'>
        <div className='text-lg font-semibold'>{props.name}</div>
        <span className='text-gray-500'>{props.lastMessage}</span>
      </div>
    </div>
  );
}

export default ChatPreview;
