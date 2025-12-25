import Button from "../atoms/Button";
import IconItem from "../atoms/Icon";

const AlertCard = ({ titulo, description }) => {
  return (
    <div class="w-sm flex flex-col items-center py-15 rounded-xl bg-white shadow-sm">
      <IconItem color={"#1AAD5E"} size={3} className={"mb-8"} />
      <h4 class="font-semibold text-2xl flex items-center gap-2 text-gray-700">
        Titulo
      </h4>
      <h4 class="font-semibold text-lg flex items-center gap-2 text-gray-500">
        Desripcion
      </h4>
      <Button color="bg-[#1AAD5E] mt-8">Entiendo</Button>
    </div>
  );
};

export default AlertCard;
