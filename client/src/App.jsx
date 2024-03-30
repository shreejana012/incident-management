import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import MainRouter from '../MainRouter';
import theme from '../theme';

const queryClient = new QueryClient()

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer />
            <Router>
                <ThemeProvider theme={theme}>
                    <MainRouter />
                </ThemeProvider>
            </Router>
        </QueryClientProvider>
    );
};

export default App;
