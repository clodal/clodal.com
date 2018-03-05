import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import config from '../utils/siteConfig'
import { Icon, Header, Container, Button } from 'semantic-ui-react'
import { Block } from '@onextech/react-semantic-booster'


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

const Index = ({ data }) =>  {
  const posts = data.allContentfulPost.edges;
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
      <Block>
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
    </Wrapper>
  )
}

export const query = graphql`
  query indexQuery {
    allContentfulPost(limit: 1000, sort: {fields: [publishDate], order: DESC}) {
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
  }
`

export default Index
