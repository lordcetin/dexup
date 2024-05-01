import React from "react";


interface InputProps{
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
}

const InputSecond: React.FC<InputProps> = ({id,onChange,value,label,type}) => {
  return (
  <div className="relative">
    <input
    type={type}
    onChange={onChange}
    value={value}
    id={id}
    autoComplete='off'
    className={`px-5 pt-6 pb-1 w-80 max-md:w-80 text-md text-white bg-transparent rounded-lg focus:outline-none focus:border-white peer appearance-none outline-none border border-white/20 hover:border-white transition-all `}
    placeholder=" "
    required
    />
    <label
    htmlFor={id}
    className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 select-none pointer-events-none"
    >
    {label}
    </label>
  </div>
  );
};

export default InputSecond;
