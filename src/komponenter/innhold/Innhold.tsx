import React, { FunctionComponent, useContext } from 'react';
import { SommerJobbContext } from '../../ContextProvider';
import { SeksjonType } from '../../types/SanityTypes';
import BEMHelper from '../../utils/bem';
import Seksjon from '../seksjon/Seksjon';

const Innhold: FunctionComponent = () => {
    const { page } = useContext(SommerJobbContext);
    const cls = BEMHelper('innhold');

    if (!page) return null;

    const getComponent = (innhold: any): React.ReactNode => {
        switch (innhold._type) {
            case 'seksjon':
                return <Seksjon seksjon={innhold as SeksjonType} />;
            default:
                return null;
        }
    };

    return (
        <div className={cls.className} style={{ marginLeft: '0.75rem' }}>
            {page?.content?.map((innhold: any, index: number) => {
                return <React.Fragment key={index}>{getComponent(innhold)}</React.Fragment>;
            })}
        </div>
    );
};

export default Innhold;
