import React from 'react';

interface ChatPreview {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  name: string;
  lastMessage: string;
  imgSrc: string;
  group: boolean;
  lastGroupMessager?: string;
  selected: boolean;
}

function ChatPreview(props: ChatPreview): JSX.Element {
  return (
    <div
    data-name={props.name}
    onClick={props.onClick}
      className={
        'flex flex-row py-4 px-2 justify-center items-center border-b-2' +
        (props.selected === true ? ' border-l-4 border-blue-400' : '')
      }
    >
      <div className='w-1/4'>
        <img
          src={props.imgSrc}
          className='object-cover h-12 w-12 rounded-full'
          alt=''
        />
      </div>
      <div className='w-full'>
        <div className='text-lg font-semibold'>{props.name}</div>
        <span className='text-gray-500'>
          {props.group ? props.lastGroupMessager + ': ' : null}
          {props.lastMessage}
        </span>
      </div>
    </div>
  );
}

export default ChatPreview;
