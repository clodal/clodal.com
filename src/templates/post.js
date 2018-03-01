import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import find from "lodash.find"
import Helmet from 'react-helmet'
import styled from 'styled-components'
import config from '../utils/siteConfig'
import Hero from '../components/hero'
import Tags from '../components/tags'
import Body from '../components/body'
import { Container } from 'semantic-ui-react';


const Abstract = styled.p`
  font-size: 1.26em;
`;

const PostTemplate = ({data}) => {

  const {
    title,
    id,
    slug,
    heroImage,
    description,
    abstract,
    body,
    author,
    publishDate,
    tags,
  } = data.contentfulPost;

  const postIndex = find(
    data.allContentfulPost.edges,
    ({ node: post }) => post.id === id
  );

  const PostContainer = styled(Container)`
    padding-top: 3em;
    padding-bottom: 3em;
  `;

  const PostNavigation = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 auto;

    a {
      background: ${props => props.theme.colors.base};
      color: white;
      padding: 1em;
      border-radius: 2px;
      text-decoration: none;
      transition: .2s;
      &:hover {
        background: ${props => props.theme.colors.highlight};
      }
    }
  `;

  const PreviousLink = styled(Link)`
    margin-right: auto;
    order: 1;
  `;

  const NextLink = styled(Link)`
    margin-left: auto;
    order: 2;
  `;

  return(
    <div>

    <Helmet>
      <title>{`${title} - ${config.siteTitle}`}</title>
      <meta property="og:title" content={`${title} - ${config.siteTitle}`} />
      <meta property="og:url" content={`${config.siteUrl + config.pathPrefix}/posts/${slug}/`} />
      <meta property="og:image" content={heroImage.sizes.src} />
    </Helmet>

    <Hero title={title} image={heroImage.sizes} height={'50vh'}/>

    <PostContainer text>

      <Abstract>{abstract.abstract}</Abstract>

      <Body dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.html }} />

      {tags && (<Tags items={tags} />)}

      <PostNavigation >
        {postIndex.previous && (<PreviousLink to={`/posts/${postIndex.previous.slug}/`}>Prev Post</PreviousLink>)}
        {postIndex.next && (<NextLink to={`/posts/${postIndex.next.slug}/`}>Next Post</NextLink>)}
      </PostNavigation>

    </PostContainer>

  </div>
  )
}

export const query = graphql`
  query postQuery($slug: String!) {
    contentfulPost(slug: {eq: $slug}) {
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
      tags
    }
    allContentfulPost(limit: 1000, sort: { fields: [publishDate], order: DESC })  {
      edges {
        node {
          id
        }
        previous {
          slug
          title
        }
        next {
          slug
          title
        }
      }
    }
  }
`

export default PostTemplate
