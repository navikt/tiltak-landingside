import React, { FunctionComponent } from 'react';
import Lenke from 'nav-frontend-lenker';
import { sanityImageLink } from '../../../sanity/serializer';
import { Normaltekst } from 'nav-frontend-typografi';
import LenkeTekst from '../komponenter/LenkeTekst';
import { Meny } from '../../../types/SanityTypes';
import BEMHelper from '../../../utils/bem';
import { registrerMenyvalg } from '../../../utils/amplitude-utils';

interface Props {
    meny: Meny;
    sectionFocus: number;
    className: string;
}

const InnholdMobilmeny: FunctionComponent<Props> = (props) => {
    const { meny, sectionFocus, className } = props;
    const cls = BEMHelper(className);
    return (
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
                                onClick={() => registrerMenyvalg(lenke._key)}
                            >
                                {lenke?.linkIcon?.asset?._ref && (
                                    <div
                                        className={cls.element(
                                            'lenke-ikon',
                                            sectionFocus === index ? 'active' : ''
                                        )}
                                    >
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
        </div>
    );
};
export default InnholdMobilmeny;
