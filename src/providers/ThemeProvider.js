import React from 'react';
import { 
    createMuiTheme,
    responsiveFontSizes,
    withStyles,
    ThemeProvider as MuiThemeProvider
} from '@material-ui/core/styles';

const theme = responsiveFontSizes(createMuiTheme({
    palette: {
        primary: {
            main: '#004d40' 
        },
        secondary: {
            main: '#ff6f00'
        }
    }
}));

// overriding the table header colors was inconsistent
// so i'm just using the !important designation and being done with it
const GlobalCss = withStyles({
    '@global': {
        '.MuiTableSortLabel-root': {
            '&:hover,&:focus': { color: 'white !important' },
            color: 'white !important'
        },
        '.MuiTableSortLabel-root.MuiTableSortLabel-active': {
            color: 'white !important',
            textDecoration: 'underline !important'
        },
        '.MuiTableSortLabel-root.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active .MuiTableSortLabel-icon': {
            color: 'white !important'
        }
    }
})(() => null);

const ThemeProvider = ({ children }) => {
    return (
        <MuiThemeProvider theme={theme}>
            <GlobalCss />
            {children}
        </MuiThemeProvider>
    );
};

export default ThemeProvider;