import express from 'express';
import morgan from 'morgan';
import globalRouter from '../router/globalRouter.js';
import userRouter from '../router/userRouter.js';
import videoRouter from '../router/videoRouter.js';

// express
const app = express();

// morgan
app.use(morgan('dev'));

// Routers
app.use('/' ,globalRouter);
app.use('/users' ,userRouter);
app.use('/videos' ,videoRouter);

// listen port
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
    }
)