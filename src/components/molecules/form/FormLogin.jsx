import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import imgOnlineCommunity from "../../../assets/images/online-community.svg";
import { Link } from "react-router-dom";

const FormLogin = ({ payload, setPayload, handleLogin }) => {
  return (
    <form className="text-center md:w-[320px]" onSubmit={handleLogin}>
      {/* <img
        src={imgOnlineCommunity}
        alt="Logo"
        className="mx-auto w-full sm:max-w-md md:max-w-lg lg:max-w-2xl"
      />

      <p className="text-4xl mt-8 mb-4 font-[Arial]">
        <span className="text-[#1AAD5E]">C</span>hatmyd
      </p>

      <p className="text-[#1AAD5E] bg-[#D9FCD2] p-2 text-base/5 mb-6 rounded-2xl ">
        Crea una contraseña y compartela con tus amigos para que puedan
        comunicarse
      </p> */}
      <p className="text-3xl mt-8 mb-15 font-[Arial] text-[#1AAD5E] font-bold">
        Iniciar sesion
      </p>

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
        Iniciar sesion
      </Button>

      <br />
      <div className="text-[#575757] font-bold">
        No tengo una cuenta,&nbsp;
        <Link to="/register" className="text-[#1AAD5E]">
          registrarme
        </Link>
      </div>
    </form>
  );
};

export default FormLogin;
