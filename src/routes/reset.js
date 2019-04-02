import React from 'react';
import Logo from '../components/logo';
import ResetForm from '../components/form/reset';
import { Container, Wrapper, StyledLink, Box, Section } from '../components/elements';
import { IfAuthRedirectTo } from '../components/auth';
import { ROUTE_DASHBOARD } from '../constants';

const Reset = () => (
    <IfAuthRedirectTo route={ROUTE_DASHBOARD}>
        {() => (
            <Container className='vertical-center'>
                <Wrapper>
                    <Logo className='big' url='/' />
                    <Box className='w-50'>
                        <Section className='pt'>
                            <ResetForm />
                        </Section>
                    </Box>
                    <StyledLink to='/login'>Back</StyledLink>
                </Wrapper>
            </Container>
        )}
    </IfAuthRedirectTo>
);

export default Reset;
