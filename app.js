require('dotenv').config()
const express = require('express')
const { authRouter,lookupeRouter } = require('./modules/allRoutes');
const connectDB = require('./DB/connection');
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(authRouter,lookupeRouter)
connectDB()
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))