import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const TextAlignCenter = styled.div`
    text-align: center;
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    font-family: 'Open Sans', sans-serif;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 1200px;
    height: 40%;
`;

export const Title = styled.h1`
    color: black;
    font-size: 2.5rem;
    font-weight: 700;
    margin: 20px 0;
`;

export const Paragraph = styled.p`
    color: black;
    font-size: 1rem;
`;

export const StyledLink = styled(Link)`
    color: #00a8e8;
`;

export const Input = styled.input`
    border: 1px solid #efefef;
    padding: 20px;
`;

export const Button = styled.button`
    background: #45ba82;
    padding: 15px 30px;
    border-radius: 5px;
    border-right: 2px solid #2e7c56;
    border-bottom: 2px solid #2e7c56;
    text-align: center;
    font-weight: 700;
    color: #fff;
    cursor: pointer;

    &:active {
        border-right: 2px solid transparent;
        border-bottom: 2px solid transparent;
    }
`;