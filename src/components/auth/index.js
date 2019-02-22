import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isAuthenticated, clearStoredState } from '../../store/auth';

const IfAuthRenderComponent = ({ children, isAuthenticated }) => (
    <Fragment>
        { isAuthenticated ?
            children
            :
            null
        }
    </Fragment>
);

const IfNotAuthRenderComponent = ({ children, isAuthenticated }) => (
    <Fragment>
        { !isAuthenticated ?
            children
            :
            null
        }
    </Fragment>
);

const IfAuthRedirectToRoute = ({ route, children, isAuthenticated, ...props}) => (
    <Fragment>
        { isAuthenticated ?
            <Redirect to={route} />
            :
            children(props)
        }
    </Fragment>
);

const IfNotAuthRedirectToRoute = ({ route,children, isAuthenticated, ...props }) => (
    <Fragment>
        { !isAuthenticated ?
            <Redirect to={route} />
            :
            children(props)
        }
    </Fragment>
);

// https://frontarm.com/james-k-nelson/passing-data-props-children/

const mapStateToProps = (state) => {
    return {
        isAuthenticated: isAuthenticated(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearStorage() {
            dispatch(clearStoredState());
        }
    };
};

export const IfAuth = connect(mapStateToProps, mapDispatchToProps)(IfAuthRenderComponent);
export const IfNotAuth = connect(mapStateToProps, mapDispatchToProps)(IfNotAuthRenderComponent);
export const IfAuthRedirectTo = connect(mapStateToProps, mapDispatchToProps)(IfAuthRedirectToRoute);
export const IfNotAuthRedirectTo = connect(mapStateToProps, mapDispatchToProps)(IfNotAuthRedirectToRoute);

