import IconItem from "../atoms/Icon";

export default function TopChat({ isFieldWriting }) {
  return (
    <div className="flex">
      <div className="w-[47px] h-[47px] rounded-full bg-[#1AAD5E] mr-2 flex justify-center items-center">
        <IconItem nameIcon="account" className="text-white" />
      </div>
      <div className="-mt-1">
        <div className="text-[1.3rem]">Amigo</div>
        {isFieldWriting && (
          <div className="text-[0.9rem] text-[#1AAD5E]">Escribiendo...</div>
        )}
      </div>
    </div>
  );
}
