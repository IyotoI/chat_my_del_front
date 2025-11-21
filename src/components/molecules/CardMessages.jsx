export default function CardMessages({ className, value }) {
  return (
    <div
      className={`${className} rounded-md break-all p-2 text-base/5 inline-block text-black max-w-[85%]`}
    >
      <div>{value.message}</div>
      <div className="text-end text-[#A2A2A2]">9:27 p.m.</div>
    </div>
  );
}
