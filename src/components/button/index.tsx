import type { FC } from 'react';
import React from 'react';




interface BtnProps {
  btnName: string;
  disabled?: boolean;
  btnType?: string;
  onClick?: () => void;
  type?: string;
  color?: string;
}

const Button: FC<BtnProps> = ({
  btnName,
  btnType = 'secondary',
  onClick,
  disabled,
  type = 'button',
  width = 'w-auto',
  color,
  clickRef,
  className,
  title,
}: BtnProps) => {

  const secondaryClass = `w-full h-10   whitespace-nowrap  border border-solid  py-2 px-6 rounded bg-white text-base font-medium ${
    disabled ? 'text-gray-0 border-gray-0' : `hover:bg-[#f8faeb]`
  } ${className}`;

  const primaryClass = `w-full h-10 whitespace-nowrap  bg-blue-500 text-white
   py-2 px-6 rounded text-base font-medium ${
     disabled ? '!bg-[#E6E6E6] text-gray-1000' : ``
   } ${
    color === 'Red' && 'bg-red-800 text-white hover:bg-red-800'
  } ${className}`;

  return (
    <div className={width}>
      <button
        type={type}
        ref={clickRef && clickRef}
        disabled={disabled}
        className={btnType === 'primary' ? primaryClass : secondaryClass}
        onClick={onClick}
        title={title}>
        {btnName}
      </button>
    </div>
  );
};

export default Button;
