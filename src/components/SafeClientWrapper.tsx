import { useEffect, useState, ReactNode } from "react";

interface SafeClientWrapperProps {
  children: ReactNode;
}

export default function SafeClientWrapper({ children }: SafeClientWrapperProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div
        style={{
          background: "#0b080c",
          width: "100vw",
          height: "100vh",
          position: "fixed",
          inset: 0,
        }}
      />
    );
  }

  return <>{children}</>;
}

