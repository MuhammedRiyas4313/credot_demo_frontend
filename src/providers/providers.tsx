import React from "react";
import RootContextProvider from "./context/RootContext";
import ReactHotToast from "./reactHotToast";
import ReactQueryProvider from "./reactQuery";

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <ReactHotToast>
        <RootContextProvider>{children}</RootContextProvider>
      </ReactHotToast>
    </ReactQueryProvider>
  );
}
