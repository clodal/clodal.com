import React from 'react';
import PropTypes from 'prop-types';
import { navigateTo } from 'gatsby-link'
import { PhotoCard } from '@onextech/react-semantic-booster'


const PrevNextCard = ({ data, direction, parentSlug, cardType }) => {
  /**
   * @link https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
   * @param {string} str
   * @return {string}
   */
  const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <PhotoCard
      onClick={() => navigateTo(`/${parentSlug}/${data.slug}/`)}
      animated="scale"
      content={{
        header: data.title,
        subheader: capitalizeFirstLetter(direction) + ' ' + cardType,
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
  cardType: PropTypes.string.isRequired,
};

export default PrevNextCard;
