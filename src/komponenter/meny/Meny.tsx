import React, { FunctionComponent, useContext } from "react";
import { SommerJobbContext } from "../../ContextProvider";
import BEMHelper from "../../utils/bem";
import "./meny.less";
import MenyIkon from "../../assets/ikoner/MenyIkon";
import Lenke from "nav-frontend-lenker";
import KnappBase from "nav-frontend-knapper";
import { KnappBaseType } from "../../sanity/serializer";

const Meny: FunctionComponent = () => {
  const { meny } = useContext(SommerJobbContext);
  const cls = BEMHelper("meny");

  if (!meny) return null;

  return (
    <div className={cls.className}>
      <div className={cls.element("header-ikon")}>
        <MenyIkon width="4rem" height="4rem" />
      </div>
      <div className={cls.element("lenke-wrapper")}>
        {meny.Menypunkter &&
          meny.Menypunkter.map((lenke, index) => {
            return (
              <Lenke
                href={lenke.path.current ?? "/#"}
                className={cls.element("lenke")}
                key={index}
              >
                {lenke.linkTitle ?? ""}
              </Lenke>
            );
          })}
      </div>
      <div className={cls.element("button-container")}>
        {meny.Knapper &&
          meny.Knapper.map((innhold, index) => {
            return (
              <React.Fragment key={index}>
                <KnappBase
                  type={
                    (innhold.knapp.buttontype[0] as KnappBaseType) || "hoved"
                  }
                >
                  {innhold.knapp.tekst}
                </KnappBase>
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default Meny;
