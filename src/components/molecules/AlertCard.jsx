import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import IconItem from "../atoms/Icon";
import { useGlobal } from "../../context/GlobalContext";

const AlertCard = ({ titulo, description, type }) => {
  const { setInitialState, modalGeneral } = useGlobal();
  const [dataAlert, setDataAlert] = useState({});

  useEffect(() => {
    colorAlert(modalGeneral.payload ? modalGeneral.payload.type : "success");
  }, []);

  const closeModal = () => {
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "modalGeneral",
      payload: { isOpenModal: false, nameComponentContent: "alertCard" },
    });
  };

  const colorAlert = (type) => {
    const colors = [
      { name: "error", color: "#F27474", icon: "closeCircleOutline" },
      { name: "success", color: "#1AAD5E", icon: "checkCircleOutline" },
    ];
    const newValue = colors.find((item) => item.name === type);
    setDataAlert(newValue);
  };

  return (
    <div class="flex flex-col items-center bg-white mx-2 py-8 w-xs rounded-xl">
      <IconItem
        color={dataAlert.color}
        size={4}
        className={"mb-8"}
        nameIcon={dataAlert.icon}
      />
      <h4 class="font-semibold text-3xl flex items-center  text-gray-700 mb-2">
        {modalGeneral.payload && modalGeneral.payload.title}
      </h4>
      <h4 class="text-lg flex items-center  text-gray-500">
        {modalGeneral.payload && modalGeneral.payload.description}
      </h4>
      <Button color="bg-[#1AAD5E] mt-8" onClick={closeModal}>
        Ok
      </Button>
    </div>
  );
};

export default AlertCard;
