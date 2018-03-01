import React from 'react'
import Link from 'gatsby-link'
import config from '../utils/siteConfig'
import { Menu as SuiMenu, Container } from 'semantic-ui-react'


const Menu = () => {
  return (
    <SuiMenu attached size="huge">
      <Container>
      <SuiMenu.Item link><Link to="/" exact>{config.siteTitle}</Link></SuiMenu.Item>
      <SuiMenu.Menu position="right">
        <SuiMenu.Item link><Link to="/about/">About</Link></SuiMenu.Item>
        <SuiMenu.Item link><Link to="/contact/">Contact</Link></SuiMenu.Item>
      </SuiMenu.Menu>
      </Container>
    </SuiMenu>
  )
}

export default Menu
