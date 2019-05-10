import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ROUTE_LOGIN } from '../constants';
import { IfNotAuthRedirectTo } from '../components/auth';
import Logo from '../components/logo';
import CopyToClipboard from '../components/copy-to-clipboard';
import Dropzone from '../components/dropzone';
import FileList from '../components/file-list';
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
        {({ user, balance, files, clearStorage, fetchWalletBalance, addFiles }) => {
            const [hasLoadedBefore, setHasLoadedBefore] = useState(false);

            const refreshBalance = () => fetchWalletBalance(user.account);

            useEffect(() => {
                if (!hasLoadedBefore) {
                    setHasLoadedBefore(true);
                    fetchWalletBalance(user.account);
                }
            });
            return (
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
                                <H3>Welcome!</H3>
                                <P>This page demonstrates how you can upload file to your smart vault.</P>
                            </Section>
                            <Section>
                                <H3>Your Wallet</H3>
                                <CopyToClipboard initialText={user.account} />
                                <P>Please make sure you have the password for this address, as there is no other way to recover the account.</P>

                                <H3>Your Balance</H3>
                                <P>{parseFloat(balance/1000000000000000000)}</P>
                            </Section>
                            <Section>
                                <H3>Upload a file</H3>
                                <Dropzone user={user} addFiles={addFiles} refreshBalance={refreshBalance} />
                            </Section>
                            <Section>
                                <H3>Files</H3>
                                <FileList files={files} />
                            </Section>
                            <Section>
                                <P><span className='em'>Are you a developer?</span> <StyledA href="https://docs.lightstreams.network">Check out the documentation</StyledA></P>
                            </Section>
                        </Box>

                    </Wrapper>
                </Container>
            );
        }}
    </IfNotAuthRedirectTo>
);

export default Dashboard;
