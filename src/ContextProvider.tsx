import React, { FunctionComponent, useEffect, useState } from "react";
import { Banner, Meny, Page } from "./types/SanityTypes";
import { fetchsanityJSON, setEnv } from "./utils/fetch-utils";

interface Props {
  children: React.ReactNode;
}

export interface Context {
  page: Page | null;
  navmenu: Meny | null;
  banner: Banner | null;
}

export const SommerJobbContext = React.createContext({} as Context);

const ContextProvider: FunctionComponent<Props> = (props) => {
  const [data, setData] = useState<Context>({
    page: null,
    navmenu: null,
    banner: null,
  });

  const sommerJobbData: Context = {
    page: data.page,
    navmenu: data.navmenu,
    banner: data.banner,
  };

  useEffect(() => {
    fetchsanityJSON()
      .then((result) => {
        setEnv(result.env);
        result.data.forEach((obj: any) => {
          setData((prevState) => ({
            ...prevState,
            [obj._type]: obj,
          }));
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <SommerJobbContext.Provider value={sommerJobbData}>
      {props.children}
    </SommerJobbContext.Provider>
  );
};

export default ContextProvider;
