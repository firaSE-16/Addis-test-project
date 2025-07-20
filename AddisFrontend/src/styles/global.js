const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        font-family: ${theme.fonts.body};
        line-height: 1.6;
        background-color: ${theme.colors.background};
        color: ${theme.colors.text};
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
