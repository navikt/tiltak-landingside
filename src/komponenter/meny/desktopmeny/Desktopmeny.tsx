import React, { FunctionComponent, useState } from 'react';
import MenyIkon from '../../../assets/ikoner/MenyIkon';
import Lenke from 'nav-frontend-lenker';
import KnappBase from 'nav-frontend-knapper';
import { KnappBaseType, sanityImageLink } from '../../../sanity/serializer';
import BEMHelper from '../../../utils/bem';
import { Meny } from '../../../types/SanityTypes';
import { Normaltekst } from 'nav-frontend-typografi';
import './desktopmeny.less';
import LenkeTekst from '../LenkeTekst';
import debounce from 'lodash.debounce';
import { setFocusIndex } from '../../../utils/menu-lenker-utils';

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
        console.log('scrolling');
    };

    return (
        <div className={cls.element('desktop-wrapper')}>
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
export default Desktopmeny;
