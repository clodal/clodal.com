import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import config from '../utils/siteConfig'
import { Menu as SuiMenu, Container } from 'semantic-ui-react'

const StyledMenu = styled(SuiMenu)`
  &.ui.menu .item.link {
    padding: 0;
    a {
      padding: 0.92em 1.15em;
    }
  }
`;

const Menu = () => {
  return (
    <StyledMenu attached size="huge">
      <Container>
      <SuiMenu.Item link><Link to="/" exact>{config.siteTitle}</Link></SuiMenu.Item>
      <SuiMenu.Menu position="right">
        <SuiMenu.Item link><Link to="/portfolio/">Portfolio</Link></SuiMenu.Item>
        <SuiMenu.Item link><Link to="/about/">About</Link></SuiMenu.Item>
        <SuiMenu.Item link><Link to="/contact/">Contact</Link></SuiMenu.Item>
      </SuiMenu.Menu>
      </Container>
    </StyledMenu>
  )
}

export default Menu
