import BottomChat from "../molecules/BottomChat";
import TopChat from "../molecules/TopChat";
import CardMessages from "../molecules/CardMessages";
import { forwardRef } from "react";
import TopContact from "../molecules/TopContact";
import ItemListContact from "../molecules/ItemListContact";
import imgBackground from "../../assets/images/taken_mshk.svg";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

const MessageIsEmpty = () => {
  return (
    <form className="text-center mt-16">
      <img src={imgBackground} className="mx-auto w-1/2 mb-12" />
      <Input placeholder="Correo electronico" className="mb-6" />
      <Button color="bg-[#1AAD5E]">Buscar amigo</Button>
    </form>
  );
};

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
      itemsContact,
    },
    ref
  ) => {
    const idSocketUser = localStorage.getItem("idSocket");

    return (
      <div>
        <TopContact className="mb-5" />
        <div className="h-[calc(100dvh-93px)] overflow-y-auto">
          {itemsContact ? (
            itemsContact.map((item, index) => (
              <ItemListContact key={index} userName={item.userName} />
            ))
          ) : (
            <MessageIsEmpty />
          )}
        </div>
      </div>
    );
  }
);

export default ContactOrganism;
