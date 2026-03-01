import { forwardRef } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import IconItem from "../atoms/Icon";

const BottomChat = forwardRef(
  ({ handleChat, fieldChat, setFieldChat }, ref) => {
    return (
      <form className="flex" onSubmit={handleChat}>
        <Input
          className="bg-white px-5 mr-2 text-black shadow-[0px_3px_8px_-4px_#777777] border-0"
          placeholder="Mensaje"
          value={fieldChat}
          onChange={(e) => setFieldChat(e.target.value)}
          ref={ref}
        />
        <Button type="submit" color="bg-[#1AAD5E]" className="px-[11px]">
          <IconItem nameIcon="send" />
        </Button>
      </form>
    );
  },
);

export default BottomChat;
