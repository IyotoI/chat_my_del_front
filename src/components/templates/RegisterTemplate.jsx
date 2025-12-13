import imgBackgroundLogin from "../../assets/images/backgroundLogin.png";

export default function RegisterTemplate({ children }) {
  return (
    <div
      className=" flex justify-center items-center px-10"
      style={{
        backgroundImage: `url(${imgBackgroundLogin})`,
        height: "calc(100vh - 57px)",
      }}
    >
      {/* <img
        src={imgBackgroundLogin}
        alt="Logo"
        className="absolute inset-0 w-full h-full  object-cover"
      /> */}
      {children}
    </div>
  );
}
