import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import { Link } from "react-router-dom";

const FormLogin = ({ payload, setPayload, handleLogin, errors }) => {
  return (
    <form className="text-center md:w-[320px]" onSubmit={handleLogin}>
      <p className="text-3xl mt-8 mb-15 font-[Arial] text-[#1AAD5E] font-bold">
        Iniciar sesion
      </p>

      <div className="mb-3">
        <Input
          name="email"
          placeholder="Correo"
          value={payload.email}
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />
        <p
          className={`text-red-500 text-start ${!errors.email && "invisible"}`}
        >
          {errors.email ? errors.email : "error"}
        </p>
      </div>
      <div className="mb-6">
        <Input
          name="password"
          placeholder="Contraseña"
          type="password"
          value={payload.password}
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />
        <p
          className={`text-red-500 text-start ${
            !errors.password && "invisible"
          }`}
        >
          {errors.password ? errors.password : "error"}
        </p>
      </div>

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
