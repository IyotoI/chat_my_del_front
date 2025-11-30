import ModalOrganism from "./components/organisms/ModalOrganis";
import AppRouter from "./routes/AppRouter";

const App = () => {
  return (
    <div>
      <ModalOrganism />
      {/* <div className="p-7"></div> */}
      <AppRouter />
    </div>
  );
};

export default App;
