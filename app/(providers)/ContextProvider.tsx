"use client";

import { useEffect, useState } from "react";
import { GlobalProvider } from "../(components)/(context)/globalProvider";

interface Props {
  children: React.ReactNode;
}

// with this file we are wrapping other components and sharing the resources from th contexta api, which is named globalProvider
const ContextProvider = ({ children }: Props) => {
  const [isReady, setIsReady] = useState(false);
  //  initially takes time to load the content so displaying when it is ready
  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 200);
  }, []);

  if (!isReady) {
    return null;
  }
  return <GlobalProvider>{children}</GlobalProvider>;
};

export default ContextProvider;
