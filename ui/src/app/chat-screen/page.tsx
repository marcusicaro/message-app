'use client';
import ChatPreview from '@/components/chat/preview';
import CustomizeProfile from '@/components/chat/preview/customizeProfile';
import CreateGroup from '@/components/chat/preview/createGroup';
import ChatScreen from '@/components/chat/screen';
import { Message } from '@/components/chat/screen/message';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

interface ChatPreviewProps {
  onClick: () => void;
  name: string;
  selected: boolean;
}

export default function Page() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [activeChatId, setActiveChatId] = useState<string>('');
  const [activeChatName, setActiveChatName] = useState<string>('');

  const changeActiveChat = async (e: React.MouseEvent<HTMLDivElement>) => {
    const name = e.currentTarget.getAttribute('data-name') as string;
    const id = e.currentTarget.getAttribute('data-id') as string;

    try {
      let res = await fetch(`http://localhost:3002/message/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application',
        },
        credentials: 'include',
      });

      let data = await res.json();
      setActiveChatName(name);
      setActiveChatId(id);
      setChatMessages(data.messages);
      setActiveChat(name);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  function generateChatPreviews(data: any) {
    return data.map((group: any, index: number) => {
      return (
        <ChatPreview
          id={group._id}
          key={index}
          onClick={changeActiveChat}
          name={group.title}
          lastMessage={
            group.lastMessage !== null
              ? group.lastMessage.text
              : 'Type the first message!'
          }
          imgSrc={group.imgSrc}
          group={true}
          lastGroupMessager={
            group.lastMessage !== null ? group.lastMessage.sender.username : ''
          }
          selected={activeChat === group.name}
        />
      );
    });
  }

  const fetcher = async (url: string) => {
    let res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application',
      },
      credentials: 'include',
    });

    let data = await res.json();

    return data;
  };

  const { data, error, isLoading } = useSWR(
    'http://localhost:3002/group',
    fetcher
  );

  useEffect(() => {
    if (data && data.length > 0) {
      changeActiveChat({
        currentTarget: {
          getAttribute: (attr: string) => {
            if (attr === 'data-name') return data[0].title;
            if (attr === 'data-id') return data[0]._id;
          },
        },
      } as React.MouseEvent<HTMLDivElement>);
    }
  }, [data]);

  return (
    <div className='w-full'>
      <div className='flex h-full flex-row justify-between bg-white'>
        <div className='flex flex-col w-2/5 border-r-2 overflow-y-auto'>
          <div className='border-b-2 py-4 px-2 flex gap-2'>
            <input
              type='text'
              placeholder='Search chats...'
              className='py-2 px-2 border-2 border-gray-200 rounded-2xl w-full'
            />
            <div className='flex items-center justify-center'>
              <CreateGroup />
              <CustomizeProfile />
            </div>
          </div>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error</div>
          ) : (
            generateChatPreviews(data)
          )}
        </div>
        <ChatScreen
          name={activeChatName}
          onClick={() => null}
          messages={chatMessages}
          chatId={activeChatId}
        />
      </div>
    </div>
  );
}
