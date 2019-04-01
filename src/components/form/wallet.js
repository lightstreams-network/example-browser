import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import { getAuthenticatedUser } from '../../store/auth';
import { updateWallet, getSubscriberId, getWalletAddress } from '../../store/firebase';
import { Button, Label } from '../elements';
import { isAddress } from '../../lib/checks';
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

const Wallet = ({ url, handleSubmit, subscriberId, walletAddress }) => {
    const buttonText = 'Update wallet address';
    const buttonTextSubmitting = FORM_SENDING;

    return (
        <Formik
            initialValues={{ wallet: '' }}
            validate={values => {
                const errors = {};
                if (!values.wallet) {
                    errors.wallet = 'Wallet address is missing';
                } else if (
                    !isAddress(values.wallet)
                ) {
                    errors.wallet = 'We need a valid wallet address';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting, setErrors }) => {
                handleSubmit(subscriberId, values);
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <div>
                    {(walletAddress !== null) ?
                        <div>
                            <h2>Thank you for updating your wallet!</h2>
                            <h3>Wallet address: {walletAddress}</h3>
                        </div>
                        :
                        <Form>
                            <Label>
                                <span>PHT Delivery Address</span>
                                <StyledField type='text' name='wallet' placeholder='Please type a valid Ethereum-compatible address' />
                                <StyledErrorMessage name='wallet' component='div' />
                            </Label>
                            <Actions>
                                <Button type='submit' disabled={ isSubmitting }>
                                    {isSubmitting ? buttonTextSubmitting : buttonText}
                                </Button>
                            </Actions>
                        </Form>
                    }

                </div>
            )}
        </Formik>
    );
};

const mapStateToProps = (state) => {
    return {
        user: getAuthenticatedUser(state),
        subscriberId: getSubscriberId(state),
        walletAddress: getWalletAddress(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit(subscriberId, { wallet }) {
            return dispatch(updateWallet(subscriberId, wallet));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Wallet);

