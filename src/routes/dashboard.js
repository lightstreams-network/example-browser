import React from 'react';
import styled from 'styled-components';
import { ROUTE_LOGIN } from '../constants';
import { IfNotAuthRedirectTo } from '../components/auth';
import Logo from '../components/logo';
import CopyToClipboard from '../components/copy-to-clipboard';
import Pill from '../components/pill';
import WalletInput from '../components/form/wallet';
import {
    Container,
    Wrapper,
    StyledLink,
    H2,
    H3,
    H4,
    P,
    Flex,
    Box,
    Section,
    Span
} from '../components/elements';

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px 0;

    & a {
        display: block;
    }
`;

const Intro = styled.div`
    padding-bottom: 15px;
`;

const StyledA = styled.a`
    color: var(--pink);
`;

const Dashboard = () => (
    <IfNotAuthRedirectTo route={ROUTE_LOGIN}>
        {({ clearStorage, user }) => (
            <Container>
                <Wrapper>
                    <Header className='w-100 w-75-ns'>
                        <Logo className='big' url='/' />
                        <Flex>
                            <StyledLink onClick={(e) => {
                                e.preventDefault();
                                clearStorage();
                            }} to='/logout'>Logout
                            </StyledLink>
                        </Flex>
                    </Header>
                    <Box>
                        <Section>
                            <H3>Welcome {user.first_name}</H3>
                            <P>This page will let you set the wallet address where you will receive your PHT tokens.</P>
                        </Section>
                        <Section>
                            <H3>Your Wallet</H3>
                            <P>Please make sure you have the private key for this address and that it is NOT a hardware or exchange wallet.</P>
                            <WalletInput />
                        </Section>
                        <Section>
                            <P><span className='em'>Need help?</span> <StyledA href="https://medium.com/lightstreams/how-to-create-your-pht-wallet-e9233fb97937">Follow these instructions</StyledA></P>
                        </Section>
                    </Box>

                </Wrapper>
            </Container>
        )}
    </IfNotAuthRedirectTo>
);

export default Dashboard;
