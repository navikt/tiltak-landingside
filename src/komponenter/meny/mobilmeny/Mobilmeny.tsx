import React, { FunctionComponent } from 'react';
import { Meny } from '../../../types/SanityTypes';
import BEMHelper from '../../../utils/bem';
import './mobilmeny.less';
// import KnappBase from "nav-frontend-knapper";

interface Props {
    meny: Meny;
}

const Mobilmeny: FunctionComponent<Props> = (props) => {
    // const { meny } = props;
    const cls = BEMHelper('mobilmeny');

    return (
        <div className={cls.className}>{/*<KnappBase type="hoved">{meny.title}</KnappBase>*/}</div>
    );
};

export default Mobilmeny;
