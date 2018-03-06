import React from 'react'
import styled from 'styled-components'
import { Container, Grid, Header, List } from 'semantic-ui-react'
import { Block } from '@onextech/react-semantic-booster'
import SocialIconLinks from './SocialIconLinks'
import config from '../utils/siteConfig'


const Wordmark = styled.img`
  opacity: 0;
  max-width: 100px;
`

const FooterAbout = styled.div`
  .ui.header {
    margin-bottom: 0;
  }
  opacity: 0.5;
`;

const Footer = () => (
    <Block inverted vertical spacer={.3}>
      <Container>
        <Grid inverted stackable>
          <Grid.Row>
            <Grid.Column width={5}>
              <FooterAbout>
                <Header as='h4' inverted>{config.siteTitle}</Header>
                <p>{config.siteDescription}</p>
              </FooterAbout>
            </Grid.Column>
            <Grid.Column width={6} verticalAlign="middle" textAlign="center">
              <List link inverted>
                <List.Item as="a" href="https://www.contentful.com/" rel="nofollow" target="_blank">
                  <Wordmark src="https://images.contentful.com/fo9twyrwpveg/7F5pMEOhJ6Y2WukCa2cYws/398e290725ef2d3b3f0f5a73ae8401d6/PoweredByContentful_DarkBackground.svg" alt="Powered by Contentful" />
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={5} floated="right" verticalAlign="middle">
              <SocialIconLinks textAlign="right" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Block>
)

export default Footer
