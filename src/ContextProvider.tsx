import React, { FunctionComponent, useEffect, useState } from "react";
import { Banner, Meny, Page } from "./types/SanityTypes";
import { fetchsanityJSON, setEnv } from "./utils/fetch-utils";

interface Props {
  children: React.ReactNode;
}

export interface Context {
  page: Page | null;
  meny: Meny | null;
  banner: Banner | null;
}

export const SommerJobbContext = React.createContext({} as Context);

const ContextProvider: FunctionComponent<Props> = (props) => {
  const [data, setData] = useState<Context>({
    page: null,
    meny: null,
    banner: null,
  });

  const sommerJobbData: Context = {
    page: data.page,
    meny: data.meny,
    banner: data.banner,
  };

  useEffect(() => {
    fetchsanityJSON()
      .then((result) => {
        setEnv(result.env);
        result.data.forEach((obj: any) => {
          switch (obj._type) {
            case "page":
              return setData((prevState) => ({ ...prevState, ["page"]: obj }));
            case "banner":
              return setData((prevState) => ({
                ...prevState,
                ["banner"]: obj,
              }));
            case "navmenu":
              return setData((prevState) => ({
                ...prevState,
                ["meny"]: obj,
              }));
            default:
              return null;
          }
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
