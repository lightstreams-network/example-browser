import React from 'react';
import { Container, Wrapper, Title, Paragraph } from '../components/elements';
import { IfNotAuthRedirectTo } from '../components/auth';
import { ROUTE_LOGIN } from '../constants';

const Dashboard = () => (
    <IfNotAuthRedirectTo route={ROUTE_LOGIN}>
        <Container>
            <Wrapper>
                <Title>Dashboard</Title>
                <Paragraph>Welcome user</Paragraph>
            </Wrapper>
        </Container>
    </IfNotAuthRedirectTo>
);

export default Dashboard;
