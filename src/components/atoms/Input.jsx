export default function Input({
  type = "text",
  value,
  onChange,
  placeholder = "Label",
  required = false,
  className,
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`${className} bg-white focus:ring-1 py-3 px-6 rounded-full  border border-gray-400 focus:ring-[#1AAD5E] outline-none w-full`}
    />
  );
}
