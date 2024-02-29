import { Message, User } from '@/lib/types';
import { useState } from 'react';

export default function ChatScreenMessage(props: Message): JSX.Element {
  const [activeUser, setActiveUser] = useState<User>({ name: 'Marcus' });
  return (
    <div
      data-sender={props.sender}
      className={`flex ${
        activeUser.name !== props.sender ? 'justify-start' : 'justify-end'
      } mb-4`}
    >
      {activeUser.name !== props.sender && props.showPicture && (
        <div className='flex-none flex items-end'>
          <img
            src={props.picture}
            className='object-cover h-8 w-8 rounded-full opacity-0'
            alt=''
          />
        </div>
      )}
      {activeUser.name === props.sender && (
        <div
          className={`ml-2 py-3 px-4 ${
            activeUser.name === props.sender ? 'bg-gray-400' : 'bg-blue-400'
          } rounded-br-3xl rounded-tr-3xl rounded-tl-xl rounded-bl-xl text-white`}
        >
          {props.text}
        </div>
      )}
      {activeUser.name !== props.sender && (
        <div
          className={`ml-2 py-3 px-4 ${
            activeUser.name === props.sender ? 'bg-gray-400' : 'bg-blue-400'
          } rounded-br-3xl rounded-tr-3xl rounded-tl-xl rounded-bl-xl  text-white`}
        >
          {props.text}
        </div>
      )}
    </div>
  );
}
