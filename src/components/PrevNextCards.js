import React from 'react';
import PropTypes from 'prop-types'
import { Grid } from '@onextech/react-semantic-booster';
import PrevNextCard from './PrevNextCard'


const PrevNextCards = ({ index, parentSlug }) => {
  return (
    <div>
      {index.previous && !index.next && <PrevNextCard data={index.previous} direction="previous" parentSlug={parentSlug} />}
      {index.next && !index.previous && <PrevNextCard data={index.next} direction="next" parentSlug={parentSlug} />}
      {
        index.previous && index.next &&
        <Grid stackable columns="equal" fluid>
          <Grid.Row>
            <Grid.Column><PrevNextCard data={index.previous} direction="previous" parentSlug={parentSlug} /></Grid.Column>
            <Grid.Column><PrevNextCard data={index.next} direction="next" parentSlug={parentSlug} /></Grid.Column>
          </Grid.Row>
        </Grid>
      }
    </div>
  )
};

PrevNextCards.propTypes = {
  index: PropTypes.object.isRequired,
  parentSlug: PropTypes.string.isRequired,
};

export default PrevNextCards;