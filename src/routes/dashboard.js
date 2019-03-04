import React, { Fragment, useState, useRef } from 'react';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import PropTypes from 'prop-types';
import { Container, Wrapper, StyledLink } from '../components/elements';
import { IfNotAuthRedirectTo } from '../components/auth';
import { ROUTE_LOGIN } from '../constants';

const H3 = styled.h3`
    font-size: 20px;
    font-weight: 700;
    color: #302351;
`;

const H4 = styled.h4`
    font-size: 24px;
    font-weight: 700;
    color: #302351;
`;

const P = styled.p`
    color: #302351;
    margin: 15px 0;
    font-weight: ${props => props.bold ? '700' : '400'}

    & .em {
        font-weight: 700;
    }
`;

const Box = styled.div`
    background: #fff;
    width: 75%;
    box-shadow: 0 0 3px rgba(18, 18, 18, 0.3);
    border-radius: 10px;
`;

const Section = styled.div`
    padding: 40px;
    border-bottom: 1px solid #f5f5f5;
`;

const Input = styled.input`
    border: 1px solid #312452;
    border-radius: 40px;
    padding: 15px 30px;
    width: 75%;
    margin-right: 10px
    font-size: 16px;
`;

const Button = styled.button`
    border: 1px solid #3affc9;
    background-color: #3affc9;
    border-radius: 40px;
    padding: 15px 30px;
    width: 20%;
    font-size: 16px;
    cursor: pointer;

    &:disabled {
        cursor: auto;
    }
`;

const CopyToClipboard = ({ initialText }) => {
    const [text] = useState(initialText);
    const [textCopied, setTextCopied] = useState(false);
    const inputRef = useRef(null);

    return (
        <Fragment>
            <Input ref={inputRef} onFocus={(e) => {
                e.target.select();
            }} value={text} readOnly />
            <Button onClick={() => {
                inputRef.current.focus();
                copy(text);
                setTextCopied(true);
                setTimeout(() => {
                    setTextCopied(false);
                }, 300);
            }} disabled={ textCopied }>{textCopied ? 'Copied' : 'Copy'}</Button>
        </Fragment>
    );
};

CopyToClipboard.propTypes = {
    initialText: PropTypes.string
};

CopyToClipboard.defaultProps = {
    initialText: 'https://fanbase.live/invite/abd1239813'
};

const SocialShare = styled(
    ({ className }) => {
        return (
            <div className={className}>
                <P>Or share with:</P>
                <ul>
                    <li>
                        <a href='/#whatsapp'>WA</a>
                    </li>
                    <li>
                        <a href='/#facebook'>FB</a>
                    </li>
                    <li>
                        <a href='/#twitter'>TW</a>
                    </li>
                    <li>
                        <a href='/#linkedin'>LI</a>
                    </li>
                    <li>
                        <a href='/#email'>EM</a>
                    </li>
                </ul>
            </div>
        );
    }
)`
    display: flex;
    justify-content: space-between;

    & ul {
        list-style-type: none;
        display: flex;
    }

    & li a {
        background-color: #f5f5f5;
        padding: 15px;
        border-radius: 30px;
        display: inline-block;
    }
`;

const ProgressBar = styled(
    ({ className }) => (
        <div className={className} />
    )
)`
    background: #f6f2ef;
    border-radius: 40px;
    height: 40px;
    width: 100%;

    &:after {
        content: '';
        display: block;
        background: #855bf2;
        width: ${props => props.width || '10'}%;
        height: 100%;
        border-radius: 40px 0 0 40px;
    }

`;

const Dashboard = () => (
    <IfNotAuthRedirectTo route={ROUTE_LOGIN}>
        {({ clearStorage }) => (
            <Container>
                <Wrapper>
                    <Box>
                        <Section>
                            <H3>Current tasks</H3>
                            <P>Invite people you know to secure an additional <span>PHT</span> 2500 </P>
                            <CopyToClipboard initialText='https://fanbase.live/invite/abd1239813' />
                            <SocialShare />
                        </Section>
                        <Section>
                            <H3>Current balance</H3>
                            <H4>PHT 500</H4>
                            <P>Out of your possible PHT 3,000</P>
                            <ProgressBar width='15' />
                        </Section>
                        <Section>
                            <P><span className='em'>Your account has not been verified yet</span>. <a href="/#resend">Resend email?</a></P>
                            <P>You will receive PHT 500 following verification</P>
                        </Section>
                    </Box>
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
