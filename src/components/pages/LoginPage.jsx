import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormLogin from "../molecules/form/FormLogin";
import LoginTemplate from "../templates/LoginTemplate";
import { useGlobal } from "../../context/GlobalContext";
import authController from "../../controllers/authController";
import AlertCard from "../molecules/AlertCard";

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
      key: "modalGeneral",
      payload: { isOpenModal: true, nameComponentContent: "loader" },
    });
    const data = await authController.post.login(payload);

    if (data && !data.id) {
      setInitialState({
        type: "SET_INITIAL_STATE",
        key: "modalGeneral",
        payload: { isOpenModal: false, nameComponentContent: "loader" },
      });
      setInitialState({
        type: "SET_INITIAL_STATE",
        key: "modalGeneral",
        payload: {
          isOpenModal: true,
          nameComponentContent: "alertCard",
          payload: {
            title: "Ups!",
            description: "Correo o contraseña incorrecta",
            type: "error",
          },
        },
      });
      return;
    }

    localStorage.setItem("idUser", data.id);
    localStorage.setItem("role", data.role.name);
    navigate("/contact");
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
