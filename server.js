import config from './config/config.js'
import app from './server/express.js'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url';
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

import userRoutes from './server/routes/user.routes.js'
import authRoutes from './server/routes/auth.routes.js'


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {
    //useNewUrlParser: true,
    //useCreateIndex: true, 
    //useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to the database!");
    })

mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.mongoUri}`)
})

//app.use(cors);
// app.get("/", (req, res) => {
// res.json({ message: "Welcome to User application." });
// });

app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    }
    console.info('Server started on port %s.', config.port)
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', userRoutes)
app.use('/', authRoutes)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())

app.use(express.static("client/dist"))


app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "client/dist/index.html")
    );
});


