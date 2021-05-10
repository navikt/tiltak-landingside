import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import BEMHelper from '../../../utils/bem';
import './menyknapp.less';
import { Normaltekst } from 'nav-frontend-typografi';

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const Menyknapp: FunctionComponent<Props> = (props) => {
    const { open, setOpen } = props;
    const cls = BEMHelper('menyknapp');
    const toggleMeny = () => {
        setOpen((prevState) => !prevState);
    };
    return (
        <button className={cls.className} onClick={() => toggleMeny()}>
            <div className={cls.element('container', open ? 'open' : '')}>
                <Normaltekst className={cls.element('lukk-tekst')}>Lukk</Normaltekst>
                <div className={cls.element('chevron-wrapper')}>
                    <span className={cls.element('chevron')} />
                </div>
            </div>
        </button>
    );
};
export default Menyknapp;
