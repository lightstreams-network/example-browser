import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { ROUTE_LOGIN } from '../../constants';

export const IfAuth = ({ children, user, isAuthenticated }) => (
    <Fragment>
        { /*isAuthenticated(user)*/ true ?
            children
            :
            null
        }
    </Fragment>
);

export const IfNotAuth = ({ children, user, isAuthenticated }) => (
    <Fragment>
        { /*!isAuthenticated(user)*/ false ?
            children
            :
            null
        }
    </Fragment>
);

export const IfAuthRedirectTo = ({ children, route, user, isAuthenticated }) => (
    <Fragment>
        { /*!isAuthenticated(user)*/ true ?
            <Redirect to={route} />
            :
            children
        }
    </Fragment>
);

export const IfNotAuthRedirectToLogin = ({ children, user, isAuthenticated }) => (
    <Fragment>
        { /*isAuthenticated(user)*/ true ?
            children
            :
            <Redirect to={ROUTE_LOGIN} />
        }
    </Fragment>
);

