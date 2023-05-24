import 'dotenv/config.js'
import './db.js'
import './models/Video.js'
import './models/User.js'
import './models/Comment.js'
import app from './server.js';

const port = process.env.NODE_PORT

// listen port
app.listen(port, () => {
    console.log(`Node server is running on port ${port} ✅`);
    }
)