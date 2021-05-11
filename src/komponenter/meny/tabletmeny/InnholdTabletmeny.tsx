import React, { FunctionComponent, useState } from 'react';
import Lenke from 'nav-frontend-lenker';
import { KnappBaseType, sanityImageLink } from '../../../sanity/serializer';
import { Normaltekst } from 'nav-frontend-typografi';
import LenkeTekst from '../komponenter/LenkeTekst';
import KnappBase from 'nav-frontend-knapper';
import { Meny } from '../../../types/SanityTypes';
import BEMHelper from '../../../utils/bem';

interface Props {
    meny: Meny;
    sectionFocus: number;
    className: string;
}

const InnholdTabletmeny: FunctionComponent<Props> = (props) => {
    const { meny, sectionFocus, className } = props;
    const [displayLabelIndex, setDisplayLabelIndex] = useState<number | null>(null);
    const cls = BEMHelper(className);

    const displayLabel = (index: number) => setDisplayLabelIndex(index);
    const removeLabel = () => setDisplayLabelIndex(null);

    return (
        <div className={cls.element('innhold-container')}>
            <div className={cls.element('lenke-wrapper')}>
                {meny.Menypunkter &&
                    meny.Menypunkter.map((lenke, index) => {
                        return (
                            <div style={{ position: 'relative' }} key={index}>
                                <Lenke
                                    href={lenke.path.current ?? '/#'}
                                    className={cls.element(
                                        'lenke',
                                        sectionFocus === index ? 'bold' : ''
                                    )}
                                    onTouchStart={() => displayLabel(index)}
                                    onTouchMove={() => removeLabel()}
                                    onTouchEnd={() => removeLabel()}
                                    //onMouseEnter={() => displayLabel(index)}
                                    //onMouseLeave={() => removeLabel()}
                                    //onMouseOut={() => removeLabel()}
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
                                <div
                                    className={cls.element(
                                        'lenke-label',
                                        displayLabelIndex === index ? 'display' : ''
                                    )}
                                >
                                    <div className={cls.element('label-frame')}>
                                        <Normaltekst>{lenke.linkTitle ?? ''}</Normaltekst>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <div className={cls.element('button-container')}>
                {meny.Knapper &&
                    meny.Knapper.map((innhold, index) => {
                        return (
                            <React.Fragment key={index}>
                                <KnappBase
                                    type={(innhold.knapp.buttontype[0] as KnappBaseType) || 'hoved'}
                                >
                                    {innhold.knapp.tekst}
                                </KnappBase>
                            </React.Fragment>
                        );
                    })}
            </div>
        </div>
    );
};
export default InnholdTabletmeny;
