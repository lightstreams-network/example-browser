import React from 'react';
import { Container, Wrapper, Title, Paragraph, StyledLink } from '../components/elements';

const Home = () => (
    <Container>
        <Wrapper>
            <Title>
                <span role='img' aria-label='Fanbase'>📢 </span>
                <span>Fanbase</span>
                <span role='img' aria-label='Fanbase'> 📢</span>
            </Title>
            <StyledLink to='/login'>Login</StyledLink>
            <StyledLink to='/register'>Request an invite</StyledLink>
            <Paragraph>Fanbase helps artists and fans get rewarded for their passion.</Paragraph>
        </Wrapper>
    </Container>
);

export default Home;
