import Button from "../atoms/Button";
import Input from "../atoms/Input";
import LoginTemplate from "../templates/LoginTemplate";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/chat");
  };

  return (
    <LoginTemplate>
      <form className="text-center">
        <Input placeholder="Llave" className="mb-4" />
        <Button color="bg-[#1AAD5E]" onClick={handleLogin}>
          Crear sala
        </Button>
      </form>
    </LoginTemplate>
  );
}
