import React from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { indigo, pink } from '@material-ui/core/colors';
import MainRouter from './MainRouter';


const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757de8',
            main: '#3f51b5',
            dark: '#002984',
            contrastText: '#fff'
        },
        secondary: {
            light: '#ff79b0', 
            main: '#ff4081',
            dark: '#c60055',
            contrastText: '#000'
        },
        homeTitle: "#efefef",
        backgroundTitle: pink['500'],
        mediaBackground: pink['40'],
        contentBackground: pink['700'],
        type: 'light'
    }
});

const App = () => (
    <BrowserRouter>
        <MuiThemeProvider theme={theme}>
            <MainRouter />
        </MuiThemeProvider>
    </BrowserRouter>
)

export default hot(module) (App);
