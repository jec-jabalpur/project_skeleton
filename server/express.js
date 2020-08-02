import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from './../template';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import devBundle from './devBundle';
import path from 'path';

// Modules for SSR
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import MainRouter from './../client/MainRouter';
import StaticRouter from 'react-router-dom/StaticRouter';

// Material UI Modules to render Material UI on Server
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { createGenerateClassName } from '@material-ui/core/styles';
import { indigo, pink } from '@material-ui/core/colors';


const app = express();

devBundle.compile(app);

app.use(bodyParser.json());

const CURRENT_WORKING_DIR = process.cwd();
app.use('/dist',
    express.static(
        path.join(CURRENT_WORKING_DIR, 'dist')
    )
);


app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.use(helmet());
app.use(cors());

app.use('/', authRoutes);
app.use('/', userRoutes);


app.get('*', (req, res) => {

    const sheets_registry = new SheetsRegistry();

    const theme = createMuiTheme({
        typography: {
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"'
            ].join(',')
        },
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

    const generate_class_name = createGenerateClassName();
    const context = { };

    const markup = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <JssProvider registry={sheets_registry} generateClassName={generate_class_name}>
                <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
                    <MainRouter />
                </MuiThemeProvider>
            </JssProvider>
        </StaticRouter>
    )

    if (context.url) {
        return res.redirect(303, context.url);
    }

    const css = sheets_registry.toString();
    res.status(200).send(Template({
        markup: markup,
        css: css
    }));
});



export default app;

