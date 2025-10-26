import BottomChat from "./components/molecules/BottomChat";
import TopChat from "./components/molecules/TopChat";
import CardMessages from "./components/molecules/CardMessages";

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Parte superior - chat */}
      <div className="p-3 bg-white">
        <TopChat />
      </div>
      {/* Conversacion - chat */}
      <div className="flex-1 bg-[#b9adad] px-2 pt-2 overflow-y-auto mb-14">
        {/* Tarjeta mensaje */}
        <CardMessages className="mb-1 bg-white mr-20 sm:mr-60" />
        <CardMessages className="mb-1 bg-[#D9FCD2] ml-20 sm:ml-60" />
        <CardMessages className="mb-1 bg-white mr-20 sm:mr-60" />
      </div>
      {/* Parte inferior - chat */}
      <div className="p-1 bg-[#b9adad] absolute bottom-0 w-full">
        <BottomChat />
      </div>
    </div>
  );
};

export default App;
