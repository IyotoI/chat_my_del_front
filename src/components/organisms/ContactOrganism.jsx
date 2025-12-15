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
    },
    ref
  ) => {
    const idSocketUser = localStorage.getItem("idSocket");

    return (
      <div>
        <TopContact className="mb-5" />
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
          <ItemListContact key={index} />
        ))}
      </div>
    );
  }
);

export default ContactOrganism;
