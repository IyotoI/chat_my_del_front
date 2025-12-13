import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      type = "text",
      value,
      onChange,
      placeholder = "Label",
      required = false,
      className,
      name = "",
    },
    ref
  ) => {
    return (
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`${className} bg-white focus:ring-1 py-3 px-6 rounded-full  border border-gray-400 focus:ring-[#1AAD5E] outline-none w-full`}
        ref={ref}
      />
    );
  }
);

export default Input;
