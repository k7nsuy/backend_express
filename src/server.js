import express from 'express';
import morgan from 'morgan';
import globalRouter from './router/globalRouter.js';
import userRouter from './router/userRouter.js';
import videoRouter from './router/videoRouter.js';
import session from 'express-session';
import { localsMiddleware } from './middleware.js';
import MongoStore from 'connect-mongo';


// express
const app = express();

// morgan
app.use(morgan('dev'));

// get body from request
app.use(express.urlencoded({extended: true}))

// use session(to set this session before the router starts)
app.use(
    session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600
    },
    store: MongoStore.create({mongoUrl: 'mongodb://localhost:27017/metube'}) // to save session to mongodb
    })
)

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

// middleware for local variables
app.use(localsMiddleware)

// Routers
app.use('/' ,globalRouter);
app.use('/users' ,userRouter);
app.use('/videos' ,videoRouter);

export default app