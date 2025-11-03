import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import imgOnlineCommunity from "../../../assets/images/online-community.svg";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/chat");
  };

  return (
    <form className="text-center">
      <img src={imgOnlineCommunity} alt="Logo" />

      <p class="text-4xl mt-8 mb-4 font-[Arial]">
        <span className="text-[#1AAD5E]">C</span>hatmyd
      </p>

      <p className="text-[#1AAD5E] bg-[#D9FCD2] p-2 text-base/5 mb-6 rounded-2xl ">
        Crea una contraseña y compartela con tus amigos para que puedan
        comunicarse
      </p>

      <Input placeholder="Llave" className="mb-8" />
      <Button color="bg-[#1AAD5E]" onClick={handleLogin}>
        Crear sala
      </Button>
    </form>
  );
};

export default FormLogin;
