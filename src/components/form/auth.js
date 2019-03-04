import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import { TextAlignCenter, Button } from '../elements';
import { fetchToken, createUser, getAuthenticatedUser } from '../../store/auth';

const isLogin = (url) => url.includes('login');
const StyledField = styled(Field)`
    border: 1px solid #efefef;
    padding: 20px;
    display: block;
    width: 300px;
`;
const StyledErrorMessage = styled(ErrorMessage)`
    color: #ec4c47;
`;

const Actions = styled.div`
    text-align: center;
    margin: 30px 0;
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
                handleSubmit(url, values).then(() => {
                    setSubmitting(false);
                });
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <StyledField type='email' name='email' placeholder='Email' />
                    <StyledErrorMessage name='email' component='div' />
                    <StyledField type='password' name='password' placeholder='Password' />
                    <StyledErrorMessage name='password' component='div' />
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

            return dispatch(fetchToken({ username: email, password }));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthForm);

