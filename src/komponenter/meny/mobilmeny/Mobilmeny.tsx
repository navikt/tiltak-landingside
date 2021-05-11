import React, { FunctionComponent, useState } from 'react';
import { Meny } from '../../../types/SanityTypes';
import BEMHelper from '../../../utils/bem';
import './mobilmeny.less';
import MenyIkon from '../../../assets/ikoner/MenyIkon';
import MobilApneknapp from './MobilApneknapp';
import { Normaltekst } from 'nav-frontend-typografi';
import InnholdMobilmeny from './InnholdMobilmeny';

interface Props {
    meny: Meny;
}

const Mobilmeny: FunctionComponent<Props> = (props) => {
    const { meny } = props;
    const [open, setOpen] = useState<boolean>(false);
    const cls = BEMHelper('mobilmeny');

    return (
        <div className={cls.className}>
            <div className={cls.element('container', open ? 'open' : '')}>
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
                    <InnholdMobilmeny meny={meny} sectionFocus={0} className={cls.className} />
                </div>
            </div>
        </div>
    );
};

export default Mobilmeny;
