import React from 'react';
import styled from 'styled-components';
import { ROUTE_LOGIN } from '../constants';
import { IfNotAuthRedirectTo } from '../components/auth';
import Logo from '../components/logo';
import CopyToClipboard from '../components/copy-to-clipboard';
import Pill from '../components/pill';
import SocialShare from '../components/social-share';
import ProgressBar from '../components/progress-bar';
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

const Dashboard = () => (
    <IfNotAuthRedirectTo route={ROUTE_LOGIN}>
        {({ clearStorage }) => (
            <Container>
                <Wrapper>
                    <Header className='w-100 w-75-ns'>
                        <Logo url='/' />
                        <Flex>
                            <Pill className='green'>EG</Pill>
                            <Pill><img src={require('../img/notification.svg')} alt="Notifications"/></Pill>
                        </Flex>
                    </Header>
                    <Intro className='w-100 w-75-ns'>
                        <H2>Welcome Edi</H2>
                        <H3 className='fw4'>Fanbase helps fans support their favorite artists and get rewarded for their passion.</H3>
                    </Intro>
                    <Box>
                        <Section>
                            <H3>Current tasks</H3>
                            <P>Invite people you know to secure an additional <span className='thin'>PHT</span> <span className='em'>2500</span></P>
                            <CopyToClipboard initialText='https://fanbase.live/invite/abd1239813' />
                            <SocialShare />
                        </Section>
                        <Section>
                            <H3>Current balance</H3>
                            <H4 className='mv'><Span className='thin'>PHT</Span> 500</H4>
                            <P>Out of your possible <span className='thin'>PHT</span> <span className='em'>3,000</span></P>
                            <ProgressBar width='15' />
                        </Section>
                        <Section>
                            <P><span className='em'>Your account has not been verified yet</span>. <a href="/#resend">Resend email?</a></P>
                            <P>You will receive PHT 500 following verification</P>
                        </Section>
                    </Box>
                    <StyledLink onClick={(e) => {
                        e.preventDefault();
                        clearStorage();
                    }} to='/logout'>Logout
                    </StyledLink>
                </Wrapper>
            </Container>
        )}
    </IfNotAuthRedirectTo>
);

export default Dashboard;
