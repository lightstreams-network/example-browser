import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const IfAuthComponent = ({ children, isAuthenticated, something }) => (
    <Fragment>
        { isAuthenticated ?
            children
            :
            null
        }
    </Fragment>
);

const IfNotAuthComponent = ({ children, isAuthenticated }) => (
    <Fragment>
        { !isAuthenticated ?
            children
            :
            null
        }
    </Fragment>
);

const IfAuthRedirectToComponent = ({ route, children, isAuthenticated }) => (
    <Fragment>
        { isAuthenticated ?
            <Redirect to={route} />
            :
            children
        }
    </Fragment>
);

const IfNotAuthRedirectToComponent = ({ route,children, isAuthenticated }) => (
    <Fragment>
        { !isAuthenticated ?
            <Redirect to={route} />
            :
            children
        }
    </Fragment>
);

// https://frontarm.com/james-k-nelson/passing-data-props-children/

const mapStateToProps = (state) => {
    return {
        isAuthenticated: true
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export const IfAuth = connect(mapStateToProps, mapDispatchToProps)(IfAuthComponent);
export const IfNotAuth = connect(mapStateToProps, mapDispatchToProps)(IfNotAuthComponent);
export const IfAuthRedirectTo = connect(mapStateToProps, mapDispatchToProps)(IfAuthRedirectToComponent);
export const IfNotAuthRedirectTo = connect(mapStateToProps, mapDispatchToProps)(IfNotAuthRedirectToComponent);

