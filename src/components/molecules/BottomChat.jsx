import Button from "../atoms/Button";
import Input from "../atoms/Input";
import IconItem from "../atoms/Icon";

export default function BottomChat() {
  return (
    <div className="flex">
      <Input
        className="bg-white px-5 mr-2 text-black shadow-[0px_3px_8px_-4px_#777777] border-0"
        placeholder="Mensaje"
      />
      <Button color="bg-[#1AAD5E]" className="px-[11px]">
        <IconItem nameIcon="send" />
      </Button>
    </div>
  );
}
