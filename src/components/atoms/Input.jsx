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
      className={`${className} p-3 rounded-full bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none w-full`}
    />
  );
}
