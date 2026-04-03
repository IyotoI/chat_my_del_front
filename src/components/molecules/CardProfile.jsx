import Button from "../atoms/Button";
import { useGlobal } from "../../context/GlobalContext";
import IconItem from "../atoms/Icon";

const CardProfile = () => {
  const { setInitialState, modalGeneral } = useGlobal();

  const closeModal = () => {
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "modalGeneral",
      payload: { isOpenModal: false, nameComponentContent: "alertCard" },
    });
  };

  return (
    <div class="flex flex-col items-center gap-8 w-xs rounded-xl">
      {/* Icono de avatar */}
      <div className="w-[150px] h-[150px] cursor-pointer  rounded-full bg-[#CFD8DF]  border border-[#CFD8DF] flex justify-center items-center overflow-hidden">
        <IconItem color="white" nameIcon="account" size={5} />
      </div>
      {/* Informacion */}
      <div>
        <h4 class="font-semibold text-3xl  text-gray-700 mb-2">
          {modalGeneral.userSelected.name}
        </h4>
        <h4 class="text-lg   text-gray-500">
          {modalGeneral.userSelected.email}
        </h4>
      </div>
      {/* Botones de accion */}
      <div className="flex flex-col justify-center gap-4">
        <Button className="w-70" color="bg-[#1AAD5E] " onClick={closeModal}>
          Cerrar
        </Button>
        <Button color="bg-[#F27474] " onClick={closeModal}>
          Eliminar contacto
        </Button>
      </div>
    </div>
  );
};

export default CardProfile;
