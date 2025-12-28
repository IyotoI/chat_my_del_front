import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormRegister from "../molecules/form/FormRegister";
import RegisterTemplate from "../templates/RegisterTemplate";
import { useGlobal } from "../../context/GlobalContext";
import authController from "../../controllers/authController";

export default function RegisterPage() {
  const { setInitialState } = useGlobal();

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [payload, setPayload] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const validate = () => {
    const newErrors = {};

    if (!payload.userName) {
      newErrors.userName = "El nombre de usuario es obligatorio";
    }

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
    await authController.post.register(payload);

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
          title: "Excelente!",
          description: "Cuenta creada exitosamente",
          type: "success",
        },
      },
    });
    navigate("/login");
  };

  return (
    <RegisterTemplate>
      <FormRegister
        handleLogin={handleLogin}
        payload={payload}
        setPayload={setPayload}
        errors={errors}
      />
    </RegisterTemplate>
  );
}
