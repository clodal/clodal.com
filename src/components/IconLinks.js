import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  & {
    ${ props => props.textAlign && `text-align: ${props.textAlign};` }
  }
  a {
    color: inherit;
    &:hover {
      color: ${props => props.theme.colors.highlight};
    }
  }
`;

const IconLinks = ({ children, textAlign }) => (
  <Wrapper textAlign={textAlign}>
    {children}
  </Wrapper>
);

export default IconLinks;