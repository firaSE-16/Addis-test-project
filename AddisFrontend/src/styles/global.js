import React from 'react';
import { Global, css, useTheme } from '@emotion/react';
import { theme as baseTheme } from './theme';

const GlobalStyles = () => {
  // Use theme.mode to determine colors
  const theme = useTheme() || baseTheme;
  const mode = theme.mode || 'dark';
  const colors = mode === 'dark' ? theme.dark : theme.light;

  return (
    <Global
      styles={css`
        html, body, #root {
          width: 100vw;
          min-height: 100vh;
          height: 100%;
          margin: 0;
          padding: 0;
          font-family: ${theme.fonts.body};
          background: ${colors.background};
          color: ${colors.text};
          transition: background 0.3s, color 0.3s;
        }
        * {
          box-sizing: border-box;
        }
        a {
          text-decoration: none;
          color: ${theme.colors.primary};
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
      `}
    />
  );
};

export default GlobalStyles;
