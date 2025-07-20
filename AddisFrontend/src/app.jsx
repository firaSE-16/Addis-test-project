import { ThemeProvider } from '@emotion/react';
import React from 'react';
import GlobalStyles from './styles/global';
import AppRoutes from './routes';

function App(){
    return <ThemeProvider theme={theme}>
                 <GlobalStyles/>
                 <AppRoutes/>
            </ThemeProvider>
}

export default App