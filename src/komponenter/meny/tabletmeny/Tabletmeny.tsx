import React, { FunctionComponent, useState } from 'react';
import MenyIkon from '../../../assets/ikoner/MenyIkon';
import { Meny } from '../../../types/SanityTypes';
import BEMHelper from '../../../utils/bem';
import './tabletmeny.less';
import debounce from 'lodash.debounce';
import { setFocusIndex } from '../../../utils/menu-lenker-utils';
import Menyknapp from '../komponenter/Menyknapp';
import InnholdTabletmeny from '../komponenter/InnholdTabletmeny';

interface Props {
    meny: Meny;
}

const Tabletmeny: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('tabletmeny');
    const { meny } = props;
    const [open, setOpen] = useState<boolean>(false);
    const [sectionFocus, setSectionFocus] = useState<number>(0);

    const debounceSectionFocus = debounce(
        () => setFocusIndex(meny.Menypunkter, setSectionFocus, 200),
        10
    );

    window.onscroll = function () {
        debounceSectionFocus();
    };

    return (
        <div className={cls.element('tablet-container')}>
            <div className={cls.element('tablet-anchor')}>
                <div
                    className={cls.element('tablet-wrapper', open ? 'open' : '')}
                    /*  style={{
                marginTop: `${position.toString()}px`,
            }}*/
                >
                    <div className={cls.element('header-ikon')}>
                        <MenyIkon width="4rem" height="4rem" />
                    </div>
                    <div className={cls.element('header-burger-button')}>
                        <Menyknapp open={open} setOpen={setOpen} />
                    </div>

                    <InnholdTabletmeny
                        meny={meny}
                        sectionFocus={sectionFocus}
                        className={cls.className}
                    />
                </div>
            </div>
        </div>
    );
};
export default Tabletmeny;
