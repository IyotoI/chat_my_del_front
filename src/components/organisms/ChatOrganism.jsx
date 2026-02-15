import BottomChat from "../molecules/BottomChat";
import TopChat from "../molecules/TopChat";
import CardMessages from "../molecules/CardMessages";
import { forwardRef } from "react";

const ChatOrganism = forwardRef(
  (
    {
      isFieldWriting,
      handleChat,
      fieldChat,
      setFieldChat,
      messagesChat,
      ref2,
      conversation,
      onExitChat,
      onGoBack,
      onEnableNotifications,
      contactSelected,
    },
    ref,
  ) => {
    const idSocketUser = localStorage.getItem("idSocket");
    const idUser = localStorage.getItem("idUser");

    return (
      <>
        {/* Parte superior - chat */}
        <div className="p-2 bg-white ">
          <TopChat
            isFieldWriting={isFieldWriting}
            contactSelected={contactSelected}
            onExitChat={onExitChat}
            onGoBack={onGoBack}
            onEnableNotifications={onEnableNotifications}
          />
        </div>
        {/* Conversacion - chat */}
        <div
          ref={ref2}
          className="flex-1 flex-col flex  bg-[#F5F2EB] px-2 pt-2 overflow-y-auto "
        >
          {conversation.map((value, index) => {
            return (
              
              <div
                key={index}
                className={`${
                  value.user === idUser
                    ? "flex justify-end"
                    : "flex justify-start"
                } mb-3`}
              >
              {/* {JSON.stringify(value.user)} */}
                <CardMessages
                  className={
                    value.user !== idUser
                      ? "bg-white"
                      : "bg-[#D9FCD2]"
                  }
                  message={value.message}
                />
              </div>
            );
          })}
        </div>
        {/* Parte inferior - chat */}
        <div className="p-2 bg-[#F5F2EB]  ">
          <BottomChat
            handleChat={handleChat}
            fieldChat={fieldChat}
            setFieldChat={setFieldChat}
            ref={ref}
          />
        </div>
      </>
    );
  },
);

export default ChatOrganism;
