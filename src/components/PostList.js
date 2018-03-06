import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import Link from "gatsby-link"
import {Button, Header} from 'semantic-ui-react'

const Wrapper = styled.ul`
    li {
      margin-bottom: 4.5em;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  `;

const PostHeaderLink = styled(Link)`
    color: ${props => props.theme.colors.base};
    font-size: 1.433em; 
  `;

const ButtonLink = styled(Button)`
    &.ui.button {
      padding: 0;
      a {
        padding: 0.5em 1.2em;
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

const PostList = ({ posts }) => (
  <Wrapper>
    {posts.map(({ node: post, index }) => (
      <li key={post.id}>
        <Header as='h3'><PostHeaderLink to={`/posts/${post.slug}/`}>{post.title}</PostHeaderLink></Header>
        <p>{post.abstract.abstract.substr(0,50)} ...</p>
        <ButtonLink><PostLink to={`/posts/${post.slug}/`}>Read More</PostLink></ButtonLink>
      </li>
    ))}
  </Wrapper>
);

export const PostNodeFragment = graphql`
    fragment PostNodeFragment on ContentfulPost {
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
`;

export default PostList;