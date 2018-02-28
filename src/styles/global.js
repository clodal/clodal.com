import { injectGlobal } from 'styled-components'

injectGlobal`
  #___gatsby {
    height: 100%;
  }

  ol, ul {
    list-style: none;
    padding: 0;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* Global styles for the website */
  * {
    box-sizing: border-box;
  }

  img {
    display: block;
  	width: 100%;
  	height: auto;
  }
`;
