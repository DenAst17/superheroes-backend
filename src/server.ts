/* eslint-disable no-console */

import bodyParser from 'body-parser';
import express from 'express';
import 'dotenv/config';
import cors from 'cors'

import expressValidator from 'express-validator';
import AppRouter from './routes';
import { AppDataSource } from './config/database';
import path from 'path';

const app = express();
const router = new AppRouter(app);
// Connect to DB
AppDataSource.initialize()
  .then(() => {
    console.log('DB started!');
  })
  .catch((error) => console.log(error));

// Express configuration
app.set('port', process.env.PORT || 4200);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use("/images", express.static(path.resolve(__dirname, '../images/')));
app.use(cors({
  origin: "http://localhost:3000"
}));

router.init();

const port = app.get('port');

const server = app.listen(port, () => console.log(`Server started on port ${port}`));

export default server;
