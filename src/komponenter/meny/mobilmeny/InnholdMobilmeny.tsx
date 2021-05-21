import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import Lenke from 'nav-frontend-lenker';
import { KnappBaseType, sanityImageLink } from '../../../sanity/serializer';
import { Normaltekst } from 'nav-frontend-typografi';
import LenkeTekst from '../komponenter/LenkeTekst';
import { Meny } from '../../../types/SanityTypes';
import BEMHelper from '../../../utils/bem';
import { registrerMenyvalg } from '../../../utils/amplitude-utils';
import { RouteComponentProps, withRouter } from 'react-router';
import KnappBase from 'nav-frontend-knapper';

interface Props {
    meny: Meny;
    sectionFocus: number;
    className: string;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const InnholdMobilmeny: FunctionComponent<Props & RouteComponentProps> = (props) => {
    const { meny, sectionFocus, className, setOpen } = props;
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
                                onClick={() => {
                                    if (window.location.pathname === '/tiltak/sommerjobb') {
                                        props.history.push('/tiltak/sommerjobb/');
                                    }
                                    registrerMenyvalg(lenke._key);
                                    setOpen(false);
                                }}
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
            <div className={cls.element('button-wrapper')}>
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
export default withRouter(InnholdMobilmeny);
