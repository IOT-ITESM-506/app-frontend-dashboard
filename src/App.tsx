import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { useEffect } from 'react';

function App() {
    const content = useRoutes(router);

    useEffect(() => {
        const { pathname } = window.location;
        if (pathname === '/') {
            window.location.href = '/auth/signin';
        }
    },[])

    return (
        <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CssBaseline />
                {content}
            </LocalizationProvider>
        </ThemeProvider>
    );
}
export default App;
