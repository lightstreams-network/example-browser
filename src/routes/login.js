import React from 'react';
import Logo from '../components/logo';
import AuthForm from '../components/form/auth';
import { Container, Wrapper, StyledLink, Box, Section } from '../components/elements';
import { IfAuthRedirectTo } from '../components/auth';
import { ROUTE_DASHBOARD, ROUTE_RESET } from '../constants';

const Login = () => (
    <IfAuthRedirectTo route={ROUTE_DASHBOARD}>
        {() => (
            <Container className='vertical-center'>
                <Wrapper>
                    <Logo className='big' url='/' />
                    <Box className='w-50'>
                        <Section className='pt'>
                            <AuthForm url='/login' />
                        </Section>
                    </Box>
                    <StyledLink to={ROUTE_RESET}>Forgot your password? Reset it</StyledLink>
                </Wrapper>
            </Container>
        )}
    </IfAuthRedirectTo>
);

export default Login;
