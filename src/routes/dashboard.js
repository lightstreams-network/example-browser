import React from 'react';
import { Container, Wrapper, Title, Paragraph } from '../components/elements';
import { IfNotAuthRedirectToLogin } from '../components/auth';

const Dashboard = () => (
    <IfNotAuthRedirectToLogin>
        <Container>
            <Wrapper>
                <Title>Dashboard</Title>
                <Paragraph>Welcome user</Paragraph>
            </Wrapper>
        </Container>
    </IfNotAuthRedirectToLogin>
);

export default Dashboard;
