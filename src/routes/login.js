import React from 'react';
import AuthForm from '../components/form/auth';
import { Container, Wrapper, Title, StyledLink } from '../components/elements';
import { IfAuthRedirectTo } from '../components/auth';
import { ROUTE_DASHBOARD } from '../constants';

const Login = () => (
    <IfAuthRedirectTo route={ROUTE_DASHBOARD}>
        <Container>
            <Wrapper>
                <Title>
                    <span role='img' aria-label='login'>🔑 </span>
                    Login
                    <span role='img' aria-label='login'> 🔑</span>
                </Title>
                <AuthForm url='/login' />
                <StyledLink to='/register'>Don&apos;t have an account? Request an invite</StyledLink>
                <StyledLink to='/'>Back</StyledLink>
            </Wrapper>
        </Container>
    </IfAuthRedirectTo>
);

export default Login;
