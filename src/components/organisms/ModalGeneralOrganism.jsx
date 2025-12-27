import { RiseLoader } from "react-spinners";
import { useGlobal } from "../../context/GlobalContext";
import FormContact from "../molecules/form/FormContact";
import AlertCard from "../molecules/AlertCard";

const Loader = () => {
  return (
    <div>
      <RiseLoader color="#37d37f" size={20} />
      <div className="text-[1.3rem] mt-10 font-bold  text-white">
        Cargando...
      </div>
    </div>
  );
};

const componentsMap = {
  loader: <Loader />,
  formContact: <FormContact />,
  alertCard: <AlertCard />,
};

const ModalGeneralOrganism = () => {
  const { modalGeneral } = useGlobal();

  const Component = componentsMap[modalGeneral.nameComponentContent];

  return (
    <>
      {modalGeneral.isOpenModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
          <div
            className={`${
              !["alertCard", "loader"].includes(
                modalGeneral.nameComponentContent
              ) && "bg-white p-8 rounded-xl text-center @md:flex-row mx-4"
            } `}
          >
            {Component && Component}
          </div>
        </div>
      )}
    </>
  );
};
export default ModalGeneralOrganism;
