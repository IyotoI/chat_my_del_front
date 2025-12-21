import Icon from "@mdi/react";

import {
  mdiAccount,
  mdiPencil,
  mdiTooltipImageOutline,
  mdiDelete,
  mdiAccountMultiplePlus,
  mdiSend,
  mdiExitToApp,
  mdiBell,
  mdiAccountGroup,
  mdiSendCheck,
  mdiAccountPlus,
  mdiEmailFast,
} from "@mdi/js";

export default function IconItem({ color, className, nameIcon, size = 1.2 }) {
  let icnItm;

  if (nameIcon === "pencil") {
    icnItm = mdiPencil;
  } else if (nameIcon === "account") {
    icnItm = mdiAccount;
  } else if (nameIcon === "delete") {
    icnItm = mdiDelete;
  } else if (nameIcon === "accountMultiplePlus") {
    icnItm = mdiAccountMultiplePlus;
  } else if (nameIcon === "send") {
    icnItm = mdiSend;
  } else if (nameIcon === "exitToApp") {
    icnItm = mdiExitToApp;
  } else if (nameIcon === "bell") {
    icnItm = mdiBell;
  } else if (nameIcon === "accountGroup") {
    icnItm = mdiAccountGroup;
  } else if (nameIcon === "sendCheck") {
    icnItm = mdiSendCheck;
  } else if (nameIcon === "accountPlus") {
    icnItm = mdiAccountPlus;
  } else if (nameIcon === "emailFast") {
    icnItm = mdiEmailFast;
  } else {
    icnItm = mdiTooltipImageOutline;
  }

  return <Icon color={color} className={className} path={icnItm} size={size} />;
}
