import BottomChat from "../molecules/BottomChat";
import TopChat from "../molecules/TopChat";
import CardMessages from "../molecules/CardMessages";
import { forwardRef } from "react";
import TopContact from "../molecules/TopContact";
import ItemListContact from "../molecules/ItemListContact";

const ContactOrganism = forwardRef(
  (
    {
      isFieldWriting,
      handleChat,
      fieldChat,
      setFieldChat,
      messagesChat,
      ref2,
      onExitChat,
      onEnableNotifications,
      userConnected,
    },
    ref
  ) => {
    const idSocketUser = localStorage.getItem("idSocket");

    return (
      <div>
        <TopContact className="mb-5" />
        <div className="h-[calc(100dvh-93px)] overflow-y-auto">
          {userConnected.map((item, index) => (
            <ItemListContact key={index} userName={item.userName} />
          ))}
        </div>
      </div>
    );
  }
);

export default ContactOrganism;
