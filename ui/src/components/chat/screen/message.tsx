import { useUser } from '@/components/context/user';

export default function ChatScreenMessage(props: any): JSX.Element {
  const { state, dispatch } = useUser();
  return (
    <div
      data-sender={props.sender}
      className={`flex ${
        state.username !== props.sender.username
          ? 'justify-start'
          : 'justify-end'
      } mb-4`}
    >
      {state.username !== props.sender.username && props.showPicture && (
        <div className='flex-none flex items-end'>
          <img
            src={props.picture}
            className='object-cover h-8 w-8 rounded-full opacity-0'
            alt=''
          />
        </div>
      )}
      {state.username === props.sender.username && (
        <div
          className={`ml-2 py-3 px-4 ${
            state.username === props.sender.username
              ? 'bg-gray-400'
              : 'bg-blue-400'
          } rounded-br-3xl rounded-tr-3xl rounded-tl-xl rounded-bl-xl text-white`}
        >
          {props.text}
        </div>
      )}
      {state.username !== props.sender.username && (
        <div
          className={`ml-2 py-3 px-4 ${
            state.username === props.sender.username
              ? 'bg-gray-400'
              : 'bg-blue-400'
          } rounded-br-3xl rounded-tr-3xl rounded-tl-xl rounded-bl-xl  text-white`}
        >
          {props.text}
        </div>
      )}
    </div>
  );
}
