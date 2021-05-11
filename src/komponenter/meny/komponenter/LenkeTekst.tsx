import React from 'react';

const LenkeTekst = (txt: string) => {
    if (txt.length >= 27) {
        const ordlist = txt.split(' ');
        let leke: any = [];
        ordlist.forEach((elem, index) =>
            leke.push(
                index !== ordlist.length - 1 ? (
                    <React.Fragment key={index}>{elem.concat(' ')}</React.Fragment>
                ) : (
                    <React.Fragment key={index}>
                        <br />
                        {elem}
                    </React.Fragment>
                )
            )
        );
        return <span aria-label={txt}>{leke ?? ''}</span>;
    }
    return <span aria-label={txt}>{txt}</span>;
};
export default LenkeTekst;
