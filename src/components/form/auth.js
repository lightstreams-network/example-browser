import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import { getAuthenticatedUser, getAuthErrors } from '../../store/auth';
import { signInWithEmailAndPassword } from '../../store/firebase';
import { Button, Label } from '../elements';
import {
    FIREBASE_NO_UID_CODE,
    AUTH_WRONG_EMAIL_OR_PASSWORD
} from '../../constants';

const isLogin = (url) => url.includes('login');

const StyledField = styled(Field)`
    border: 1px solid var(--silver);
    border-radius: 100px;
    padding: 15px 30px;
    width: 100%;
    font-size: 21px;
`;
const StyledErrorMessage = styled(ErrorMessage)`
    color: #ec4c47;
    padding-left: 30px;
`;

const Actions = styled.div`
    text-align: center;
`;

const AuthForm = ({ url, authErrors, handleSubmit }) => {
    const buttonText = (isLogin(url) ? 'Sign in' : 'Request an invite');
    const buttonTextSubmitting = (isLogin(url) ? 'Signing in' : 'Requesting an invite');

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Email address is missing';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'We need a real email address';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting, setErrors }) => {
                handleSubmit(url, values, (error) => {
                    setErrors({
                        email: AUTH_WRONG_EMAIL_OR_PASSWORD,
                        password: AUTH_WRONG_EMAIL_OR_PASSWORD
                    });
                }).finally(() => {
                    if (authErrors && authErrors.code === FIREBASE_NO_UID_CODE) {
                        setErrors({
                            email: authErrors.message,
                        });
                    }
                    setSubmitting(false);
                });
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Label>
                        <span>Email</span>
                        <StyledField type='email' name='email' placeholder='email@example.com' />
                        <StyledErrorMessage name='email' component='div' />
                    </Label>
                    <Label>
                        <span>Password</span>
                        <StyledField type='password' name='password' placeholder='Your password' />
                        <StyledErrorMessage name='password' component='div' />
                    </Label>
                    <Actions>
                        <Button type='submit' disabled={ isSubmitting }>
                            {isSubmitting ? buttonTextSubmitting : buttonText}
                        </Button>
                    </Actions>
                </Form>
            )}
        </Formik>
    );
};

const mapStateToProps = (state) => {
    return {
        user: getAuthenticatedUser(state),
        authErrors: getAuthErrors(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit(url, { email, password }, errorCb) {
            return dispatch(signInWithEmailAndPassword(email, password, errorCb));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthForm);

