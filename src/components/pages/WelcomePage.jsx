import { useNavigate } from "react-router-dom";
import FormWelcome from "../molecules/form/FormWelcome";
import WelcomeTemplate from "../templates/WelcomeTemplate";

export default function WelcomePage() {
  const navigate = useNavigate();

  const handleActionsButtons = (buttonSelected) => {
    if (buttonSelected === "login") return navigate("/login");
    if (buttonSelected === "register") navigate("/register");
  };

  return (
    <WelcomeTemplate>
      <FormWelcome onHandleActionsButtons={handleActionsButtons} />
    </WelcomeTemplate>
  );
}
