import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template.js'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import path from 'path'
const app = express()
const CURRENT_WORKING_DIR = process.cwd()

/*app.get('/', (req, res) => {
 res.status(200).send(Template()) 
 })*/

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', userRoutes)
app.use('/', authRoutes)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
//app.use(cors())

// const whitelist = ['http://localhost:4173', 'https://incident-management.netlify.app'];
// const corsOptions = {
//   credentials: true, // This is important.
//   origin: (origin, callback) => {
//     return callback(null, true)
//     if (whitelist.includes(origin))
//       return callback(null, true)


//     callback(new Error('whitelist:' + whitelist));
//     callback(new Error('origin:' + origin));
//     callback(new Error('Not allowed by CORS'));
//   }
// }

app.use(cors());

app.use((err, req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ "error": err.name + ": " + err.message })
  } else if (err) {
    res.status(400).json({ "error": err.name + ": " + err.message })
    console.log(err)
  }
  next();
})

export default app

