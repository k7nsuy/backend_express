import './db.js'
import express from 'express';
import morgan from 'morgan';
import globalRouter from '../router/globalRouter.js';
import userRouter from '../router/userRouter.js';
import videoRouter from '../router/videoRouter.js';

// express
const app = express();

// morgan
app.use(morgan('dev'));

// get body from request
app.use(express.urlencoded({extended: true}))

// view engine
app.set('view engine', 'pug'); 
app.set('views', process.cwd() + '/src/views');


// Routers
app.use('/' ,globalRouter);
app.use('/users' ,userRouter);
app.use('/videos' ,videoRouter);

// listen port
app.listen(3000, () => {
    console.log('Node server is running on port 3000 ✅');
    }
)