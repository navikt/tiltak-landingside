import React, { FunctionComponent, useState } from 'react';
import Lenke from 'nav-frontend-lenker';
import { KnappBaseType, sanityImageLink } from '../../../sanity/serializer';
import { Normaltekst } from 'nav-frontend-typografi';
import LenkeTekst from '../komponenter/LenkeTekst';
import KnappBase from 'nav-frontend-knapper';
import { Meny } from '../../../types/SanityTypes';
import BEMHelper from '../../../utils/bem';
import { registrerMenyvalg } from '../../../utils/amplitude-utils';
import { RouteComponentProps, withRouter } from 'react-router';

interface Props {
    meny: Meny;
    sectionFocus: number;
    className: string;
    setOverflow: boolean;
}

const InnholdTabletmeny: FunctionComponent<Props & RouteComponentProps> = (props) => {
    const { meny, sectionFocus, className, setOverflow } = props;
    const [displayLabelIndex, setDisplayLabelIndex] = useState<number | null>(null);
    const [userAgentMobiledevice] = useState(window.navigator.userAgent.includes('Mobile'));
    const cls = BEMHelper(className);

    const displayLabel = (index: number) => setDisplayLabelIndex(index);
    const removeLabel = (time: number) => {
        setTimeout(() => {
            setDisplayLabelIndex(null);
        }, time);
    };

    return (
        <div
            className={cls.element('innhold-container')}
            style={{
                maxHeight: `${window.innerHeight - 34}px`,
                overflow: setOverflow ? 'auto' : 'unset',
            }}
        >
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
                                    onTouchStart={() =>
                                        userAgentMobiledevice ? displayLabel(index) : void 0
                                    }
                                    onTouchMove={() =>
                                        userAgentMobiledevice ? removeLabel(1000) : void 0
                                    }
                                    onTouchEnd={() =>
                                        userAgentMobiledevice ? removeLabel(1000) : void 0
                                    }
                                    onClick={() => {
                                        if (window.location.pathname === '/tiltak/sommerjobb') {
                                            props.history.push('/tiltak/sommerjobb/');
                                        }
                                        registrerMenyvalg(lenke._key);
                                    }}
                                    onMouseOver={() =>
                                        !userAgentMobiledevice ? displayLabel(index) : void 0
                                    }
                                    onMouseLeave={() =>
                                        !userAgentMobiledevice ? removeLabel(0) : void 0
                                    }
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
                                    onClick={() => {
                                        if (window.location.pathname === '/tiltak/sommerjobb') {
                                            props.history.push('/tiltak/sommerjobb/');
                                        }
                                        registrerMenyvalg(innhold._key);
                                        innhold?.knapp?.url
                                            ? (window.location.href = innhold.knapp.url)
                                            : void 0;
                                    }}
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
export default withRouter(InnholdTabletmeny);
