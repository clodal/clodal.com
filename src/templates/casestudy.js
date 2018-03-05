import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import find from "lodash.find"
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Grid, Container, Button } from 'semantic-ui-react'
import { Block } from '@onextech/react-semantic-booster';
import config from '../utils/siteConfig'
import Tags from '../components/tags'
import Body from '../components/body'
import Hero from '../components/hero'


const PostContainer = styled(Container)`
  padding: 3em 0;
`;

const HeaderContainer = styled(Container)`
  font-size: 1.15em;
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

const Title = styled.h1`
  font-size: 2.66em;
  margin-bottom: 0;
`;

const HeaderContent = styled.div`
  margin: 1.5em auto;
`;

const Abstract = styled.p`
  font-size: 1.26em;
  line-height: 1.5;
  opacity: 0.67;
`;

const MinimalButton = styled(Button)`
  &.ui.button {
    opacity: 0.67;
    &:hover {
      opacity: 1;
    }
  }
`;

class CasestudyGallery extends React.Component {
  state = { expand: false }

  handleGalleryView = () => this.setState({ expand: !this.state.expand })

  renderViewButton = () => {
    const { expand } = this.state;
    return <MinimalButton
      size="mini"
      basic
      inverted
      onClick={this.handleGalleryView}>{expand ? 'Collapse' : 'Expand'} Gallery</MinimalButton>
  }

  renderDefaultView = () => {
    const { data } = this.props;
    return (
      <Block inverted spacer={{ top: 0, bottom: 1 }}>
        <Grid container stackable columns={3}>
          <Grid.Row>
            {
              data &&
              data.map(img => (
                <Grid.Column key={img.id}><Img sizes={img.sizes} /></Grid.Column>
              ))
            }
          </Grid.Row>
        </Grid>
      </Block>
    )
  }

  renderExpandedView = () => {
    const { data } = this.props;
    return (
      <div>
        {
          data &&
          data.map(img => (
            <Block key={img.id} inverted spacer={{ top: 0, bottom: 1 }}>
              <Container>
                <Img sizes={img.sizes} />
              </Container>
            </Block>
          ))
        }
      </div>
    )
  }

  render() {
    const { expand } = this.state;
    return (
      <div>
        <Block inverted textAlign="center" spacer={{ top: 1, bottom: 0.5 }}>
          {this.renderViewButton()}
        </Block>
        {expand ? this.renderExpandedView() : this.renderDefaultView() }
      </div>
    )

  }
}

const CasestudyTemplate = ({ data }) => {
  const {
    title,
    id,
    slug,
    heroImage,
    gallery,
    abstract,
    body,
    publishDate,
    tags,
  } = data.contentfulCasestudy;

  const postIndex = find(
    data.allContentfulCasestudy.edges,
    ({ node: post }) => post.id === id
  );

  return(
    <div>

      <Helmet>
        <title>{`${title} - ${config.siteTitle}`}</title>
        <meta property="og:title" content={`${title} - ${config.siteTitle}`} />
        <meta property="og:url" content={`${config.siteUrl + config.pathPrefix}/portfolio/${slug}/`} />
        <meta property="og:image" content={heroImage.sizes.src} />
      </Helmet>

      <Block textAlign="center">
        <Title>{title}</Title>
        <HeaderContainer text>
          <Tags items={tags} />
          <HeaderContent>
            <Abstract>{abstract.abstract}</Abstract>
          </HeaderContent>
        </HeaderContainer>
      </Block>

      <Hero image={heroImage.sizes} />

      {gallery && <CasestudyGallery data={gallery} />}

      <PostContainer text>
        <Body dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.html }} />
      </PostContainer>

      <PostNavigation >
        {postIndex.previous && (<PreviousLink to={`/portfolio/${postIndex.previous.slug}/`}>Prev Casestudy</PreviousLink>)}
        {postIndex.next && (<NextLink to={`/portfolio/${postIndex.next.slug}/`}>Next Casestudy</NextLink>)}
      </PostNavigation>

    </div>
  )
}

export const query = graphql`
    query casestudyQuery($slug: String!) {
        contentfulCasestudy(slug: {eq: $slug}) {
            title
            id
            slug
            heroImage {
                title
                sizes(maxWidth: 1800) {
                    ...GatsbyContentfulSizes_noBase64
                }
            }
            gallery {
                id
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
        allContentfulCasestudy(limit: 1000, sort: { fields: [publishDate], order: DESC })  {
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

export default CasestudyTemplate
