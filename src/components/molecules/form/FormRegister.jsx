import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import { Link } from "react-router-dom";
import imgOnlineCommunity from "../../../assets/images/online-community.svg";

const FormRegister = ({ handleLogin, setPayload, payload }) => {
  return (
    <form className="text-center md:w-[320px]" onSubmit={handleLogin}>
      <p className="text-3xl mt-8 mb-15 font-[Arial] text-[#1AAD5E] font-bold">
        Crear cuenta
      </p>

      <Input
        name="userName"
        placeholder="Nombre de usuario"
        className="mb-8"
        value={payload.userName}
        onChange={(e) =>
          setPayload((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        }
      />
      <Input
        name="email"
        placeholder="Correo"
        className="mb-8"
        value={payload.email}
        onChange={(e) =>
          setPayload((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        }
      />
      <Input
        name="password"
        placeholder="Contraseña"
        type="password"
        className="mb-12"
        value={payload.password}
        onChange={(e) =>
          setPayload((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        }
      />

      <Button className="mb-7" color="bg-[#1AAD5E]" type="submit">
        Registrarme
      </Button>

      <br />
      <div className="text-[#575757] font-bold">
        Ya tengo una cuenta,&nbsp;
        <Link to="/login" className="text-[#1AAD5E]">
          iniciar sesion
        </Link>
      </div>
    </form>
  );
};

export default FormRegister;
