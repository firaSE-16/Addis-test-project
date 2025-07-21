import { ThemeProvider } from '@emotion/react';
import React from 'react';
import AppRoutes from './routes';
import { theme } from './styles/theme';
import GlobalStyles from './styles/global';
function App(){
    return <ThemeProvider theme={theme}>
                 <GlobalStyles/>
                 <AppRoutes/>
            </ThemeProvider>
}

export default App