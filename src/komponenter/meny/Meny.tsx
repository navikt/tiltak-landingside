import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { SommerJobbContext } from "../../ContextProvider";
import debounce from "lodash.debounce";
import BEMHelper from "../../utils/bem";
import "./meny.less";
import MenyIkon from "../../assets/ikoner/MenyIkon";
import Lenke from "nav-frontend-lenker";
import KnappBase from "nav-frontend-knapper";
import { KnappBaseType } from "../../sanity/serializer";
import {
  getMenutype,
  setFocusIndex,
  View,
} from "../../utils/menu-lenker-utils";

const Meny: FunctionComponent = () => {
  const { navmenu } = useContext(SommerJobbContext);
  const [sectionFocus, setSectionFocus] = useState<number>(0);
  const [menutype, setMenutype] = useState<View>(getMenutype());
  const cls = BEMHelper("meny");

  useEffect(() => {
    const viewInnerWidth = () => {
      if (menutype !== View.DESKTOP && window.innerWidth > 768) {
        setMenutype(View.DESKTOP);
      } else if (menutype !== View.MOBILE && window.innerWidth <= 768) {
        setMenutype(View.MOBILE);
      }
    };

    window.addEventListener("resize", viewInnerWidth);
    return () => window.removeEventListener("resize", viewInnerWidth);
  });

  if (!navmenu) return null;

  const debounceSectionFocus = debounce(
    () => setFocusIndex(navmenu.Menypunkter, setSectionFocus),
    10
  );

  window.onscroll = function () {
    debounceSectionFocus();
  };

  return (
    <div className={cls.className}>
      <div className={cls.element("header-ikon")}>
        <MenyIkon width="4rem" height="4rem" />
      </div>
      <div className={cls.element("lenke-wrapper")}>
        {navmenu.Menypunkter &&
          navmenu.Menypunkter.map((lenke, index) => {
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
        {navmenu.Knapper &&
          navmenu.Knapper.map((innhold, index) => {
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
