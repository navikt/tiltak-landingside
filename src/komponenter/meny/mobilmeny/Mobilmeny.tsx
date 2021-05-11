import React, { FunctionComponent, useEffect, useState } from 'react';
import { Meny } from '../../../types/SanityTypes';
import BEMHelper from '../../../utils/bem';
import './mobilmeny.less';
import MenyIkon from '../../../assets/ikoner/MenyIkon';
import MobilApneknapp from './MobilApneknapp';
import { Normaltekst } from 'nav-frontend-typografi';
import InnholdMobilmeny from './InnholdMobilmeny';
import debounce from 'lodash.debounce';
import { setFocusIndex } from '../../../utils/menu-lenker-utils';

interface Props {
    meny: Meny;
}

const MOBILE_CONTAINER = 'mobil-container';

const Mobilmeny: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('mobilmeny');
    const { meny } = props;
    const [open, setOpen] = useState<boolean>(false);
    const [sectionFocus, setSectionFocus] = useState<number>(0);

    const debounceSectionFocus = debounce(
        () => setFocusIndex(meny.Menypunkter, setSectionFocus, 200),
        10
    );

    useEffect(() => {
        const closeOnCLickOutside = (event: any) => {
            if (open && !document.getElementById(MOBILE_CONTAINER)?.contains(event?.target)) {
                setOpen((prevState) => !prevState);
            }
        };

        window.addEventListener('click', closeOnCLickOutside);
        return () => window.removeEventListener('click', closeOnCLickOutside);
    }, [open]);

    window.onscroll = function () {
        debounceSectionFocus();
    };

    return (
        <div className={cls.className}>
            <div className={cls.element('container', open ? 'open' : '')} id={MOBILE_CONTAINER}>
                <button
                    className={cls.element('header')}
                    onClick={() => setOpen((prevState) => !prevState)}
                >
                    <MenyIkon width="2rem" height="2rem" />
                    <div className={cls.element('toggleBtn')}>
                        <div className={cls.element('tittel')}>
                            <Normaltekst>{meny.title}</Normaltekst>
                        </div>
                        <MobilApneknapp open={open} />
                    </div>
                </button>
                <div className={cls.element('body')}>
                    <InnholdMobilmeny
                        meny={meny}
                        sectionFocus={sectionFocus}
                        className={cls.className}
                    />
                </div>
            </div>
        </div>
    );
};

export default Mobilmeny;
