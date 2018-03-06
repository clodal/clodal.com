import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import config from '../utils/siteConfig'
import ContactForm from '../components/contactform'
import { Container } from 'semantic-ui-react'


const Wrapper = styled(Container)`
  padding: 3em 0;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.6em;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1em;
`;

const Text = styled.p`
  margin: 0 auto 2em;
  line-height: 1.6;
  a  {
    transition: all .2s;
    color: ${props => props.theme.colors.base};
    &:hover {
      color: ${props => props.theme.colors.highlight};
    }
  }
`;

const Contact = ({data}) => {

  return(
    <div>

      <Helmet>
        <title>{`Contact - ${config.siteTitle}`}</title>
        <meta property="og:title" content={`Contact - ${config.siteTitle}`} />
        <meta property="og:url" content={`${config.siteUrl}/contact/`} />
      </Helmet>

      <Wrapper text>
        <Title>Contact</Title>
        <Text>
          {config.contactDesc}
        </Text>
        <ContactForm/>
      </Wrapper>

    </div>
  )
}

export default Contact
