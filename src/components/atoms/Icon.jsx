import Icon from "@mdi/react";

import {
  mdiAccount,
  mdiPencil,
  mdiTooltipImageOutline,
  mdiDelete,
  mdiAccountMultiplePlus,
  mdiSend,
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
  } else {
    icnItm = mdiTooltipImageOutline;
  }

  return <Icon className={className} path={icnItm} size={size} />;
}
