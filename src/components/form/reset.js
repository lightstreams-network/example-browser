import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import { getAuthenticatedUser } from '../../store/auth';
import { resetPassword } from '../../store/firebase';
import { Button, Label } from '../elements';
import { RESET_PASSWORD, FORM_SENDING } from '../../constants';

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
    const buttonText = RESET_PASSWORD;
    const buttonTextSubmitting = FORM_SENDING;

    return (
        <Formik
            initialValues={{ email: '' }}
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
        handleSubmit(url, { email }) {
            return dispatch(resetPassword(email));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthForm);

