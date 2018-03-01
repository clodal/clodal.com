import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import styled from 'styled-components'
import config from '../utils/siteConfig'
import { Header, Container, Button } from 'semantic-ui-react'
import { Block } from '@onextech/react-semantic-booster'


const Index = ({data}) =>  {

  const Wrapper = styled(Container)`
    flex: 1;
    height: 100%;
    padding: 3em 0;
    margin: 0 auto;
  `;

  const List = styled.ul`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin: 3em auto;
    &:after {
      content: "";
      @media screen and (min-width: ${props => props.theme.responsive.small}) {
        flex: 0 0 49%;
      }
      @media screen and (min-width: ${props => props.theme.responsive.medium}) {
        flex: 0 0 32%;
      }
    }
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
      margin-bottom: 1em;
    }
  `;

  const posts = data.allContentfulPost.edges;

  return (
    <div>
      <Block>
        <Container>
          <Header sub as="h1">{config.siteTitle}</Header>
          <Title as="h2">{config.siteBio}</Title>
        </Container>
      </Block>
      <Wrapper text>
        {posts && (
          <List>
            {posts.map(({ node: post, index }) => (
              <div key={post.id}>
                <Header as='h3'><PostHeaderLink to={`/posts/${post.slug}/`}>{post.title}</PostHeaderLink></Header>
                <p>{post.body.childMarkdownRemark.html.substr(3, 255)} ...</p>
                <Button><PostLink to={`/posts/${post.slug}/`}>Read More</PostLink></Button>
              </div>
            ))}
          </List>
        )}
      </Wrapper>
    </div>
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
