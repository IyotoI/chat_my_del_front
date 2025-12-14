import Button from "../../atoms/Button";
import imgOnlineCommunity from "../../../assets/images/online-community.svg";

const FormWelcome = ({ onHandleActionsButtons }) => {
  return (
    <form className="text-center md:w-[320px]">
      <img
        src={imgOnlineCommunity}
        alt="Logo"
        className="mx-auto w-full sm:max-w-md md:max-w-lg lg:max-w-2xl mb-12"
      />

      <p className="text-4xl  mb-4 font-[Arial]">
        <span className="text-[#1AAD5E]">C</span>hatmyd
      </p>
      <p className="text-[#1AAD5E] bg-[#D9FCD2] p-2 text-base/5 mb-12 rounded-2xl ">
        Mensajes instantáneos, conversaciones seguras y una experiencia simple.
      </p>

      <div className="flex flex-col">
        <Button
          className="mb-4"
          color="bg-[#1AAD5E]"
          onClick={() => onHandleActionsButtons("login")}
        >
          Iniciar sesion
        </Button>
        <Button
          color="bg-[#1AAD5E]"
          onClick={() => onHandleActionsButtons("register")}
        >
          Registrarme
        </Button>
      </div>
    </form>
  );
};

export default FormWelcome;
