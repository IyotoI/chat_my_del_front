import ModalOrganism from "./components/organisms/ModalOrganis";
import AppRouter from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div class="grid grid-rows-3 h-screen gap-4">
      <div class="bg-red-300 flex-1">Espacio 1</div>
      <div class="bg-green-300 flex-1">Espacio 2</div>
      <div class="bg-blue-300 flex-1">
        <input type="text" />
      </div>
    </div>
  );
};

export default App;
