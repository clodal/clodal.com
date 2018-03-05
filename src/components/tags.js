import React from 'react'
import styled from 'styled-components'


const Wrapper = styled.ul`
  margin: 0;
`

const Item = styled.li`
  display: inline-block;
  background: ${props => props.theme.colors.secondary};
  padding: .5em;
  border-radius: 2px;
  text-transform: capitalize;
  margin: 0 .5em 0 0;
  }
`

const Tags = ({ items }) => {
  return (
    <Wrapper>
      {items.map((tags, index ) => (
        <Item key={index}>
          {tags}
        </Item>
      ))}
    </Wrapper>
  )
}

export default Tags
