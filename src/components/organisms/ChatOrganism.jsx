import BottomChat from "../molecules/BottomChat";
import TopChat from "../molecules/TopChat";
import CardMessages from "../molecules/CardMessages";
import { forwardRef } from "react";

const ChatOrganism = forwardRef(
  (
    { isFieldWriting, handleChat, fieldChat, setFieldChat, messagesChat },
    ref
  ) => {
    const idSocketUser = localStorage.getItem("idSocket");

    return (
      <>
        {/* Parte superior - chat */}
        <div className="p-2 bg-white">
          <TopChat isFieldWriting={isFieldWriting} />
        </div>
        {/* Conversacion - chat */}
        <div className="flex-1 flex-col flex bg-[#F5F2EB] px-2 pt-2 overflow-y-auto ">
          {messagesChat.map((value) => {
            return (
              <div
                className={`${
                  value.idSocket2 === idSocketUser
                    ? "flex justify-end"
                    : "flex justify-start"
                } mb-3`}
              >
                <CardMessages
                  className={
                    value.idSocket2 !== idSocketUser
                      ? "bg-white"
                      : "bg-[#D9FCD2]"
                  }
                  value={value}
                />
              </div>
            );
          })}
        </div>
        {/* Parte inferior - chat */}
        <div className="p-2 bg-[#F5F2EB] ">
          <BottomChat
            handleChat={handleChat}
            fieldChat={fieldChat}
            setFieldChat={setFieldChat}
            ref={ref}
          />
        </div>
      </>
    );
  }
);

export default ChatOrganism;
