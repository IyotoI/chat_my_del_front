import BottomChat from "../molecules/BottomChat";
import TopChat from "../molecules/TopChat";
import CardMessages from "../molecules/CardMessages";
import { forwardRef } from "react";
import TopContact from "../molecules/TopContact";
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
          {itemsContact ? (
            itemsContact.map((item, index) => (
              <ItemListContact
                key={index}
                userName={item.userName}
                email={item.email}
              />
            ))
          ) : (
            <MessageIsEmpty
              onSearchContact={onSearchContact}
              setPayload={setPayload}
              payload={payload}
            />
          )}
          {userFound && (
            <>
              <div className="border border-gray-400 mt-9"></div>
              <ItemListContact
                itemPayloadContact={
                  itemPayloadContact && itemPayloadContact.key
                }
                sendRequestContact={sendRequestContact}
                onAddContactList={onAddContactList}
                email={userFound && userFound.email}
                userName={userFound && userFound.userName}
              />
            </>
          )}
        </div>
      </div>
    );
  }
);

export default ContactOrganism;
