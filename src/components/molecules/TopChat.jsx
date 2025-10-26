import IconItem from "../atoms/Icon";

export default function TopChat() {
  return (
    <div className="flex">
      <div className="w-[50px] h-[50px] rounded-full bg-[#1AAD5E] mr-2 flex justify-center items-center">
        <IconItem nameIcon="account" className="text-white" />
      </div>
      <div className="-mt-1">
        <div className="text-2xl">Amigo</div>
        <div>Escribiendo...</div>
      </div>
    </div>
  );
}
