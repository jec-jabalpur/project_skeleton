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

app.use('/', userRoutes);
app.use('/', authRoutes);

app.get('/', (req, res) => {
    res.status(200).send(Template());
});

export default app;

