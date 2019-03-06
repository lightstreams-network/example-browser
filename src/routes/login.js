import React from 'react';
import Logo from '../components/logo';
import AuthForm from '../components/form/auth';
import { Container, Wrapper, Title, StyledLink, Box, Section } from '../components/elements';
import { IfAuthRedirectTo } from '../components/auth';
import { ROUTE_DASHBOARD } from '../constants';

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
                    <StyledLink to='/register'>Don&apos;t have an account? Request an invite</StyledLink>
                    <StyledLink to='/'>Back</StyledLink>
                </Wrapper>
            </Container>
        )}
    </IfAuthRedirectTo>
);

export default Login;
