import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isAuthenticated, getAuthenticatedUser, clearStoredState } from '../../store/auth';
import { lethStorageAdd, getWalletBalance, lethWalletBalance, getLethFiles } from '../../store/leth';

// see https://frontarm.com/james-k-nelson/passing-data-props-children/

const mapStateToProps = (state) => {
    return {
        isAuthenticated: isAuthenticated(state),
        user: getAuthenticatedUser(state),
        balance: getWalletBalance(state),
        files: getLethFiles(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearStorage() {
            dispatch(clearStoredState());
        },
        addFiles({ account, password, files }) {
            dispatch(lethStorageAdd({ account, password, files }));
        },
        fetchWalletBalance(account) {
            dispatch(lethWalletBalance(account));
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
