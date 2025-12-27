import Button from "../atoms/Button";
import IconItem from "../atoms/Icon";
import { useGlobal } from "../../context/GlobalContext";

const AlertCard = ({ titulo, description }) => {
  const { setInitialState } = useGlobal();

  const closeModal = () => {
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "modalGeneral",
      payload: { isOpenModal: false, nameComponentContent: "alertCard" },
    });
  };

  return (
    <div class="flex flex-col items-center">
      <IconItem color={"#1AAD5E"} size={3} className={"mb-8"} />
      <h4 class="font-semibold text-2xl flex items-center gap-2 text-gray-700">
        Titulo
      </h4>
      <h4 class="font-semibold text-lg flex items-center gap-2 text-gray-500">
        Desripcion
      </h4>
      <Button color="bg-[#1AAD5E] mt-8" onClick={closeModal}>
        Entiendo
      </Button>
    </div>
  );
};

export default AlertCard;
