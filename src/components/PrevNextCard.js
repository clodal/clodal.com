import React from 'react';
import PropTypes from 'prop-types';
import { navigateTo } from 'gatsby-link'
import { PhotoCard } from '@onextech/react-semantic-booster'


const PrevNextCard = ({ data, direction, parentSlug }) => {
  return (
    <PhotoCard
      onClick={() => navigateTo(`/${parentSlug}/${data.slug}/`)}
      animated="scale"
      content={{
        header: data.title,
        subheader: direction,
      }}
      cardProps={{ card: data.title }}
      headerProps={{ inverted: true, size: 'large' }}
      imgProps={{ src: data.heroImage.sizes.src }} />
  );
};

PrevNextCard.propTypes = {
  data: PropTypes.object.isRequired,
  direction: PropTypes.string.isRequired,
  parentSlug: PropTypes.string.isRequired,
};

export default PrevNextCard;