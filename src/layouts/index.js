import React from 'react'
import Helmet from 'react-helmet'
import styled, {ThemeProvider} from 'styled-components'
import config from '../utils/siteConfig'
import theme from '../styles/theme'
import Menu from '../components/menu'
import Footer from '../components/footer'
import favicon from '../images/favicon.ico'
import '../styles/global'
import '../../semantic/dist/semantic.css'


const Site = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Template = ({ children }) => {

    return (
      <div style={{ height: '100%' }}>

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
          <Site>
            <Menu/>
            {children()}
            <Footer/>
          </Site>
        </ThemeProvider>

      </div>
    )
}

export default Template
