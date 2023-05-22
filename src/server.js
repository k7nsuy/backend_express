import express from 'express';
import morgan from 'morgan';
import flash from 'express-flash';
import globalRouter from './router/globalRouter.js';
import userRouter from './router/userRouter.js';
import videoRouter from './router/videoRouter.js';
import session from 'express-session';
import { localsMiddleware } from './middleware.js';
import MongoStore from 'connect-mongo';
import apiRouter from './router/apiRouter.js';

// express
const app = express();

// morgan
app.use(morgan('dev'));

// get body from request
app.use(express.urlencoded({extended: true}))

// get body.text from request
app.use(express.json())

// use session(to set this session before the router starts)
app.use(
    session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2000000
    },
    store: MongoStore.create({mongoUrl: 'mongodb://127.0.0.1:27017/metube'}) // to save session to mongodb
    })
)

// 
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
})

// Check the session info from client
// app.use((req,res,next) => {
//     res.locals.session = req.session.loggedIn
//     req.sessionStore.all((err, session) => {
//         console.log(session);
//         next()
//     })
// })

// view engine
app.set('view engine', 'pug'); 
app.set('views', process.cwd() + '/src/views');

// express-flash
app.use(flash())

// middleware for local variables
app.use(localsMiddleware)

// create a router for upload and assets
app.use('/uploads', express.static('uploads'))
app.use('/assets', express.static('assets'))

// Routers
app.use('/' ,globalRouter);
app.use('/users' ,userRouter);
app.use('/videos' ,videoRouter);
app.use('/api', apiRouter);

export default app