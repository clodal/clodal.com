import React from 'react'
import Img from 'gatsby-image'
import find from "lodash.find"
import Helmet from 'react-helmet'
import styled, { injectGlobal } from 'styled-components'
import { Grid, Container, Button, Modal } from 'semantic-ui-react'
import { Block, MediaCss } from '@onextech/react-semantic-booster'
import config from '../utils/siteConfig'
import Tags from '../components/tags'
import Body from '../components/body'
import PrevNextCards from '../components/PrevNextCards'


const lightboxClassName = 'lightbox'
injectGlobal`
  .ui.page.modals.dimmer.transition.visible.active {
    display: flex !important;
  }
  .${lightboxClassName}.ui.modal.transition.visible.active {
    margin-top: 0 !important;
  }
  .${lightboxClassName}.ui.scrolling.modal.transition.visible.active {
    margin-top: 63px !important;
  }
`;

const PostContainer = styled(Container)`
  padding: 3em 0;
`;

const HeaderContainer = styled(Container)`
  font-size: 1.15em;
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
    display: none;
    ${MediaCss.min.sm`display: initial;`}
    
    opacity: 0.67;
    &:hover {
      opacity: 1;
    }
  }
`;

const ImgZoomer = styled.div`
  cursor: zoom-in;
  margin-bottom: 2em;
  overflow: hidden;
  ${MediaCss.min.sm`max-height: 250px;`}
`;

class CasestudyGallery extends React.Component {
  state = {
    expand: false,
    zoom: false,
    zoomImg: '',
  }

  handleGalleryView = () => this.setState({ expand: !this.state.expand })

  handleOpenImgZoom = (img) => this.setState({ zoom: true, zoomImg: img })

  handleCloseImgZoom = () => this.setState({ zoom: false, zoomImg: '' })

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
    const { zoom, zoomImg } = this.state;
    const Lightbox = ({ img }) => {
      return (
        <Modal
          className={lightboxClassName}
          onUnmount={this.handleCloseImgZoom}
          defaultOpen
          closeIcon>
          <div style={{ width: '100%' }}>
            <Img sizes={img.sizes} />
          </div>
        </Modal>
      )
    }
    return (
      <Block inverted spacer={{ top: 0, bottom: 1 }}>
        {zoom && zoomImg && <Lightbox img={zoomImg} />}
        <Grid container stackable columns={3}>
          <Grid.Row>
            {
              data &&
              data.map(img => (
                <Grid.Column key={img.id}>
                  <ImgZoomer onClick={() => this.handleOpenImgZoom(img)}>
                    <Img sizes={img.sizes} />
                  </ImgZoomer>
                </Grid.Column>
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

  const casestudyIndex = find(
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

      {gallery && <CasestudyGallery data={gallery} />}

      <Block attached>
        <PostContainer text>
          <Body dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.html }} />
        </PostContainer>
      </Block>

      <PrevNextCards index={casestudyIndex} parentSlug="portfolio" cardType="Project" />

    </div>
  )
}

export const casestudyIndexNavigationFragment = graphql`
  fragment CasestudyIndexNavigationFragment on ContentfulCasestudy {
      id
      title
      slug
      heroImage {
          title
          sizes(maxWidth: 1800) {
              ...GatsbyContentfulSizes_noBase64
          }
      }
  }
`;

export const query = graphql`
    query casestudyQuery($slug: String!) {
        contentfulCasestudy(slug: {eq: $slug}) {
            id
            title
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
                    ...CasestudyIndexNavigationFragment
                }
                next {
                    ...CasestudyIndexNavigationFragment
                }
            }
        }
    }
`

export default CasestudyTemplate
