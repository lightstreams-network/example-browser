import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isAuthenticated } from '../../store/auth';
import { signOut } from '../../store/firebase';

// see https://frontarm.com/james-k-nelson/passing-data-props-children/

const mapStateToProps = (state) => {
    return {
        isAuthenticated: isAuthenticated(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearStorage() {
            dispatch(signOut());
        }
    };
};

const AuthContainer = ({ children, ...props }) => (
    <Fragment>
        {children(props)}
    </Fragment>
);

AuthContainer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.func
    ]).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
