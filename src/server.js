import express from 'express';
import morgan from 'morgan';
import globalRouter from './router/globalRouter.js';
import userRouter from './router/userRouter.js';
import videoRouter from './router/videoRouter.js';
import session from 'express-session';

// express
const app = express();

// morgan
app.use(morgan('dev'));

// get body from request
app.use(express.urlencoded({extended: true}))

// use session(to set this session before the router starts)
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
    })
)

// check the session info from client
app.use((req,res,next) => {
    req.sessionStore.all((err, session) => {
        console.log(session);
        next()
    })
})

// view engine
app.set('view engine', 'pug'); 
app.set('views', process.cwd() + '/src/views');


// Routers
app.use('/' ,globalRouter);
app.use('/users' ,userRouter);
app.use('/videos' ,videoRouter);

export default app