import Button from "../atoms/Button";
import Input from "../atoms/Input";
import IconItem from "../atoms/Icon";

export default function BottomChat() {
  return (
    <div className="flex">
      <Input className="bg-white px-5 mr-2 text-black" placeholder="Mensaje" />
      <Button color="bg-[#1AAD5E]" className="px-[15px]">
        <IconItem nameIcon="send" />
      </Button>
    </div>
  );
}
