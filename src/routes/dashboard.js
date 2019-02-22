import React from 'react';
import { Container, Wrapper, Title, Paragraph, StyledLink } from '../components/elements';
import { IfNotAuthRedirectTo } from '../components/auth';
import { ROUTE_LOGIN } from '../constants';

const Dashboard = () => (
    <IfNotAuthRedirectTo route={ROUTE_LOGIN}>
        {({ clearStorage }) => (
            <Container>
                <Wrapper>
                    <Title>Dashboard</Title>
                    <Paragraph>Welcome user</Paragraph>
                    <StyledLink onClick={(e) => {
                        e.preventDefault();
                        clearStorage();
                    }} to='/logout'>Logout
                    </StyledLink>
                </Wrapper>
            </Container>
        )}
    </IfNotAuthRedirectTo>
);

export default Dashboard;
