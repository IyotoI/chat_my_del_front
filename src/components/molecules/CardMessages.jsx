export default function CardMessages({ className, message, time }) {
  return (
    <div
      className={`${className} rounded-xl shadow-xs/25  break-all p-2 text-base/5 inline-block text-black max-w-[85%]`}
    >
      <div>{message}</div>
      <div className="text-end text-[#A2A2A2]">{time}</div>
    </div>
  );
}
