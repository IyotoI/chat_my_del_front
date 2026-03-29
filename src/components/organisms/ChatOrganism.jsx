import BottomChat from "../molecules/BottomChat";
import TopChat from "../molecules/TopChat";
import CardMessages from "../molecules/CardMessages";
import { forwardRef } from "react";
import walpapperMobile from "../../assets/images/walpapperMobile.jpeg";

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
      onKeyDown,
      onGoBack,
      onEnableNotifications,
      contactSelected,
    },
    ref,
  ) => {
    const idSocketUser = localStorage.getItem("idSocket");
    const idUser = localStorage.getItem("idUser");

    const getTime = (isoDate) => {
      const date = new Date(isoDate);
      return new Intl.DateTimeFormat("es-CO", {
        timeZone: "America/Bogota",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(date);
    };

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
          style={{ backgroundImage: `url(${walpapperMobile})` }}
          className="flex-1 flex-col flex  bg-cover bg-center bg-no-repeat   px-2 pt-2 overflow-y-auto "
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
                    value.user !== idUser ? "bg-white" : "bg-[#D9FCD2]"
                  }
                  message={value.message}
                  time={getTime(value.createdAt)}
                />
              </div>
            );
          })}
        </div>
        {/* Parte inferior - chat */}
        <div className="p-2 bg-[#EBE6E0]  ">
          <BottomChat
            handleChat={handleChat}
            onKeyDown={onKeyDown}
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
