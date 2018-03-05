import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import Link from "gatsby-link"
import Img from 'gatsby-image'
import { Menu, Grid, Container, Card, Icon } from 'semantic-ui-react'
import { Block } from '@onextech/react-semantic-booster'
import config from '../utils/siteConfig'
import Tags from '../components/tags'


const Wrapper = styled.div`
  flex: 1;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 3.06em;
  font-weight: 600;
  text-align: center;
  margin-bottom: .67em;
`;

const CardLink = styled(Link)`
  &:hover .card {
    position: relative;
    top: -1px;
  }
`;

const CasestudyCard = ({ data, expand }) => {
  const {
    heroImage,
    title,
    slug,
    abstract,
    publishDate,
    tags,
  } = data;

  const formatDate = date => {
    const objDate = new Date(date);
    return objDate.toLocaleString('en', { month: 'short'  }) + ' ' +  objDate.toLocaleString('en', { year: 'numeric' });
  }

  return (
    <div>
      <CardLink to={`/portfolio/${slug}/`}>
        <Card raised fluid>
          <Img imgStyle={{ padding: '9px' }} sizes={heroImage.sizes} backgroundColor={'#EEE'} />
          {
            expand &&
            <Card.Content>
              <Card.Header>
                {title}
              </Card.Header>
              <Card.Meta>
                {formatDate(publishDate)}
              </Card.Meta>
              <Card.Description>
                {abstract.abstract.substr(0,50)}
              </Card.Description>
            </Card.Content>
          }
        </Card>
      </CardLink>
      {expand && <Tags items={tags} />}
    </div>
  )
}

const PortfolioMenu = styled(Menu)`
  &.ui.menu {
    margin-bottom: 3em;
    .item {
      opacity: 0.3;
      &:hover, &:active {
        opacity: 1;
      }
      &:active {
        color: ${props => props.theme.colors.highlight};
      }
    }
  }
`;


class Portfolio extends React.Component {
  state = {
    fullView: false,
  }

  handleViewToggle = () => this.setState({ fullView: !this.state.fullView });

  render() {
    const { fullView } = this.state;
    const { data } = this.props;
    const casestudies = data.allContentfulCasestudy.edges;
    return(
      <Wrapper>
        <Helmet>
          <title>{`Portfolio - ${config.siteTitle}`}</title>
          <meta property="og:title" content={`Portfolio - ${config.siteTitle}`} />
          <meta property="og:url" content={`${config.siteUrl}/portfolio/`} />
        </Helmet>

        <Block spacer={{ top: 0.7, bottom: 1 }}>
          <Title>Portfolio</Title>

          <PortfolioMenu pointing secondary icon size="huge">
            <Container>
              <Menu.Menu position='right'>
                <Menu.Item name="Show/Hide Info" onClick={this.handleViewToggle}>
                  <Icon name="block layout" />
                  &nbsp;&nbsp;
                  {fullView ? 'Hide' : 'View'} info
                </Menu.Item>
              </Menu.Menu>
            </Container>
          </PortfolioMenu>

          <Container>
            {casestudies && (
              <Grid stackable columns={3}>
                <Grid.Row>
                  {casestudies.map(({ node: casestudy }) => (
                    <Grid.Column key={casestudy.id}>
                      <CasestudyCard data={casestudy} expand={fullView} />
                    </Grid.Column>
                  ))}
                </Grid.Row>
              </Grid>
            )}
          </Container>
        </Block>

      </Wrapper>
    )
  }
}

export const query = graphql`
    query portfolioQuery {
        allContentfulCasestudy(limit: 1000, sort: {fields: [publishDate], order: DESC}) {
            edges {
                node {
                    title
                    id
                    slug
                    tags
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

export default Portfolio
