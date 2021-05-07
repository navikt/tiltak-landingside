import { Dispatch, SetStateAction } from "react";
import { Menypunkt } from "../types/SanityTypes";

export enum View {
  DESKTOP = "DESKTOP",
  MOBILE = "MOBILE",
}

export const getMenutype = () => {
  if (window.innerWidth > 768) {
    return View.DESKTOP;
  }
  return View.MOBILE;
};

const scrollHeight = (): number => window.scrollY || window.pageYOffset;

const hoppLenkerScrollheight = (menypunkt: Menypunkt[]): number[] =>
  menypunkt
    .map((section) =>
      document.getElementById(section.path.current.split("#")[1])
    )
    .map((sectionNode) => (sectionNode ? sectionNode.offsetTop : 0));

export const setFocusIndex = (
  menypunkt: Menypunkt[],
  setFocusSection: Dispatch<SetStateAction<number>>
) => {
  return menypunkt.length !== 0
    ? hoppLenkerScrollheight(menypunkt).map((scrollheight, index) => {
        if (scrollheight - 400 < scrollHeight()) {
          return setFocusSection(index);
        }
        return null;
      })
    : null;
};
