import IconItem from "../atoms/Icon";
import Button from "../atoms/Button";

export default function TopChat({
  isFieldWriting,
  onExitChat,
  onEnableNotifications,
}) {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="w-[47px] h-[47px] rounded-full bg-[#1aad5e1c] mr-2 border border-[#1AAD5E] flex justify-center items-center">
          <IconItem nameIcon="account" className="text-[#1AAD5E]" />
        </div>
        <div className={`${isFieldWriting ? "leading-[1.2]" : "leading-[2]"}`}>
          <div className="text-[1.3rem]">Amigo</div>
          {isFieldWriting && (
            <div className="text-[0.9rem] text-[#1AAD5E]">Escribiendo...</div>
          )}
          {/* <div className="text-[0.9rem] text-[#1AAD5E]">Escribiendo...</div> */}
        </div>
      </div>
      <div className="flex">
        <div className="flex justify-center items-center mr-5">
          <Button
            color="bg-[#1AAD5E]"
            className="px-[6px] h-9 flex justify-center items-center"
            onClick={onEnableNotifications}
          >
            <IconItem nameIcon="bell" size={1} />
          </Button>
        </div>

        <div className="flex justify-center items-center">
          <div className="text-[1.3rem] mr-2">Salir</div>

          <Button
            color="bg-[#1AAD5E]"
            className="px-[6px] h-9 flex justify-center items-center"
            onClick={onExitChat}
          >
            <IconItem nameIcon="exitToApp" size={1} />
          </Button>
        </div>
      </div>
    </div>
  );
}
