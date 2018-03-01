import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import config from '../utils/siteConfig'
import ContactForm from '../components/contactform'
import { Container } from 'semantic-ui-react';


const Wrapper = styled(Container)`
  padding: 3em 0;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.6em;
  font-weight: 600;
  text-align: center;
  margin: 0 0 1em 0;
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
          I am a web developer with almost ten years of experience in creating web applications and services. I can help you design your business infrastructure and your development team management process. I can help you set your testing strategy and build your application's architecture.
          Regarding the stack, I am currently working extensively with Javascript/Node.js and React.js to build robust web applications and services. My I/P/F-aaS of preference is AWS.

          Above all, I am getting things done.

          This site should provide you with all the information you need but if you still have questions, please consult my LinkedIn profile, my GitHub profile or contact me directly. I like receiving email from people.
          I am currently available to hire for a limited time of work per week.

          Email me to talk about your project or just to say hi.
        </Text>
        <ContactForm/>
      </Wrapper>

    </div>
  )
}

export default Contact
