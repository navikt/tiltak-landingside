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
        console.log("res", result.data);
        setEnv(result.env);
        setData({
          banner: result.data[0],
          meny: result.data[1],
          page: result.data[2],
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
