import ModalContactOrganism from "./components/organisms/ModalContactOrganism";
import ModalOrganism from "./components/organisms/ModalOrganis";
import AppRouter from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <ModalOrganism />
      <ModalContactOrganism />
      {/* <div className="p-7"></div> */}
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
