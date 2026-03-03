import IconItem from "../atoms/Icon";
import Button from "../atoms/Button";
import { useLocation } from "react-router-dom";

export default function TopContact({
  className,
  userProfile,
  isFieldWriting,
  onExitChat,
  onEnableNotifications,
  onViewConnectedUsers,
  onOpenModal,
  onExitApp,
  onViewProfile,
  onCloseWindowProfile,
}) {
  const { pathname } = useLocation();
  const roleName = localStorage.getItem("role");

  return (
    <div className={`flex justify-between items-center ${className}`}>
      <p className="text-3xl text-[#1AAD5E] font-[Arial] font-bold">
        <span className="text-[#1AAD5E]">C</span>hatmyd
      </p>
      <div className="flex ">
        {pathname !== "/userConnected" && (
          <Button
            color="bg-white"
            className="px-[6px] h-9 flex justify-center items-center mr-3"
            onClick={onOpenModal}
          >
            <IconItem
              className="text-gray-600"
              nameIcon="accountPlus"
              size={1}
            />
          </Button>
        )}

        {roleName === "admin" && (
          <Button
            color="bg-white"
            className="px-[6px] h-9 flex justify-center items-center mr-3"
            onClick={onViewConnectedUsers}
          >
            <IconItem
              className="text-gray-600"
              nameIcon="accountGroup"
              size={1}
            />
          </Button>
        )}
        {/* Boton - Ver perfil */}
        <div>
          <Button
            color="bg-white"
            className="px-[6px] h-9 flex justify-center items-center mr-3"
            onClick={onViewProfile}
          >
            <IconItem
              className="text-gray-600"
              nameIcon="badgeAccount"
              size={1}
            />
          </Button>

          {/* <div className="relative">
        <img
        src={user.avatar}
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        {user.online && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
        )}
      </div> */}
          {userProfile.email && (
            <div className=" bg-white rounded-xl shadow-md p-4 gap-4 flex flex-col absolute right-2 text-center">
              <div className="w-[80px] h-[80px] rounded-full bg-[#CFD8DF] mx-auto border border-[#CFD8DF] flex justify-center items-center overflow-hidden">
                {/* <IconItem nameIcon="account" className="text-[#1AAD5E]" /> */}
                <IconItem color="white" nameIcon="account" size={2.5} />
              </div>
              <div className="flex-1 overflow-hidden text-center">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {userProfile.userName}
                </h2>
                <p className="text-sm text-gray-500 truncate">
                  {userProfile.email}
                </p>
              </div>

              {/* <button className="text-xs px-2 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition cursor-pointer">
                OK
              </button> */}

              <Button
                className="py-[3px] "
                color="bg-[#1AAD5E]"
                onClick={onCloseWindowProfile}
              >
                Ok
              </Button>
            </div>
          )}
        </div>
        <Button
          color="bg-white"
          className="px-[6px] h-9 flex justify-center items-center mr-3"
          onClick={onEnableNotifications}
        >
          <IconItem className="text-gray-600" nameIcon="bell" size={1} />
        </Button>
        <Button
          color="bg-white"
          className="px-[6px] h-9 flex justify-center items-center"
          onClick={onExitApp}
        >
          <IconItem className="text-gray-600" nameIcon="exitToApp" size={1} />
        </Button>
      </div>
    </div>
  );
}
