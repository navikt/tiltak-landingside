import React, {FunctionComponent, useContext} from 'react';
import { SommerJobbContext } from './ContextProvider';
import BEMHelper from "./utils/bem";



const SommerJobb: FunctionComponent = () => {
    const {banner, meny, page } = useContext(SommerJobbContext);
    const cls = BEMHelper('sommerjobb');



    return(
        <div className={cls.className}>

        </div>
    )
}
export default SommerJobb;