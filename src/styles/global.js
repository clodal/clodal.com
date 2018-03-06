import { injectGlobal } from 'styled-components'

injectGlobal`
  ol, ul {
    list-style: none;
    padding: 0;
  }
  
  blockquote, q {
    quotes: none;
  }
  
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  * {
    box-sizing: border-box;
  }

  img {
    display: block;
  	width: 100%;
  	height: auto;
  }
`;
