import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';

import './index.css'
import { AuthProvider } from 'src/contexts/AuthContext';

ReactDOM.render(
    <HelmetProvider>
        <AuthProvider>
            <SidebarProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </SidebarProvider>
        </AuthProvider>
    </HelmetProvider>,
    document.getElementById('root')
);

serviceWorker.unregister();
