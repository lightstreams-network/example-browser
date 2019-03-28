import React, { Fragment, createContext, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { initializeFirebase, getFirebaseApp } from '../../store/firebase';
// import createFirebaseApp from '../../lib/firebase';

// export const firebaseApp = createFirebaseApp(app);
// export const FirebaseContext = createContext(null);

const mapStateToProps = (state, props) => ({
    firebase: null
});

const mapDispatchToProps = (dispatch, props) => ({
    startFirebase() {
        dispatch(initializeFirebase());
    }
});

const FirebaseContainer  = ({ children, startFirebase }) => {
    useEffect(() => {
        startFirebase();
    });

    return (
        <Fragment>
            {children}
        </Fragment>
    );
};

FirebaseContainer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.func
    ]).isRequired,
    startFirebase: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(FirebaseContainer);
