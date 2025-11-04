export default function ChatTemplate({ children }) {
  return (
    <div className="flex flex-col " style={{ height: "calc(100vh - 57px)" }}>
      {children}
    </div>
  );
}
