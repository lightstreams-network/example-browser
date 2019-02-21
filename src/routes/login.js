import React from 'react';
import AuthForm from '../components/form/auth';
import { Container, Wrapper, Title, StyledLink } from '../components/elements';

const Login = () => (
    <Container>
        <Wrapper>
            <Title>
                <span role='img' aria-label='login'>🔑</span> Login
            </Title>

            <AuthForm url='/login' />

            <StyledLink to='/register'>Don&apos;t have an account? Request an invite</StyledLink>
            <StyledLink to='/'>Back</StyledLink>
        </Wrapper>
    </Container>
);

export default Login;
