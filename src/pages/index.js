import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import config from '../utils/siteConfig'
import { Icon, Header, Container, Button, Divider } from 'semantic-ui-react'
import { Block } from '@onextech/react-semantic-booster'
import CasestudyGrid from '../components/CasestudyGrid'


const Wrapper = styled.div`
  flex: 1;
  height: 100%;
`;

const PostLink = styled(Link)`
    display: flex;
    flex-flow: column;
    height: 100%;
    flex: 0 1 100%;
    color: ${props => props.theme.colors.base};
    text-decoration: none;

    div {
      flex-grow: 1;
      width: 100%;
      height: 100%;
    }

    h3 {
      font-weight: 600;
      text-transform: capitalize;
      text-align: center;
      margin: 1em 0;
    }
  `;

const SectionHeader = styled(Header)`
  &.ui.header {
    font-size: 1.6em;
  }
`;

const SectionLead = styled.p`
  font-size: 1.25em;
`;

const PostHeaderLink = styled(Link)`
    color: ${props => props.theme.colors.base};
    font-size: 1.433em; 
  `;

const Title = styled(Header)`
    &.ui.header {
      font-size: 2.6em;
      margin-bottom: 0.1em;
    }
  `;

const Subtitle = styled.p`
    font-size: 1.26em;
  `;

const PostList = styled.ul`
    li {
      margin-bottom: 4.5em;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  `;

const ButtonLink = styled(Button)`
    &.ui.button {
      padding: 0;
      a {
        padding: 0.5em 1.2em;
      }
    }
  `;

const IconLinks = styled.div`
  a {
    color: inherit;
    &:hover {
      color: ${props => props.theme.colors.highlight};
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

const Index = ({ data }) =>  {
  const posts = data.allContentfulPost.edges;
  const casestudies = data.allContentfulCasestudy.edges;

  return (
    <Wrapper>
      <Block spacer={2}>
        <Container text>
          <Header sub as="h1">{config.siteTitle}</Header>
          <Title as="h2">{config.siteBio}</Title>
          <Subtitle>{config.siteBioDesc}</Subtitle>
          <IconLinks>
            <a href={`//github.com/${config.githubHandle}`} target="_blank"><Icon size="large" name="github" /></a>
            <a href={`//twitter.com/${config.twitterHandle}`} target="_blank"><Icon size="large" name="twitter" /></a>
            <a href={`//linkedin.com/in/${config.linkedinHandle}`} target="_blank"><Icon size="large" name="linkedin" /></a>
          </IconLinks>
        </Container>
      </Block>

      <Block textAlign="center">
        <LargeContainer>
          <SectionHeader as="h2">My Work</SectionHeader>
          {casestudies && <CasestudyGrid casestudies={casestudies} fullView={false} />}
          <Divider hidden />
          <ButtonLink basic circular>
            <PaddedLink to={`/portfolio/`}>View more</PaddedLink>
          </ButtonLink>
        </LargeContainer>
      </Block>

      <Block attached>
        <Container text>
          {posts && (
            <PostList>
              {posts.map(({ node: post, index }) => (
                <li key={post.id}>
                  <Header as='h3'><PostHeaderLink to={`/posts/${post.slug}/`}>{post.title}</PostHeaderLink></Header>
                  <p>{post.abstract.abstract.substr(0,50)} ...</p>
                  <ButtonLink><PostLink to={`/posts/${post.slug}/`}>Read More</PostLink></ButtonLink>
                </li>
              ))}
            </PostList>
          )}
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
          <ButtonLink primary size="large" circular>
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
          title
          id
          slug
          heroImage {
            title
            sizes(maxWidth: 1800) {
              ...GatsbyContentfulSizes_noBase64
            }
          }
          abstract {
            abstract
          }
          body {
            childMarkdownRemark {
              html
            }
          }
          publishDate
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
