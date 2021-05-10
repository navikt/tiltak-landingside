import { Dispatch, SetStateAction } from 'react';
import { Menypunkt } from '../types/SanityTypes';

export enum View {
    DESKTOP = 'DESKTOP',
    TABLET = 'TABLET',
    MOBILE = 'MOBILE',
}

export const initMenutype = (): View => {
    switch (true) {
        case window.innerWidth >= 1024:
            return View.DESKTOP;
        case window.innerWidth > 520 && window.innerWidth < 1024:
            return View.TABLET;
        case window.innerWidth <= 520:
            return View.MOBILE;
        default:
            return View.DESKTOP;
    }
};

const scrollHeight = (): number => window.scrollY || window.pageYOffset;

const hoppLenkerScrollheight = (menypunkt: Menypunkt[]): number[] =>
    menypunkt
        .map((section) => document.getElementById(section.path.current.split('#')[1]))
        .map((sectionNode) => (sectionNode ? sectionNode.offsetTop : 0));

export const setFocusIndex = (
    menypunkt: Menypunkt[],
    setFocusSection: Dispatch<SetStateAction<number>>,
    offset: number
) => {
    return menypunkt.length !== 0
        ? hoppLenkerScrollheight(menypunkt).map((scrollheight, index) => {
              if (scrollheight - offset < scrollHeight()) {
                  return setFocusSection(index);
              }
              return null;
          })
        : null;
};
