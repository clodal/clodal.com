import React from 'react'
import Helmet from 'react-helmet'
import styled, {ThemeProvider} from 'styled-components'
import { SiteNav } from '@onextech/react-semantic-booster'
import config from '../utils/siteConfig'
import theme from '../styles/theme'
import Footer from '../components/footer'
import favicon from '../images/favicon.ico'
import '../styles/global'
import '../../semantic/dist/semantic.css'


const FlexWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const FlexContent = styled.div`
  flex: 1;
`;

export const menu = [ // eslint-disable-line import/prefer-default-export
  {
    position: 'left',
    content: [
      { name: 'Home', to: '/' },
    ],
  },
  {
    position: 'right',
    content: [
      { name: 'About', to: '/about' },
      { name: 'Portfolio', to: '/portfolio' },
      { name: 'Blog', to: '/blog' },
      { name: 'Contact', to: '/contact', button: { primary: true, circular: true } },
    ],
  },
];

export const menuProps = {
  pointing: true,
  secondary: true,
  container: true,
  spacer: 2,
};

const Template = ({ children }) => {

    return (
      <div>

        <Helmet>
          <title>{config.siteTitle}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
          <link rel="icon" href={favicon} />
          <meta name="description" content={config.siteDescription}/>
          <meta property="og:title" content={config.siteTitle} />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={config.siteTitle} />
          <meta property="og:url" content={config.siteUrl + config.pathPrefix}/>
        </Helmet>

        <ThemeProvider theme={theme}>
          <SiteNav menu={menu} menuProps={menuProps}>
            <FlexWrapper>
              <FlexContent>
                {children()}
              </FlexContent>
              <Footer/>
            </FlexWrapper>
          </SiteNav>
        </ThemeProvider>

      </div>
    )
}

export default Template
