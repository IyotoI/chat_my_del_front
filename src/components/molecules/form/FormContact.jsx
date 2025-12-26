import Button from "../../atoms/Button";
import imgOnlineCommunity from "../../../assets/images/online-community.svg";
import { useState, useEffect } from "react";
import { useGlobal } from "../../../context/GlobalContext";
import authController from "../../../controllers/authController";
import Input from "../../atoms/Input";
import imgBackground from "../../../assets/images/taken_mshk.svg";
import { useLocation } from "react-router-dom";
import ItemListContact from "../ItemListContact";
import contactController from "../../../controllers/contactController";

const FormContact = ({ onHandleActionsButtons }) => {
  const [payload, setPayload] = useState("");
  const { pathname } = useLocation();
  const { setInitialState, dataUser, listItemsContacts } = useGlobal();
  const [userFound, setUserFound] = useState("");
  const itemPayloadContact = {
    key: "formContact",
  };

  const addContactList = async () => {
    debugger;
    const idUser = localStorage.getItem("idUser");
    const data = await contactController.post.one({
      ...userFound,
      userIdLogeado: idUser,
    });
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "listItemsContacts",
      payload: [...listItemsContacts, data],
    });
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "modalGeneral",
      payload: { isOpenModal: false, nameComponentContent: "formContact" },
    });
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "modalGeneral",
      payload: { isOpenModal: true, nameComponentContent: "alertCard" },
    });
  };

  const searchContact = async () => {
    // setInitialState({
    //   type: "SET_INITIAL_STATE",
    //   key: "loading",
    //   payload: true,
    // });
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "modalGeneral",
      payload: { isOpenModal: true, nameComponentContent: "loader" },
    });
    const data = await authController.get.userIdConnected(payload);
    setUserFound(data);
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "modalGeneral",
      payload: { isOpenModal: false, nameComponentContent: "loader" },
    });
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "modalGeneral",
      payload: { isOpenModal: true, nameComponentContent: "alertCard" },
    });
    // setInitialState({
    //   type: "SET_INITIAL_STATE",
    //   key: "loading",
    //   payload: false,
    // });
  };

  return (
    <div className="text-center md:w-[320px]">
      <div className="flex flex-col">
        <form className="text-center mt-5">
          <img src={imgBackground} className="mx-auto w-1/2 mb-12" />
          <Input
            onChange={(e) => setPayload(e.target.value)}
            value={payload}
            placeholder="Correo electronico"
            className="mb-6"
          />
          <Button color="bg-[#1AAD5E]" onClick={searchContact}>
            Buscar amigo
          </Button>
        </form>
        {userFound && (
          <>
            <div className="border border-gray-400 mt-9"></div>
            <ItemListContact
              itemPayloadContact={itemPayloadContact && itemPayloadContact.key}
              onAddContactList={addContactList}
              email={userFound && userFound.email}
              userName={userFound && userFound.userName}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FormContact;
