import React from 'react';
import PropTypes from 'prop-types'
import { Block, Grid } from '@onextech/react-semantic-booster';
import PrevNextCard from './PrevNextCard'


const PrevNextCards = ({ index, parentSlug, cardType }) => {
  const prevNextCardProps = {
    parentSlug,
    cardType,
  }

  return (
    <div>
      {index.previous && !index.next && <PrevNextCard data={index.previous} direction="previous" {...prevNextCardProps} />}
      {index.next && !index.previous && <PrevNextCard data={index.next} direction="next" {...prevNextCardProps} />}
      {
        index.previous && index.next &&
        <Block spacer={0}>
          <Grid columns="equal" stackable fluid attached>
            <Grid.Row>
              <Grid.Column><PrevNextCard data={index.previous} direction="previous" {...prevNextCardProps} /></Grid.Column>
              <Grid.Column><PrevNextCard data={index.next} direction="next" {...prevNextCardProps} /></Grid.Column>
            </Grid.Row>
          </Grid>
        </Block>
      }
    </div>
  )
};

PrevNextCards.propTypes = {
  index: PropTypes.object.isRequired,
  parentSlug: PropTypes.string.isRequired,
  cardType: PropTypes.string.isRequired,
};

export default PrevNextCards;
