import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { Container } from 'semantic-ui-react'
import { Block } from '@onextech/react-semantic-booster'
import config from '../utils/siteConfig'
import PostList from '../components/PostList';


const Wrapper = styled.div`
  flex: 1;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 3.06em;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1em;
`;

const Blog = ({ data }) => {
  const posts = data.allContentfulPost.edges;
  return (
    <Wrapper>
      <Helmet>
        <title>{`Blog - ${config.siteTitle}`}</title>
        <meta property="og:title" content={`Blog - ${config.siteTitle}`} />
        <meta property="og:url" content={`${config.siteUrl}/portfolio/`} />
      </Helmet>
      <Block spacer={{ top: 0.7, bottom: 1 }}>
        <Title>Blog</Title>
        <Container text>
          {posts && <PostList posts={posts} />}
        </Container>
      </Block>
    </Wrapper>
  )
}

export const query = graphql`
    query blogQuery {
        allContentfulPost(limit: 1000, sort: {fields: [publishDate], order: DESC}) {
            edges {
                node {
                    ...PostNodeFragment
                }
            }
        }
    }
`

export default Blog
