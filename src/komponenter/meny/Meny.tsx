import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { SommerJobbContext } from '../../ContextProvider';
import { initMenutype, View } from '../../utils/menu-lenker-utils';
import Desktopmeny from './desktopmeny/Desktopmeny';
import Tabletmeny from './tabletmeny/Tabletmeny';
import Mobilmeny from './mobilmeny/Mobilmeny';
import BEMHelper from '../../utils/bem';

const Meny: FunctionComponent = () => {
    const { navmenu } = useContext(SommerJobbContext);
    const [menutype, setMenutype] = useState<View>(initMenutype());
    const cls = BEMHelper('meny');

    useEffect(() => {
        const viewInnerWidth = () => {
            if (menutype !== View.DESKTOP && window.innerWidth >= 1024) {
                setMenutype(View.DESKTOP);
            } else if (
                menutype !== View.TABLET &&
                window.innerWidth > 576 &&
                window.innerWidth < 1024
            ) {
                setMenutype(View.TABLET);
            } else if (menutype !== View.MOBILE && window.innerWidth <= 576) {
                setMenutype(View.MOBILE);
            }
        };

        window.addEventListener('resize', viewInnerWidth);
        return () => window.removeEventListener('resize', viewInnerWidth);
    });

    if (!navmenu) return null;

    const getMenu = (type: View): React.ReactNode => {
        switch (type) {
            case View.DESKTOP:
                return <Desktopmeny meny={navmenu} />;
            case View.TABLET:
                return <Tabletmeny meny={navmenu} />;
            case View.MOBILE:
                return <Mobilmeny meny={navmenu} />;
        }
    };

    return <div className={cls.className}>{getMenu(menutype)}</div>;
};

export default Meny;
