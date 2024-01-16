'use client';
import ChatPreview from '@/components/chat/preview';
import React, { useState } from 'react';
import ChatScreen from '@/components/chat/screen';

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

          <ChatPreview
            key={1}
            onClick={changeActiveChat}
            data-name='Marquinhos'
            name='Marquinhos'
            lastMessage='Dae man'
            group={false}
            imgSrc='https://source.unsplash.com/vpOeXr5wmR4/600x600'
            selected={false}
          />
          <ChatPreview
            key={2}
            onClick={changeActiveChat}
            name='Grupo do Ianzinho'
            lastMessage='Didi du'
            group={true}
            lastGroupMessager='Ian'
            imgSrc='https://source.unsplash.com/vpOeXr5wmR4/600x600'
            selected={true}
          />
          <ChatPreview
            key={3}
            onClick={changeActiveChat}
            name='Marquinhos'
            lastMessage='Dae man'
            group={false}
            imgSrc='https://source.unsplash.com/vpOeXr5wmR4/600x600'
            selected={false}
          />
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
