import React, { Fragment, useState, useRef } from 'react';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import PropTypes from 'prop-types';
import { Container, Wrapper, StyledLink } from '../components/elements';
import { IfNotAuthRedirectTo } from '../components/auth';
import { ROUTE_LOGIN } from '../constants';
import fanbaseLogo from '../img/fanbase-logo.svg';
import notificationImg from '../img/notification.svg';

const Header = styled.div`
    width: 75%;
    display: flex;
    justify-content: space-between;
    padding: 15px 0;

    & a {
        display: block;
    }
`;

const Flex = styled.div`
    display: flex;
`;

const Pill = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    background-color: #fff;
    margin: 5px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.32);
    outline: 0;

    &.green {
        background-color: #3affc9;
    }

    &:active {
        box-shadow: none;
    }

    &:active,
    &:focus,
    &::-moz-focus-inner {
        outline: 0;
        border: 0;
    }

    &.small {
        width: 34px;
        height: 34px;
    }
`;

const Intro = styled.div`
    width: 75%;
    padding-bottom: 15px;
`;

const H2 = styled.h2`
    font-size: 32px;
    margin-bottom: 6px;

    &.tl {
        text-align: left;
    }
`;

const H3 = styled.h3`
    font-size: 21px;
    color: #302351;

    &.fw4 {
        font-weight: 400;
    }

    &.mb {
        margin-bottom: 6px;
    }
`;

const H4 = styled.h4`
    font-size: 36px;
    color: #302351;

    &.mv {
        margin: 10px 0;
    }
`;

const P = styled.p`
    color: #302351;
    margin: 15px 0;
    font-weight: ${props => props.bold ? '700' : '400'}

    & .thin {
        font-weight: 300;
    }

    & .em {
        font-weight: 700;
    }
`;

const Span = styled.span`
    &.thin {
        font-weight: 300;
    }

    &.em {
        font-weight: 700;
    }
`;

const Box = styled.div`
    background: #fff;
    width: 75%;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.32);
    border-radius: 6px;
`;

const Section = styled.div`
    padding: 30px;
    border-bottom: 1px solid #f5f5f5;
`;

const Input = styled.input`
    border: 1px solid #312452;
    border-radius: 100px;
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
            <Flex>
                <Input ref={inputRef} onFocus={(e) => {
                    e.target.select();
                }} value={text} readOnly />
                <Button
                    onClick={() => {
                        inputRef.current.focus();
                        copy(text);
                        setTextCopied(true);
                        setTimeout(() => {
                            setTextCopied(false);
                        }, 300);
                    }}
                    disabled={ textCopied }>{textCopied ? 'Copied' : 'Copy'}
                </Button>
            </Flex>
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
                        <a href='/#whatsapp'><img src={require('../img/whatsapp.png')} alt="Share on WhatsApp"/></a>
                    </li>
                    <li>
                        <a href='/#facebook'><img src={require('../img/facebook.png')} alt="Share on Facebook"/></a>
                    </li>
                    <li>
                        <a href='/#twitter'><img src={require('../img/twitter.png')} alt="Share on Twitter"/></a>
                    </li>
                    <li>
                        <a href='/#linkedin'><img src={require('../img/linkedin.png')} alt="Share on Linkedin"/></a>
                    </li>
                    <li>
                        <a href='/#email'><img src={require('../img/email.png')} alt="Share via Email"/></a>
                    </li>
                </ul>
            </div>
        );
    }
)`
    display: flex;
    justify-content: space-between;
    padding-top: 25px;

    & ul {
        list-style-type: none;
        display: flex;
        flex-wrap: wrap;
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
                    <Header>
                        <a href="/"><img src={fanbaseLogo} alt="Fanbase"/></a>
                        <Flex>
                            <Pill className='green'>EG</Pill>
                            <Pill><img src={notificationImg} alt="Notifications"/></Pill>
                        </Flex>
                    </Header>
                    <Intro>
                        <H2>Welcome Edi</H2>
                        <H3 className='fw4'>Fanbase helps fans support their favorite artists and get rewarded for their passion.</H3>
                    </Intro>
                    <Box>
                        <Section>
                            <H3>Current tasks</H3>
                            <P>Invite people you know to secure an additional <span className='thin'>PHT</span> <span className='em'>2500</span></P>
                            <CopyToClipboard initialText='https://fanbase.live/invite/abd1239813' />
                            <SocialShare />
                        </Section>
                        <Section>
                            <H3>Current balance</H3>
                            <H4 className='mv'><Span className='thin'>PHT</Span> 500</H4>
                            <P>Out of your possible <span className='thin'>PHT</span> <span className='em'>3,000</span></P>
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
