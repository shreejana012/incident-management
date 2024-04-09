import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template.js'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'



const app = express()
const CURRENT_WORKING_DIR = process.cwd()


// app.use(express.static("dist"))


// app.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://incident-management.netlify.app"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Private-Network", true);
//   res.setHeader("Access-Control-Max-Age", 7200);

//   if (err.name === 'UnauthorizedError') {
//     res.status(401).json({ "error": err.name + ": " + err.message })
//   } else if (err) {
//     res.status(400).json({ "error": err.name + ": " + err.message })
//     console.log(err)
//   }

//   next();
// });


export default app

