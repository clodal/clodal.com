import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import config from '../utils/siteConfig'
import { Icon, Header, Container, Button, Divider } from 'semantic-ui-react'
import { Block } from '@onextech/react-semantic-booster'
import PortfolioGrid from '../components/PortfolioGrid'
import PostList from '../components/PostList'
import SocialIconLinks from '../components/SocialIconLinks'


const Wrapper = styled.div`
  flex: 1;
  height: 100%;
`;

const SectionHeader = styled(Header)`
  &.ui.header {
    font-size: 1.6em;
  }
`;

const SectionLead = styled.p`
  font-size: 1.25em;
`;

const Title = styled(Header)`
    &.ui.header {
      font-size: 2.6em;
      margin-bottom: 0.1em;
      margin-top: .25em;
    }
  `;

const Subtitle = styled.p`
    font-size: 1.26em;
    opacity: .46;
  `;

const ButtonLink = styled(Button)`
    &.ui.button {
      padding: 0;
      a {
        padding: 0.5em 1.2em;
      }
    }
  `;

const PaddedLink = styled(Link)`
  display: block;
  color: inherit;
  margin-bottom: 3px;
  &:hover {
    color: inherit;
  }
`;

const LargeContainer = styled(Container)`
  font-size: 1.15rem;
`;

const ViewMoreContainer = styled.div`
  text-align: center;
  margin-top: 2em;
`;

const HeroContainer = styled.div`
  margin-bottom: 2em;
`;

const CaptionTitle = styled(Header)`
  letter-spacing: 1px;
`;

const Index = ({ data }) =>  {
  const posts = data.allContentfulPost.edges;
  const casestudies = data.allContentfulCasestudy.edges;

  return (
    <Wrapper>
      <Block spacer={2} textAlign="center">
        <Container text>
          <HeroContainer>
            <CaptionTitle sub as="h1">{config.siteTitle}</CaptionTitle>
            <Title as="h2">{config.siteBio}</Title>
            <Subtitle>{config.siteBioDesc}</Subtitle>
          </HeroContainer>
          <SocialIconLinks relaxed={true} />
        </Container>
      </Block>

      <Block textAlign="center">
        <LargeContainer>
          <SectionHeader as="h2">My Work</SectionHeader>
          {casestudies && <PortfolioGrid fullView={false} casestudies={casestudies} />}
          <ViewMoreContainer>
            <ButtonLink basic circular>
              <PaddedLink to="/portfolio">View more</PaddedLink>
            </ButtonLink>
          </ViewMoreContainer>
        </LargeContainer>
      </Block>

      <Block attached>
        <Container text>
          {posts && <PostList posts={posts} />}
          <ViewMoreContainer>
            <ButtonLink basic circular>
              <PaddedLink to="/blog">View more</PaddedLink>
            </ButtonLink>
          </ViewMoreContainer>
        </Container>
      </Block>

      <Container text>
        <Divider />
      </Container>

      <Block textAlign="center" spacer={1.5}>
        <Container text>
          <SectionHeader as="h2">I'd love to hear from you</SectionHeader>
          <SectionLead>Got a project to share? Feel free to get in touch.</SectionLead>
          <Divider hidden />
          <ButtonLink primary size="huge" circular>
            <PaddedLink to={`/contact/`}>Message me</PaddedLink>
          </ButtonLink>
        </Container>
      </Block>

    </Wrapper>
  )
}

export const query = graphql`
  query indexQuery {
    allContentfulPost(limit: 3, sort: {fields: [publishDate], order: DESC}) {
      edges {
        node {
          ...PostNodeFragment
        }
      }
    }
    allContentfulCasestudy(limit: 6, sort: {fields: [publishDate], order: DESC}) {
      edges {
        node {
          ...CasestudyNodeFragment
        }
      }
    }
  }
`

export default Index
