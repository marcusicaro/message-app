import React from 'react';

interface ButtonProps {
  onClick: () => void;
  text: string;
}

function Button(props: ButtonProps): JSX.Element {
  return (
    <button
      onClick={props.onClick}
      type='submit'
      className='w-full text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all hover:bg-blue-500 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
    >
      {props.text}
    </button>
  );
}

export default Button;
