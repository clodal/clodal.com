import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import IconLinks from './IconLinks';
import config from "../utils/siteConfig"


const SocialIconLinks = ({ size, textAlign }) => {
  return (
    <IconLinks textAlign={textAlign}>
      <a href={`//github.com/${config.githubHandle}`} target="_blank"><Icon size={size} name="github" /></a>
      <a href={`//twitter.com/${config.twitterHandle}`} target="_blank"><Icon size={size} name="twitter" /></a>
      <a href={`//linkedin.com/in/${config.linkedinHandle}`} target="_blank"><Icon size={size} name="linkedin" /></a>
    </IconLinks>
  );
}

SocialIconLinks.propTypes = {
  size: PropTypes.string,
};

SocialIconLinks.defaultProps = {
  size: 'large'
};

export default SocialIconLinks;