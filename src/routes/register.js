import React from 'react';
import AuthForm from '../components/form/auth';
import {
    Container,
    Wrapper,
    Title,
    StyledLink
} from '../components/elements';

const Register = () => (
    <Container>
        <Wrapper>
            <Title>
            	<span role='img' aria-label='register'>⚒️</span> Request an invite
            </Title>
            <AuthForm url='/register' />
            <StyledLink to='/login'>Already have an account? Login</StyledLink>
            <StyledLink to='/'>Back</StyledLink>
        </Wrapper>
    </Container>
);

export default Register;
