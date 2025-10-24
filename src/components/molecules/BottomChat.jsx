import Button from "../atoms/Button";
import Input from "../atoms/Input";

export default function BottomChat() {
  return (
    <div className="flex">
      <Input className="bg-white px-5 mr-2 text-black" placeholder="Mensaje" />
      <Button color="bg-[#1AAD5E]" />
    </div>
  );
}
