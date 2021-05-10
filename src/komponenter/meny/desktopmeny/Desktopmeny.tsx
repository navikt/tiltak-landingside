import React, { FunctionComponent, useState } from 'react';
import MenyIkon from '../../../assets/ikoner/MenyIkon';
import BEMHelper from '../../../utils/bem';
import { Meny } from '../../../types/SanityTypes';
import './desktopmeny.less';
import debounce from 'lodash.debounce';
import { setFocusIndex } from '../../../utils/menu-lenker-utils';
import Innholdmeny from '../komponenter/Innholdmeny';

interface Props {
    meny: Meny;
}

const Desktopmeny: FunctionComponent<Props> = (props) => {
    const [sectionFocus, setSectionFocus] = useState<number>(0);
    const cls = BEMHelper('desktopmeny');
    const { meny } = props;

    const debounceSectionFocus = debounce(
        () => setFocusIndex(meny.Menypunkter, setSectionFocus, 400),
        10
    );

    window.onscroll = function () {
        debounceSectionFocus();
    };

    return (
        <div className={cls.element('desktop-wrapper')}>
            <div className={cls.element('header-ikon')}>
                <MenyIkon width="4rem" height="4rem" />
            </div>
            <Innholdmeny meny={meny} sectionFocus={sectionFocus} className={cls.className} />
        </div>
    );
};
export default Desktopmeny;
