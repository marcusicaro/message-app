'use client';
import ChatPreview from '@/components/chat/preview';
import ChatScreen from '@/components/chat/screen';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

interface ChatPreviewProps {
  onClick: () => void;
  name: string;
  // ...other props
  selected: boolean;
}

export default function Page() {
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const changeActiveChat = (e: React.MouseEvent<HTMLDivElement>) => {
    const name = e.currentTarget.getAttribute('data-name') as string;

    setActiveChat(name);
  };

  function generateChatPreviews(data: any) {
    return data.map((group: any, index: number) => {
      console.log(group);
      return (
        <ChatPreview
          key={index}
          onClick={changeActiveChat}
          name={group.title}
          lastMessage={group.lastMessage !== null ? group.lastMessage.text: ''}
          imgSrc={group.imgSrc}
          group={true}
          lastGroupMessager={group.lastMessage !== null ? group.lastMessage.sender.username : ''}
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

  // useEffect(() => {
  //   // Set the loading state to true when starting to fetch the data
  //   setIsGroupLoading(true);
  //   if (!isLoading && !error && data) {
  //     getLastMessageFromEachGroup(data).then((lastMessages) => {
  //       // Set the loading state to false once the data is fetched
  //       setIsGroupLoading(false);
  //       setGroupData(lastMessages);
  //     });
  //   }
  // }, [isLoading, error, data]);

  return (
    <div>
      <div className='flex h-full flex-row justify-between bg-white'>
        <div className='flex flex-col w-2/5 border-r-2 overflow-y-auto'>
          <div className='border-b-2 py-4 px-2'>
            <input
              type='text'
              placeholder='search chatting'
              className='py-2 px-2 border-2 border-gray-200 rounded-2xl w-full'
            />
          </div>
          {isLoading ? <div>Loading...</div> : error ? <div>Error</div> : generateChatPreviews(data)}
        </div>
        <ChatScreen
          onClick={() => null}
          messages={[
            {
              text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat \n at praesentium, aut ullam delectus odio error sit rem. \nArchitecto nulla doloribus laborum illo rem enim dolor odio \n saepe, consequatur quas?',
              picture: 'https://source.unsplash.com/vpOeXr5wmR4/600x600',
              sender: 'NotMarcus',
            },
            {
              text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat \n at praesentium, aut ullam delectus odio error sit rem. \nArchitecto nulla doloribus laborum illo rem enim dolor odio \n saepe, consequatur quas?',
              picture: 'https://source.unsplash.com/vpOeXr5wmR4/600x600',
              sender: 'NotMarcus',
            },
            {
              text: 'oiiii',
              picture:
                'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              sender: 'Marcus',
            },
            {
              text: 'oiiii',
              picture:
                'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              sender: 'Marcus',
            },
            {
              text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat \n at praesentium, aut ullam delectus odio error sit rem. \nArchitecto nulla doloribus laborum illo rem enim dolor odio \n saepe, consequatur quas?',
              picture: 'https://source.unsplash.com/vpOeXr5wmR4/600x600',
              sender: 'NotMarcus',
            },
            {
              text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat \n at praesentium, aut ullam delectus odio error sit rem. \nArchitecto nulla doloribus laborum illo rem enim dolor odio \n saepe, consequatur quas?',
              picture: 'https://source.unsplash.com/vpOeXr5wmR4/600x600',
              sender: 'NotMarcus',
            },
          ]}
        />
      </div>
    </div>
  );
}
