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
      <img src={imgOnlineCommunity} alt="Logo" className="mb-15" />
      <Input placeholder="Llave" className="mb-8" />
      <Button color="bg-[#1AAD5E]" onClick={handleLogin}>
        Crear sala
      </Button>
    </form>
  );
};

export default FormLogin;
