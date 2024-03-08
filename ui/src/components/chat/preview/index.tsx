import { group } from 'console';
import React from 'react';
import { DeleteGroupButton } from './DeleteGroupButton';

interface ChatPreview {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  id: string;
  name: string;
  lastMessage: string;
  imgSrc: string;
  group: boolean;
  lastGroupMessager?: string;
  selected: boolean;
  clearActiveChat: () => void;
}

function ChatPreview(props: ChatPreview): JSX.Element {
  return (
    <div
      data-id={props.id}
      data-name={props.name}
      onClick={props.onClick}
      className={
        'flex flex-row py-4 px-2 justify-center items-center border-b-2 cursor-pointer hover:bg-slate-100' +
        (props.selected === true ? ' border-l-4 border-blue-400' : '')
      }
    >
      <div className='w-full'>
        <div className='text-lg font-semibold text-black'>{props.name}</div>
        <span className='text-gray-500'>
          {props.group
            ? props.lastGroupMessager !== ''
              ? props.lastGroupMessager + ': '
              : ''
            : null}
          {props.lastGroupMessager !== '' ? (
            props.lastMessage
          ) : (
            <i>{props.lastMessage}</i>
          )}
        </span>
      </div>
      <DeleteGroupButton
        clearActiveChat={props.clearActiveChat}
        groupID={props.id}
      />
    </div>
  );
}

export default ChatPreview;
