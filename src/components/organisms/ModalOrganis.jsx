import { useGlobal } from "../../context/GlobalContext";
import { RiseLoader } from "react-spinners";
// import { AtomSpinner } from "react-epic-spinners";

const ModalOrganism = () => {
  const { isOpen, setIsOpen } = useGlobal();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          {/* Contenedor del modal */}
          <div className="bg-transparent w-11/12 max-w-md p-6 rounded-xl relative animate-fadeIn flex flex-col justify-center items-center">
            {/* Botón de cerrar */}
            {/* <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              ✖
            </button> */}
            {/* <AtomSpinner color="red" /> */}
            <RiseLoader color="#1AAD5E" size={20} />
            <div className="text-[1.3rem] mt-10">Cargando...</div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalOrganism;
