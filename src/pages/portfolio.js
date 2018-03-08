import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { Container } from 'semantic-ui-react'
import { Block } from '@onextech/react-semantic-booster'
import config from '../utils/siteConfig'
import PortfolioGrid from '../components/PortfolioGrid';


const Wrapper = styled.div`
  flex: 1;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 3.06em;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0;
`;

const Portfolio = ({ data }) => {
  const casestudies = data.allContentfulCasestudy.edges;
  return (
    <Wrapper>
      <Helmet>
        <title>{`Portfolio - ${config.siteTitle}`}</title>
        <meta property="og:title" content={`Portfolio - ${config.siteTitle}`} />
        <meta property="og:url" content={`${config.siteUrl}/portfolio/`} />
      </Helmet>

      <Block spacer={{ top: 0.7, bottom: 1 }}>
        <Title>Portfolio</Title>

        <Container>
          {casestudies && <PortfolioGrid casestudies={casestudies} />}
        </Container>
      </Block>
    </Wrapper>
  )
}

export const query = graphql`
    query portfolioQuery {
        allContentfulCasestudy(limit: 1000, sort: {fields: [publishDate], order: DESC}) {
            edges {
                node {
                    ...CasestudyNodeFragment
                }
            }
        }
    }
`

export default Portfolio
