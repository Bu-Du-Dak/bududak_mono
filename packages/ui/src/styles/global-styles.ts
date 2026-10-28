import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; };
  html, body { height: 100%; }
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
  };
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  };
  ol, ul {
    list-style: none;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  button, input, textarea {
    font: inherit;
    color: inherit;
    background: none;
    border: none;
  }
  button {
    cursor: pointer;
  }
  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    transition: background .5s ease, color .5s ease;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.sizes.md};
    font-weight: ${({ theme }) => theme.typography.weights.regular};
  }
  html { font-size: 62.5%; } 

  pre {
    margin: 1.25rem 0;
    padding: 1.6rem;
    border-radius: 1.2rem;
    overflow-x: auto;
    line-height: 1.6;

  box-shadow:
    0 1rem 2.5rem rgba(0, 0, 0, 0.18),
    0 .2rem .8rem rgba(0, 0, 0, 0.12);
  border: .1rem solid rgba(255, 255, 255, 0.08);
  }

  pre code {
    font-size: 1.6rem;
    white-space: pre;
  }
  
  ::selection{
    background: rgba(97, 217, 253, 0.77);
  }
`;
