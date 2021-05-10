import React, { FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

const UrlAppend: FunctionComponent<RouteComponentProps> = (props) => {
    if (window.location.pathname === '/tiltak/sommerjobb') {
        props.history.push('/tiltak/sommerjobb/');
    }
    return <>{props.children}</>;
};

export default withRouter(UrlAppend);
