
import * as env from 'dotenv';
 env.config();
import express, { json } from 'express';
import { authRouter, lookupeRouter, postRouter } from './modules/allRoutes.js';
import connectDB from './DB/connection.js';
const app = express()
const port = process.env.PORT

app.use(json())
app.use(authRouter,lookupeRouter,postRouter)
connectDB()
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))