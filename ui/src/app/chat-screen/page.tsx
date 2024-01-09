'use client'
import ChatPreview from '@/components/chat/chat-preview';
import React, { useState } from 'react';

interface ChatPreviewProps {
  onClick: () => void;
  name: string;
  // ...other props
  selected: boolean;
}

export default function Page() {
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const changeActiveChat = (chatName: string) => {
    setActiveChat(chatName);
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
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              const name = e.currentTarget.getAttribute('data-name') as string;
              console.log('name: ', name);
              // changeActiveChat(name);
            }}
            data-name='Marquinhos'
            name='Marquinhos'
            lastMessage='Dae man'
            group={false}
            imgSrc='https://source.unsplash.com/vpOeXr5wmR4/600x600'
            selected={false}
          />
          <ChatPreview
            onClick={() => {}}
            name='Grupo do Ianzinho'
            lastMessage='Didi du'
            group={true}
            lastGroupMessager='Ian'
            imgSrc='https://source.unsplash.com/vpOeXr5wmR4/600x600'
            selected={true}
          />
          <ChatPreview
            onClick={() => {}}
            name='Marquinhos'
            lastMessage='Dae man'
            group={false}
            imgSrc='https://source.unsplash.com/vpOeXr5wmR4/600x600'
            selected={false}
          />
        </div>
        <div className='w-full px-5 flex flex-col justify-between'>
          <div className='flex flex-col mt-5'>
            <div className='flex justify-end mb-4'>
              <div className='mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white'>
                Welcome to group everyone !
              </div>
              <img
                src='https://source.unsplash.com/vpOeXr5wmR4/600x600'
                className='object-cover h-8 w-8 rounded-full'
                alt=''
              />
            </div>
            <div className='flex justify-start mb-4'>
              <img
                src='https://source.unsplash.com/vpOeXr5wmR4/600x600'
                className='object-cover h-8 w-8 rounded-full'
                alt=''
              />
              <div className='ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                at praesentium, aut ullam delectus odio error sit rem.
                Architecto nulla doloribus laborum illo rem enim dolor odio
                saepe, consequatur quas?
              </div>
            </div>
            <div className='flex justify-end mb-4'>
              <div>
                <div className='mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Magnam, repudiandae.
                </div>

                <div className='mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Debitis, reiciendis!
                </div>
              </div>
              <img
                src='https://source.unsplash.com/vpOeXr5wmR4/600x600'
                className='object-cover h-8 w-8 rounded-full'
                alt=''
              />
            </div>
            <div className='flex justify-start mb-4'>
              <img
                src='https://source.unsplash.com/vpOeXr5wmR4/600x600'
                className='object-cover h-8 w-8 rounded-full'
                alt=''
              />
              <div className='ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white'>
                happy holiday guys!
              </div>
            </div>
          </div>
          <div className='py-5'>
            <input
              className='w-full bg-gray-300 py-5 px-3 rounded-xl'
              type='text'
              placeholder='type your message here...'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
