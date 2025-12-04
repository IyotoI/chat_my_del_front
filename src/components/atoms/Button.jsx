export default function Button({
  color = "bg-indigo-600",
  children,
  onClick,
  type = "button",
  className,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} ${color} text-white font-semibold py-3 px-8 rounded-full transition cursor-pointer hover:bg-white   shadow-[0px_3px_8px_-4px_#777777] active:text-white hover:text-[#1AAD5E] active:bg-[#1AAD5E] active:shadow-none`}
    >
      {children}
    </button>
  );
}
