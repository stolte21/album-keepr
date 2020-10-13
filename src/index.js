import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ReduxProvider } from './providers/ReduxProvider';
import ThemeProvider from './providers/ThemeProvider';
import App from './components/App';
import AlbumFormDialog from './components/AlbumFormDialog';

const AppContainer = () => {
    return (
        <ReduxProvider>
            <ThemeProvider>
                <CssBaseline />
                <Router>
                    <App />
                    <AlbumFormDialog />
                </Router>
            </ThemeProvider>
        </ReduxProvider>
    );
};

ReactDOM.render(
    <AppContainer />,
    document.getElementById('root')
);
