import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import config from "../utils/siteConfig"
import styled from 'styled-components';


const Wrapper = styled.div`
  & {
    ${ props => props.textAlign && `text-align: ${props.textAlign};` }
  }
  a {
    ${props => props.relaxed && `margin-right: 1em;`}
    &:last-child { margin-right: 0; }
    
    color: inherit;
    &:hover {
      color: ${props => props.theme.colors.highlight};
    }
  }
`;

const SocialIconLinks = ({ size, ...rest }) => {
  return (
    <Wrapper {...rest}>
      <a href={`//github.com/${config.githubHandle}`} target="_blank"><Icon size={size} name="github" /></a>
      <a href={`//twitter.com/${config.twitterHandle}`} target="_blank"><Icon size={size} name="twitter" /></a>
      <a href={`//linkedin.com/in/${config.linkedinHandle}`} target="_blank"><Icon size={size} name="linkedin" /></a>
    </Wrapper>
  );
}

SocialIconLinks.propTypes = {
  size: PropTypes.string,
  relaxed: PropTypes.bool,
};

SocialIconLinks.defaultProps = {
  size: 'large',
  relaxed: false,
};

export default SocialIconLinks;