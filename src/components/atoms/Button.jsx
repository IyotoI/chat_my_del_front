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
      className={`${className} ${color} text-white font-semibold py-3 px-8 rounded-full transition cursor-pointer`}
    >
      {children}
    </button>
  );
}
