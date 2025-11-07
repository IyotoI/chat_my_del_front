import BottomChat from "../molecules/BottomChat";
import TopChat from "../molecules/TopChat";
import CardMessages from "../molecules/CardMessages";

export default function ChatOrganism({ children }) {
  return (
    <>
      {/* Parte superior - chat */}
      <div className="p-2 bg-white">
        <TopChat />
      </div>
      {/* Conversacion - chat */}
      <div className="flex-1 bg-[#F5F2EB] px-2 pt-2 overflow-y-auto ">
        {/* Tarjeta mensaje */}
        <CardMessages
          className="mb-1 bg-white mr-20 sm:mr-60
        "
        />
        <CardMessages className="mb-1 bg-[#D9FCD2] ml-20 md:ml-50 xl:ml-118" />
        <CardMessages className="mb-1 bg-white mr-20 sm:mr-60" />
        <CardMessages className="mb-1 bg-[#D9FCD2] ml-20 md:ml-50 xl:ml-118" />
      </div>
      {/* Parte inferior - chat */}
      <div className="p-2 bg-[#F5F2EB] ">
        <BottomChat />
      </div>
    </>
  );
}
