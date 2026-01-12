import BottomChat from "../molecules/BottomChat";
import TopChat from "../molecules/TopChat";
import CardMessages from "../molecules/CardMessages";
import { forwardRef } from "react";
import TopContact from "../molecules/TopContact";
import FormContact from "../molecules/form/FormContact";
import ItemListContact from "../molecules/ItemListContact";
import imgBackground from "../../assets/images/taken_mshk.svg";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

const MessageIsEmpty = ({ onSearchContact, setPayload, payload }) => {
  return (
    <form className="text-center mt-5">
      <img src={imgBackground} className="mx-auto w-1/2 mb-12" />
      <Input
        onChange={(e) => setPayload(e.target.value)}
        value={payload}
        placeholder="Correo electronico"
        className="mb-6"
      />
      <Button color="bg-[#1AAD5E]" onClick={onSearchContact}>
        Buscar amigo
      </Button>
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
      onViewConnectedUsers,
      onSearchContact,
      onAddContactList,
      sendRequestContact,
      setPayload,
      payload,
      userFound,
      onOpenModal,
      onExitApp,
      onActionButtonItem,
      contactsList,
      itemPayloadContact,
    },
    ref
  ) => {
    // const idSocketUser = localStorage.getItem("idSocket");

    return (
      <div>
        <TopContact
          className="mb-5"
          onViewConnectedUsers={onViewConnectedUsers}
          onOpenModal={onOpenModal}
          onExitApp={onExitApp}
        />
        <div className="h-[calc(100dvh-93px)] overflow-y-auto">
          {itemsContact.length ? (
            itemsContact.map((item, index) => (
              <>
                {JSON.stringify(item)}
                <ItemListContact
                  key={index}
                  idUser={item.user.id}
                  userName={item.userName}
                  email={item.email}
                  onActionButtonItem={onActionButtonItem}
                />
              </>
            ))
          ) : (
            <div className="w-[90%] md:w-[24%] mx-auto mt-20  flex items-center">
              <FormContact />
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default ContactOrganism;
