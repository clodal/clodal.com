import React from 'react'
import styled from 'styled-components'
import { Segment, Container, Grid, Header, List } from 'semantic-ui-react';
import config from '../utils/siteConfig'

const Wordmark = styled.img`
  max-width: 100px;
  opacity: 0.5;
`

const FooterAbout = styled.div`
  .ui.header {
    margin-bottom: 0;
  }
  opacity: 0.5;
`;

const Footer = () => (
    <Segment inverted vertical style={{ padding: '1em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={10}>
              <FooterAbout>
                <Header as='h4' inverted>{config.siteTitle}</Header>
                <p>{config.siteDescription}</p>
              </FooterAbout>
            </Grid.Column>
            <Grid.Column width={3} floated="right" verticalAlign="middle">
              <List link inverted>
                <List.Item as="a" href="https://www.contentful.com/" rel="nofollow" target="_blank">
                  <Wordmark src="https://images.contentful.com/fo9twyrwpveg/7F5pMEOhJ6Y2WukCa2cYws/398e290725ef2d3b3f0f5a73ae8401d6/PoweredByContentful_DarkBackground.svg" alt="Powered by Contentful" />
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
)

export default Footer
