import IconItem from "../atoms/Icon";
import Button from "../atoms/Button";

export default function TopContact({
  className,
  isFieldWriting,
  onExitChat,
  onEnableNotifications,
  onViewConnectedUsers,
  onOpenModal,
}) {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <p className="text-3xl font-[Arial]">
        <span className="text-[#1AAD5E]">C</span>hatmyd
      </p>
      <div className="flex ">
        <Button
          color="bg-[#1AAD5E]"
          className="px-[6px] h-9 flex justify-center items-center mr-3"
          onClick={onOpenModal}
        >
          <IconItem nameIcon="accountPlus" size={1} />
        </Button>
        <Button
          color="bg-[#1AAD5E]"
          className="px-[6px] h-9 flex justify-center items-center mr-3"
          onClick={onViewConnectedUsers}
        >
          <IconItem nameIcon="accountGroup" size={1} />
        </Button>
        <Button
          color="bg-[#1AAD5E]"
          className="px-[6px] h-9 flex justify-center items-center mr-3"
          onClick={onEnableNotifications}
        >
          <IconItem nameIcon="bell" size={1} />
        </Button>
        <Button
          color="bg-[#1AAD5E]"
          className="px-[6px] h-9 flex justify-center items-center"
          onClick={onExitChat}
        >
          <IconItem nameIcon="exitToApp" size={1} />
        </Button>
      </div>
    </div>
  );
}
