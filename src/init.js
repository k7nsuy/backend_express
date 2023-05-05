import 'dotenv/config.js'
import './db.js'
import './models/Video.js'
import './models/User.js'
import app from './server.js';

const port = 3000

// listen port
app.listen(port, () => {
    console.log('Node server is running on port 3000 ✅');
    }
)