import React, { FunctionComponent } from 'react';
import BEMHelper from '../../../utils/bem';
import './mobilApneknapp.less';

interface Props {
    open: boolean;
}

const MobilApneknapp: FunctionComponent<Props> = (props) => {
    const { open } = props;
    const cls = BEMHelper('mobilApneknapp');

    return (
        <div className={cls.className}>
            <div className={cls.element('wrapper')}>
                <span className={cls.element('chevron', open ? 'open' : '')} />
            </div>
        </div>
    );
};

export default MobilApneknapp;
