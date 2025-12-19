import Button from "../atoms/Button";
import IconItem from "../atoms/Icon";

export default function ItemListContact({
  className,
  value,
  userName = "Indefinido",
  email = "Indefinido",
  sendRequestContact,
}) {
  return (
    <div className={`${className}  py-3  flex`}>
      <div className="w-[47px] h-[47px] rounded-full bg-[#1aad5e1c] mr-2 border border-[#1AAD5E] flex justify-center items-center">
        {/* <IconItem nameIcon="account" className="text-[#1AAD5E]" /> */}
      </div>
      <div className="flex w-[83%] justify-between">
        <div>
          <div>{userName}</div>
          <div>{email}</div>
        </div>
        {sendRequestContact && (
          <div>
            <Button
              color="bg-[#1AAD5E]"
              className="px-[6px] h-9 mr-auto flex justify-center items-center "
            >
              <IconItem nameIcon="sendCheck" size={1} />
            </Button>
          </div>
        )}
        {/* <div>d</div>  */}
      </div>
      {/* <div className="text-end text-[#A2A2A2]">9:27 p.m.</div> */}
    </div>
  );
}
