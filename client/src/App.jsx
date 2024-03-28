import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import MainRouter from '../MainRouter';
import theme from '../theme';
//import { hot } from 'react-hot-loader'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <ThemeProvider theme={theme}>
                    <MainRouter />
                </ThemeProvider>
            </Router>
        </QueryClientProvider>            
    );
};

export default App;
