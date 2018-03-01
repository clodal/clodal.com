import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import config from '../utils/siteConfig'
import { Menu as SuiMenu, Container } from 'semantic-ui-react'

const MenuLink = styled(SuiMenu.Item)`
  &.link.item {
    padding: 0;
    a {
      padding: 0.92em 1.15em;
    }
  }
`;


const Menu = () => {
  return (
    <SuiMenu attached size="huge">
      <Container>
      <MenuLink link><Link to="/" exact>{config.siteTitle}</Link></MenuLink>
      <SuiMenu.Menu position="right">
        <MenuLink link><Link to="/about/">About</Link></MenuLink>
        <MenuLink link><Link to="/contact/">Contact</Link></MenuLink>
      </SuiMenu.Menu>
      </Container>
    </SuiMenu>
  )
}

export default Menu
