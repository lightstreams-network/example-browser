import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { fetchToken, createUser } from '../../store/auth';

const AuthForm = ({ url, handleSubmit }) => (
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
            setTimeout(() => {
                alert(JSON.stringify({ url, values }, null, 2));
                setSubmitting(false);
            }, 400);
        }}
    >
        {({ isSubmitting }) => (
            <Form>
                <Field type='email' name='email' placeholder='Email' />
                <ErrorMessage name='email' component='div' />
                <Field type='password' name='password' placeholder='Password' />
                <ErrorMessage name='password' component='div' />
                <button type='submit' disabled={ isSubmitting }>
                    Submit
                </button>
            </Form>
        )}
    </Formik>
);

const mapStateToProps = (state) => {
    return {
        user: null
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

