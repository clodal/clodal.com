import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import styled from 'styled-components'
import config from '../utils/siteConfig'
import { Header, Container } from 'semantic-ui-react';

const Index = ({data}) =>  {

  const Wrapper = styled.section`
    padding: 2em 1.5em;
    margin: 0 auto;
    max-width: ${props => props.theme.sizes.maxWidth};
  `;

  const List = styled.ul`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin: 0 auto;
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

  const Card = styled.li`
    border: 1px solid ${props => props.theme.colors.secondary};
    border-radius: 2px;
    margin: 0 0 1em 0;
    width: 100%;
    @media screen and (min-width: ${props => props.theme.responsive.small}) {
      flex: 0 0 49%;
    }
    @media screen and (min-width: ${props => props.theme.responsive.medium}) {
      flex: 0 0 32%;
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

  const posts = data.allContentfulPost.edges;

  return (
    <div>

      <Wrapper>

        <Container>

          <Header as="h1" size="huge">{config.siteTitle}</Header>

          {posts && (
            <List>
              {posts.map(({ node: post, index }) => (
                <Card key={post.id}>
                  <PostLink to={`/posts/${post.slug}/`}>
                    <Img sizes={post.heroImage.sizes} backgroundColor={'#EEEEEE'} />
                    <h3>{post.title}</h3>
                  </PostLink>
                </Card>
              ))}
            </List>
          )}

        </Container>

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
