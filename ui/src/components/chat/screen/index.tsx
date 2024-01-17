import React, { useId, useRef } from 'react';
import ChatScreenMessage, { Message } from './message';

interface ChatScreen {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  messages: Array<Message>;
  members?: Array<string>;
}

function ChatScreen(props: ChatScreen): JSX.Element {
  const prevSenderRef = useRef<string | null>(null);
  const groupedMessages:any = [];

  function isSameSender(message: Message) {
    return prevSenderRef.current === message.sender;
  }
 
  props.messages.forEach((message, index) => {
    if (index === 0 || prevSenderRef.current !== message.sender) {
      groupedMessages.push([message]);
      prevSenderRef.current = message.sender;

    } else {
      groupedMessages[groupedMessages.length - 1].push(message);
      prevSenderRef.current = message.sender;
    }
  });
 
  return (
    <div className='w-full px-5 flex flex-col justify-between'>
      <div className='flex flex-col mt-5'>
        {groupedMessages.map((group:any, index:any) => {
          return (
            <div className=' [&>.justify-start:last-child>*]:rounded-bl-none [&>.justify-end:last-child>*]:rounded-br-none ' key={index}>
              {group.map((message:any) => {
                return (
                 <ChatScreenMessage 
                   key={useId()}
                   showPicture={isSameSender(message)}
                   text={message.text} 
                   sender={message.sender} 
                   picture={message.picture} 
                 />
                )
              })}
            </div>
          )
        })}
      </div>
      <div className='py-5'>
        <input
          className='w-full bg-gray-300 py-5 px-3 rounded-xl'
          type='text'
          placeholder='type your message here...'
        />
      </div>
    </div>
  )
 }
 

export default ChatScreen;