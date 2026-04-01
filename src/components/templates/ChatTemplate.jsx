import { useState, useEffect } from "react";

function useViewportHeight() {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateHeight = () => {
      setHeight(window.visualViewport?.height || window.innerHeight);
    };

    window.visualViewport?.addEventListener("resize", updateHeight);

    return () => {
      window.visualViewport?.removeEventListener("resize", updateHeight);
    };
  }, []);

  return height;
}

export default function ChatTemplate({ children }) {
  const height = useViewportHeight();
  return (
    <div className="flex flex-col " style={{ height }}>
      {children}
    </div>
  );
}
