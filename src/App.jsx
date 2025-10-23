import BottomChat from "./components/molecules/bottomChat";
import CardMessages from "./components/molecules/CardMessages";

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Parte superior - chat */}
      <div className="p-5 bg-red-500"></div>
      {/* Conversacion - chat */}
      <div className="flex-1 bg-green-500 px-2">
        {/* Tarjeta mensaje */}
        <CardMessages className="mb-1 bg-[#242626] mr-20 sm:mr-60" />
        <CardMessages className="mb-1 bg-[#144D37] ml-20 sm:ml-60" />
        <CardMessages className="mb-1 bg-[#242626] mr-20 sm:mr-60" />
        <CardMessages className="mb-1 bg-[#144D37] ml-20 sm:ml-60" />
        <CardMessages className="mb-1 bg-[#242626] mr-20 sm:mr-60" />
      </div>
      {/* Parte inferior - chat */}
      <div className="p-5 bg-blue-500">
        <BottomChat />
      </div>
    </div>
  );
};

export default App;
