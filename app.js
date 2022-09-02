
import * as env from 'dotenv';


import express, { json } from 'express';
import { authRouter, lookupeRouter, postRouter } from './modules/allRoutes.js';
import connectDB from './DB/connection.js';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import Middleware from 'i18next-http-middleware';
import { join,dirname } from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

env.config();
const app = express()
const port = process.env.PORT
i18next.use(Backend).use(Middleware.LanguageDetector).init({
    fallbackLng:'en',
    backend:{
        loadPath:"./locals/{{lng}}/translation.json"
    }
  });

app.use(Middleware.handle(i18next))
app.use(json())
app.use('/uploads', express.static(join(__dirname, './uploads')))
app.use(authRouter,lookupeRouter,postRouter)
connectDB()
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))