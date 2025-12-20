import { useGlobal } from "../../context/GlobalContext";
import { RiseLoader } from "react-spinners";
import FormContact from "../molecules/form/FormContact";
// import { AtomSpinner } from "react-epic-spinners";

const ModalContactOrganism = () => {
  const { setInitialState, dataUser, isModal = false } = useGlobal();

  const closeModal = () => {
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "isModal",
      payload: false,
    });
  };

  return (
    <>
      {isModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          {/* Contenedor del modal */}
          <div className="bg-white w-11/12 max-w-md p-6 rounded-xl relative animate-fadeIn flex flex-col justify-center items-center">
            <div className=" flex mb-5">
              <h1>Agregar contacto</h1>
              {/* Botón de cerrar */}
              <button
                onClick={closeModal}
                className="absolute right-3 text-gray-600 cursor-pointer hover:text-gray-800"
              >
                ✖
              </button>
            </div>
            <div>
              <FormContact />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalContactOrganism;
