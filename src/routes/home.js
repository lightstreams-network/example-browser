import React from 'react';
import { Container, Wrapper, Title, Paragraph, StyledLink } from '../components/elements';
import { IfAuth, IfNotAuth, IfAuthRedirectTo } from '../components/auth';
import { ROUTE_DASHBOARD } from '../constants';

const Home = () => (
    <IfAuthRedirectTo route={ROUTE_DASHBOARD}>
        {() => (
            <Container>
                <Wrapper>
                    <Title>
                        <span role='img' aria-label='Fanbase'>📢 </span>
                        <span>Fanbase</span>
                        <span role='img' aria-label='Fanbase'> 📢</span>
                    </Title>
                    <IfAuth>
                        <StyledLink to='/dashboard'>Dashboard</StyledLink>
                    </IfAuth>
                    <IfNotAuth>
                        <StyledLink to='/login'>Login</StyledLink>
                        <StyledLink to='/register'>Request an invite</StyledLink>
                    </IfNotAuth>
                    <Paragraph>Fanbase helps artists and fans get rewarded for their passion.</Paragraph>
                </Wrapper>
            </Container>
        )}
    </IfAuthRedirectTo>
);

export default Home;
