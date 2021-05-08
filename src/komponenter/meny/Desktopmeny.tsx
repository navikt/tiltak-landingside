import React, { FunctionComponent } from "react";
import MenyIkon from "../../assets/ikoner/MenyIkon";
import Lenke from "nav-frontend-lenker";
import KnappBase from "nav-frontend-knapper";
import { KnappBaseType } from "../../sanity/serializer";
import BEMHelper from "../../utils/bem";
import { Meny } from "../../types/SanityTypes";
import { FiCheckSquare } from "react-icons/fi";

interface Props {
  meny: Meny;
  sectionFocus: number;
}

const Desktopmeny: FunctionComponent<Props> = (props) => {
  const cls = BEMHelper("meny");
  const { meny, sectionFocus } = props;

  return (
    <div className={cls.element("desktop-wrapper")}>
      <FiCheckSquare />

      <div className={cls.element("header-ikon")}>
        <MenyIkon width="4rem" height="4rem" />
      </div>
      <div className={cls.element("innhold-container")}>
        <div className={cls.element("lenke-wrapper")}>
          {meny.Menypunkter &&
            meny.Menypunkter.map((lenke, index) => {
              return (
                <Lenke
                  href={lenke.path.current ?? "/#"}
                  className={cls.element(
                    "lenke",
                    sectionFocus === index ? "bold" : ""
                  )}
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
    </div>
  );
};
export default Desktopmeny;
