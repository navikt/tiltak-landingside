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
import {
  getMenutype,
  setFocusIndex,
  View,
} from "../../utils/menu-lenker-utils";
import Desktopmeny from "./Desktopmeny";
import Mobilmeny from "./Mobilmeny";

const Meny: FunctionComponent = () => {
  const { meny } = useContext(SommerJobbContext);
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

  if (!meny) return null;

  const debounceSectionFocus = debounce(
    () => setFocusIndex(meny.Menypunkter, setSectionFocus),
    10
  );

  window.onscroll = function () {
    debounceSectionFocus();
  };
  console.log("menytype:", menutype);
  return (
    <div className={cls.className}>
      {menutype === View.DESKTOP ? (
        <Desktopmeny meny={meny} sectionFocus={sectionFocus} />
      ) : (
        <Mobilmeny meny={meny} sectionFocus={sectionFocus} />
      )}
    </div>
  );
};

export default Meny;
