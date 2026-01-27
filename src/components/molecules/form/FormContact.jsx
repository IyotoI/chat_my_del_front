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
  const [payload, setPayload] = useState({ email: "" });
  const { pathname } = useLocation();
  const { setInitialState, dataUser, listItemsContacts } = useGlobal();
  const [userFound, setUserFound] = useState("");
  const [errors, setErrors] = useState({});

  const itemPayloadContact = {
    key: "formContact",
  };

  const addContactList = async () => {
    const idUser = localStorage.getItem("idUser");
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "modalGeneral",
      payload: { isOpenModal: true, nameComponentContent: "loader" },
    });
    const data = await contactController.post.one({
      contact: userFound._id,
      user: idUser,
    });
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "listItemsContacts",
      payload: [...listItemsContacts, data],
    });
    // setInitialState({
    //   type: "SET_INITIAL_STATE",
    //   key: "modalGeneral",
    //   payload: { isOpenModal: false, nameComponentContent: "formContact" },
    // });
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "modalGeneral",
      payload: { isOpenModal: false, nameComponentContent: "loader" },
    });
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "modalGeneral",
      payload: {
        isOpenModal: true,
        nameComponentContent: "alertCard",
        payload: {
          title: "Muy bien!",
          description: "Amigo agregado",
          type: "success",
        },
      },
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!payload.email) {
      newErrors.email = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      newErrors.email = "Correo no válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const searchContact = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // setInitialState({
    //   type: "SET_INITIAL_STATE",
    //   key: "modalGeneral",
    //   payload: { isOpenModal: true, nameComponentContent: "loader" },
    // });

    const data = await authController.get.userIdConnected(payload.email);

    if (data.data && data.data._id) {
      setUserFound(data.data);
      // setInitialState({
      //   type: "SET_INITIAL_STATE",
      //   key: "modalGeneral",
      //   payload: {
      //     isOpenModal: true,
      //     nameComponentContent: "alertCard",
      //     payload: {
      //       title: "Perfecto!",
      //       description: "Tu amigo a sido encontrado",
      //       type: "success",
      //     },
      //   },
      // });
    } else {
      alert("Tu amigo no esta registrado aun");
      setUserFound("");

      // setInitialState({
      //   type: "SET_INITIAL_STATE",
      //   key: "modalGeneral",
      //   payload: {
      //     isOpenModal: true,
      //     nameComponentContent: "alertCard",
      //     payload: {
      //       title: "Lo siento",
      //       description: "Tu amigo no esta registrado aun",
      //       type: "error",
      //     },
      //   },
      // });
    }
  };

  return (
    <div className="text-center md:w-[320px]">
      <div className="flex flex-col">
        <form className="text-center mt-5" onSubmit={searchContact}>
          <img src={imgBackground} className="mx-auto w-1/2 mb-12" />
          <div className="mb-6">
            <Input
              name="email"
              value={payload.email}
              placeholder="Correo electronico"
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <p
              className={`text-red-500 text-start ${
                !errors.email && "invisible"
              }`}
            >
              {errors.email ? errors.email : "error"}
            </p>
          </div>
          <Button color="bg-[#1AAD5E]" type="submit">
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
