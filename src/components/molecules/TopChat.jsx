import IconItem from "../atoms/Icon";
import Button from "../atoms/Button";
import { Link } from "react-router-dom";

export default function TopChat({
  isFieldWriting,
  onGoBack,
  onExitChat,
  onEnableNotifications,
  contactSelected,
}) {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="mt-1 mr-4 ml-2">
          {/* <Button
            color="bg-[#ffffff]"
            className="px-[6px] h-9 flex justify-center items-center"
            onClick={onGoBack}
          > */}
          <Link to="/contact">
            <IconItem color="#1AAD5E" nameIcon="arrowLeft" size={1} />
          </Link>
          {/* </Button> */}
        </div>
        <div className="w-[35px] h-[35px] rounded-full bg-[#1aad5e1c] mr-2 border border-[#1AAD5E] flex justify-center items-center">
          <IconItem nameIcon="account" className="text-[#1AAD5E]" size={0.9} />
        </div>
        <div
          className={`${isFieldWriting ? "leading-[1.2]" : "leading-[1.5]"}`}
        >
          <div className="text-[1.3rem]">{contactSelected}</div>
          {isFieldWriting && (
            <div className="text-[0.9rem] text-[#1AAD5E]">Escribiendo...</div>
          )}
          {/* <div className="text-[0.9rem] text-[#1AAD5E]">Escribiendo...</div> */}
        </div>
      </div>
      {/* <div className="flex">
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
      </div> */}
    </div>
  );
}
