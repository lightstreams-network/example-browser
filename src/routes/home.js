import React from 'react';
import { Container, Wrapper, Title, StyledLink } from '../components/elements';
import { IfAuth, IfNotAuth, IfAuthRedirectTo } from '../components/auth';
import { ROUTE_DASHBOARD } from '../constants';

// import {
//     FirebaseContext
// } from '../components/firebase';

const Home = () => (
    <IfAuthRedirectTo route={ROUTE_DASHBOARD}>
        {() => (
            <Container>
                <Wrapper>
                    <Title>
                        <span>Lightstreams</span>
                    </Title>
                    <IfAuth>
                        <StyledLink to='/dashboard'>Dashboard</StyledLink>
                    </IfAuth>
                    <IfNotAuth>
                        <StyledLink to='/login'>Login</StyledLink>
                        <StyledLink to='/register'>Register</StyledLink>
                    </IfNotAuth>
                </Wrapper>
            </Container>
        )}
    </IfAuthRedirectTo>
);

export default Home;
