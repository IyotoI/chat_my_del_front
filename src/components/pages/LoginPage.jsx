import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormLogin from "../molecules/form/FormLogin";
import LoginTemplate from "../templates/LoginTemplate";
import { useGlobal } from "../../context/GlobalContext";
import authController from "../../controllers/authController";

export default function LoginPage() {
  const { socket, setInitialState } = useGlobal();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!socket) return;

    socket.on("chat:idSocket", (idSocket) => {
      const validateIdSoket = localStorage.getItem("idSocket");
      if (!validateIdSoket) {
        localStorage.setItem("idSocket", idSocket);
      }
    });

    return () => {
      socket.off("chat:idSocket");
    };
  }, [socket]);

  const validate = () => {
    const newErrors = {};

    if (!payload.email) {
      newErrors.email = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      newErrors.email = "Correo no válido";
    }

    if (!payload.password) {
      newErrors.password = "La contraseña es obligatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate()) return;
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "loading",
      payload: true,
    });
    const data = await authController.post.login(payload);

    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "loading",
      payload: false,
    });

    if (data && !data.id) return alert("Contraseña o correo incorrecto");
    // setInitialState({
    //   type: "SET_INITIAL_STATE",
    //   key: "dataUser",
    //   payload: data,
    // });
    localStorage.setItem("idUser", data.id);
    navigate("/contact");
    alert("Logeado");
  };

  return (
    <LoginTemplate>
      <FormLogin
        handleLogin={handleLogin}
        payload={payload}
        setPayload={setPayload}
        errors={errors}
      />
    </LoginTemplate>
  );
}
