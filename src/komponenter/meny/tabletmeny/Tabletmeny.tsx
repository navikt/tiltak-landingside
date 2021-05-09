import React, { FunctionComponent, useState } from 'react';
import MenyIkon from '../../../assets/ikoner/MenyIkon';
import Lenke from 'nav-frontend-lenker';
import { KnappBaseType, sanityImageLink } from '../../../sanity/serializer';
import { Normaltekst } from 'nav-frontend-typografi';
import LenkeTekst from '../LenkeTekst';
import KnappBase from 'nav-frontend-knapper';
import { Meny } from '../../../types/SanityTypes';
import BEMHelper from '../../../utils/bem';
import './tabletmeny.less';
import { getPosition, initPosition } from '../../../utils/menu-scroll-utils';
import debounce from 'lodash.debounce';
import { setFocusIndex } from '../../../utils/menu-lenker-utils';

interface Props {
    meny: Meny;
}

const Tabletmeny: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('tabletmeny');
    const { meny } = props;
    const [position, setPosition] = useState<number>(initPosition());
    const [sectionFocus, setSectionFocus] = useState<number>(0);

    const debounceSectionFocus = debounce(
        () => setFocusIndex(meny.Menypunkter, setSectionFocus, 200),
        10
    );

    window.onscroll = function () {
        getPosition(setPosition);
        debounceSectionFocus();
    };

    return (
        <div
            className={cls.element('tablet-wrapper')}
            style={{
                marginTop: `${position.toString()}px`,
            }}
        >
            <div className={cls.element('header-ikon')}>
                <MenyIkon width="4rem" height="4rem" />
            </div>
            <div className={cls.element('innhold-container')}>
                <div className={cls.element('lenke-wrapper')}>
                    {meny.Menypunkter &&
                        meny.Menypunkter.map((lenke, index) => {
                            return (
                                <Lenke
                                    href={lenke.path.current ?? '/#'}
                                    className={cls.element(
                                        'lenke',
                                        sectionFocus === index ? 'bold' : ''
                                    )}
                                    key={index}
                                >
                                    {lenke?.linkIcon?.asset?._ref && (
                                        <div className={cls.element('lenke-ikon')}>
                                            <img
                                                src={sanityImageLink(lenke.linkIcon.asset._ref)}
                                                alt="bilde ungdommer på sommerjobb"
                                            />
                                        </div>
                                    )}
                                    <Normaltekst>{LenkeTekst(lenke.linkTitle ?? '')}</Normaltekst>
                                </Lenke>
                            );
                        })}
                </div>
                <div className={cls.element('button-container')}>
                    {meny.Knapper &&
                        meny.Knapper.map((innhold, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <KnappBase
                                        type={
                                            (innhold.knapp.buttontype[0] as KnappBaseType) ||
                                            'hoved'
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
export default Tabletmeny;
