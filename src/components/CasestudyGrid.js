import React from 'react';
import styled from 'styled-components'
import {Card, Grid, Menu, Container, Icon } from 'semantic-ui-react'
import Link from "gatsby-link"
import Img from 'gatsby-image'
import Tags from '../components/tags'


const CardLink = styled(Link)`
  &:hover .card {
    position: relative;
    top: -1px;
  }
`;

const PortfolioMenu = styled(Menu)`
  &.ui.menu {
    margin-top: .3em;
    margin-bottom: 2em;
    .container {
      justify-content: center;
    }
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

const CasestudyCard = ({ casestudy, expand }) => {
  const {
    heroImage,
    title,
    slug,
    abstract,
    publishDate,
    tags,
  } = casestudy;

  const formatDate = date => {
    const objDate = new Date(date);
    return objDate.toLocaleString('en', { month: 'short'  }) + ' ' +  objDate.toLocaleString('en', { year: 'numeric' });
  }

  return (
    <div>
      <CardLink to={`/portfolio/${slug}/`}>
        <Card raised fluid>
          <Img sizes={heroImage.sizes} backgroundColor={'#EEE'} />
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

class CasestudyGrid extends React.Component {
  state = {
    fullView: true,
  }

  componentWillMount() {
    const { fullView } = this.props;
    if (typeof fullView != 'undefined') {
      this.setState({ fullView });
    }
  }

  handleViewToggle = () => this.setState({fullView: !this.state.fullView});

  render() {
    const { fullView } = this.state;
    const { casestudies } = this.props;
    return (
      <div>
        <PortfolioMenu secondary icon size="huge">
          <Container>
            <Menu.Menu>
              <Menu.Item name="Show/Hide Info" onClick={this.handleViewToggle}>
                <Icon name="block layout"/>
                &nbsp;&nbsp;
                {fullView ? 'Hide' : 'View'} info
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </PortfolioMenu>
        <Grid stackable columns={3}>
          <Grid.Row>
            {casestudies.map(({node: casestudy}) => (
              <Grid.Column key={casestudy.id}>
                <CasestudyCard casestudy={casestudy} expand={fullView}/>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export const CasestudyNodeFragment = graphql`
    fragment CasestudyNodeFragment on ContentfulCasestudy {
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
`;


export default CasestudyGrid;