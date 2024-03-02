import { Button } from '@/components/ui/button';
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { mutate } from 'swr';
import AddMember from './AddMember';
import Members from './Member';
import ChatScreenMessage from './message';
import { ScrollArea } from '@/components/ui/scroll-area';
import { failToast } from '@/lib/toast';
import { Message } from '@/lib/types';

interface ChatScreen {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  messages: Array<Message>;
  members?: Array<any>;
  chatId: string;
  name: string;
}

function ChatScreen(props: ChatScreen): JSX.Element {
  const [message, setMessage] = useState<string>('');
  const prevSenderRef = useRef<string | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const [scrollBehaviour, setScrollBehaviour] = useState(
    'auto' as 'auto' | 'smooth'
  );
  const [groupedMessages, setGroupedMessages] = useState(
    [] as Array<Array<Message> | []>
  );

  useEffect(() => {
    const socket = io('http://localhost:3002', {
      withCredentials: true,
    });

    socket.on('connect', () => {
      console.log('Connected to the socket');
    });

    socket.on('message', (message) => {
      setGroupedMessages((prevMessages) => [...prevMessages, [message]]);
    });

    // Remember to disconnect socket when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  async function sendMessage() {
    try {
      const res = await fetch('http://localhost:3002/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
          text: message,
          recipients: { group: props.chatId },
        }),
        credentials: 'include',
      });
      // let data = await res.json();
      setMessage('');
      mutate('http://localhost:3002/group');
    } catch (error) {
      failToast('Failed to send message');
    }
  }

  function isSameSender(message: Message) {
    return prevSenderRef.current === message.sender;
  }

  useEffect(() => {
    const newGroupedMessages = [];
    let currentGroup: any = [];
    let currentSender: any = null;

    props.messages.forEach((message) => {
      if (currentSender !== message.sender) {
        if (currentGroup.length > 0) {
          newGroupedMessages.push(currentGroup);
        }
        currentGroup = [message];
        currentSender = message.sender;
      } else {
        currentGroup.push(message);
      }
    });

    if (currentGroup.length > 0) {
      newGroupedMessages.push(currentGroup);
    }

    setGroupedMessages(newGroupedMessages);
  }, [props.messages]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: scrollBehaviour,
        block: 'end',
        inline: 'start',
      });
      if (scrollBehaviour === 'auto') {
        setScrollBehaviour('smooth');
      }
    }
  }, [groupedMessages]);
  return (
    <div className='w-full h-svh px-5 flex flex-col justify-between'>
      <div className='flex justify-between items-center mt-5'>
        <p className='font-bold'>{props.name}</p>
        <div className='flex gap-2'>
          <AddMember id={props.chatId} />
          <Members id={props.chatId} />
        </div>
      </div>

      <ScrollArea className='flex flex-1 flex-col mt-5 max-h-full overflow-y-hidden overflow-x-hidden'>
        {groupedMessages.map((message: Array<Message>, index: any) => {
          return (
            <div
              ref={index === groupedMessages.length - 1 ? lastMessageRef : null}
              className=' [&>.justify-start:last-child>*]:rounded-bl-none [&>.justify-start:last-child>*>*]:opacity-100 [&>.justify-end:last-child>*]:rounded-br-none'
              key={index}
            >
              {message.map((message: any, index: number) => {
                return (
                  <ChatScreenMessage
                    key={index}
                    showPicture={isSameSender(message)}
                    text={message.text}
                    sender={message.sender}
                    picture={message.sender.picture}
                  />
                );
              })}
            </div>
          );
        })}
      </ScrollArea>
      <div className='py-5 gap-5 flex items-center'>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='w-full bg-gray-100 py-5 px-3 rounded-xl'
          type='text'
          placeholder='type your message here...'
        />
        <Button onClick={sendMessage}>Send Message</Button>
      </div>
    </div>
  );
}

export default ChatScreen;
