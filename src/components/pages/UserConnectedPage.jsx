import { useEffect, useState } from "react";
import ContactOrganism from "../organisms/ContactOrganism";
import ContactTemplate from "../templates/ContactTemplate";
import authController from "../../controllers/authController";

export default function UserConnectedPage() {
  const [userConnected, setUserConnected] = useState([]);

  useEffect(() => {
    getUserConnected();
  }, []);

  const getUserConnected = async () => {
    const res = await authController.get.userConnected();
    console.log(res);
    setUserConnected(res);
  };

  return (
    <ContactTemplate>
      <ContactOrganism userConnected={userConnected} />
    </ContactTemplate>
  );
}
