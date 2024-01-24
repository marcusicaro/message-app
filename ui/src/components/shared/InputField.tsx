import React, { ChangeEvent } from 'react';

interface InputFieldProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  label: string;
  required?: boolean;
  placeholder: string;
  value: string;
}

const InputField: React.FC<InputFieldProps> = ({
  onChange,
  type,
  label,
  required = false,
  placeholder,
  value,
}) => {
  return (
    <div>
      <label
        htmlFor={label}
        className='block mb-2 text-sm font-medium text-gray-900 '
      >
        {label}
      </label>
      <input
        type={type}
        name={label}
        id={label}
        value={value}
        onChange={onChange}
        className='bg-gray-50 border focus:border-cyan-600 outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default InputField;
