import React from "react";


interface InputProps{
  id: string;
  onChange: any;
  onKeyDown: any;
  value: string;
  label: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({id,onChange,value,label,type,onKeyDown}) => {
  return (
  <div className="relative w-full">
    <input
    type={type}
    onChange={onChange}
    value={value}
    id={id}
    autoComplete='off'
    onKeyDown={onKeyDown}
    className={`px-6 pt-6 pb-1 w-full text-md text-white bg-transparent rounded-lg focus:outline-none focus:ring-0 peer appearance-none outline-none border border-transparent`}
    placeholder=" "
    required
    />
    <label
    htmlFor={id}
    className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
    >
    {label}
    </label>
  </div>
  );
};

export default Input;
