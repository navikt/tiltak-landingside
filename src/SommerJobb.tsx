import React, { FunctionComponent } from 'react';
import BEMHelper from './utils/bem';
import Banner from './komponenter/banner/Banner';
import './sommerjobb.less';
import Meny from './komponenter/meny/Meny';
import Innhold from './komponenter/innhold/Innhold';

const SommerJobb: FunctionComponent = () => {
    const cls = BEMHelper('sommerjobb');

    return (
        <div className={cls.className} id="main-container">
            <Banner />
            <div className={cls.element('wrapper')}>
                <div />
                <div className={cls.element('content-container')}>
                    <div className={cls.element('meny-container')}>
                        <Meny />
                    </div>
                    <Innhold />
                </div>
            </div>
        </div>
    );
};
export default SommerJobb;
