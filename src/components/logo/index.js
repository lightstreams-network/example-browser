import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Logo = styled(
    ({ className, url }) => (
        <Link className={className} to={url}>
            <img src={require('../../img/fanbase-logo.svg')} alt='Fanbase'/>
        </Link>
    )
)`
    &.big {
        width: 80px;
        height: 80px;
        margin-bottom: 40px;
    }

    & img {
        width: 100%;
    }
`;

Logo.propTypes = {
    url: PropTypes.string
};

Logo.defaultProps = {
    url: '/'
};

export default Logo;