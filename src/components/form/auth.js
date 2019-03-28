import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import { fetchToken, createUser, getAuthenticatedUser } from '../../store/auth';
import { signInWithEmailAndPassword } from '../../store/firebase';
import { Button, Label } from '../elements';

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

const AuthForm = ({ url, handleSubmit }) => {
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
            onSubmit={(values, { setSubmitting }) => {
                handleSubmit(url, values);
                setSubmitting(false);
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
                        <StyledField type='password' name='password' placeholder='At least 8 characters' />
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
        user: getAuthenticatedUser(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit(url, { email, password }) {
            if (url.includes('register')) {
                return dispatch(createUser({ username: email, password }));
            }

            // return dispatch(fetchToken({ username: email, password }));
            return dispatch(signInWithEmailAndPassword(email, password));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthForm);

