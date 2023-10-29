import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';

import './index.css'
import { AuthProvider } from 'src/contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';

ReactDOM.render(
    <HelmetProvider>
        <AuthProvider>
            <AppProvider>
                <SidebarProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </SidebarProvider>
            </AppProvider>
        </AuthProvider>
    </HelmetProvider>,
    document.getElementById('root')
);

serviceWorker.unregister();
