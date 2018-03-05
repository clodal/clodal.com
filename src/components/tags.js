import React from 'react'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react';


const Wrapper = styled.ul`
  margin: 0;
`

const Tags = ({ items }) => {
  return (
    <Wrapper>
      {items.map((item, index ) => (
        <li key={index}>
          <Button basic disabled>{item}</Button>
        </li>
      ))}
    </Wrapper>
  )
}

export default Tags
