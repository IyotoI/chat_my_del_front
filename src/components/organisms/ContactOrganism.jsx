import BottomChat from "../molecules/BottomChat";
import TopChat from "../molecules/TopChat";
import CardMessages from "../molecules/CardMessages";
import { forwardRef } from "react";
import TopContact from "../molecules/TopContact";

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
        {/* Header */}
        <TopContact />
      </div>
    );
  }
);

export default ContactOrganism;
