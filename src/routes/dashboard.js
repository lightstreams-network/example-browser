import React from 'react';
import PropTypes from 'prop-types';
import { Container, Wrapper, Title, Paragraph, StyledLink } from '../components/elements';
import { IfNotAuthRedirectTo } from '../components/auth';
import { ROUTE_LOGIN } from '../constants';

const Dashboard = ({ clearStorage }) => (
    <IfNotAuthRedirectTo route={ROUTE_LOGIN}>
        <Container>
            <Wrapper>
                <Title>Dashboard</Title>
                <Paragraph>Welcome user</Paragraph>
                <StyledLink onClick={() => clearStorage()}>Logout</StyledLink>
            </Wrapper>
        </Container>
    </IfNotAuthRedirectTo>
);

Dashboard.propTypes = {
    clearStorage: PropTypes.func.isRequired
};

export default Dashboard;
