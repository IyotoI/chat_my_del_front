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
        <Input
          className="bg-white px-5 mr-2 text-black shadow-[0px_3px_8px_-4px_#777777] mb-8"
          placeholder="Llave"
        />
        <Button onClick={handleLogin}>Crear sala</Button>
      </form>
    </LoginTemplate>
  );
}
