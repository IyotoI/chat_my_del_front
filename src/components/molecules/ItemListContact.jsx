import Button from "../atoms/Button";
import IconItem from "../atoms/Icon";
import { useLocation } from "react-router-dom";

export default function ItemListContact({
  className,
  value,
  userName = "Indefinido",
  email = "Indefinido",
  sendRequestContact,
  onSearchContact,
  idUser,
  onAddContactList,
  onActionButtonItem,
  itemPayloadContact,
}) {
  const { pathname } = useLocation();
  console.log("🚀 ~ ItemListContact ~ pathname:", itemPayloadContact);
  return (
    <div className={`${className}  py-3  flex`}>
      <div className="w-[47px] h-[47px] rounded-full bg-[#CFD8DF] mr-2 border border-[#CFD8DF] flex justify-center items-center overflow-hidden">
        {/* <IconItem nameIcon="account" className="text-[#1AAD5E]" /> */}
        <IconItem color="white" nameIcon="account" size={1.4} />
      </div>
      <div className="flex w-full justify-between">
        <div>
          <div className="font-bold ">{userName}</div>
          <div>{email}</div>
        </div>
        {pathname === "/contact" && (
          <div>
            {itemPayloadContact === "formContact" ? (
              <Button
                color="bg-[#1AAD5E]"
                className="px-[6px] h-9 mr-auto flex justify-center items-center "
                onClick={onAddContactList}
              >
                <IconItem nameIcon="sendCheck" size={1} />
              </Button>
            ) : (
              <Button
                color="bg-[#1AAD5E]"
                className="px-[6px] h-9 mr-auto flex justify-center items-center "
                onClick={() => onActionButtonItem(idUser)}
              >
                <IconItem nameIcon="emailFast" size={1} />
              </Button>
            )}
          </div>
        )}
        {/* <div>d</div>  */}
      </div>
      {/* <div className="text-end text-[#A2A2A2]">9:27 p.m.</div> */}
    </div>
  );
}
