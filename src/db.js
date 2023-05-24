import mongoose from "mongoose";

// mongodb connection
mongoose.connect(process.env.DB_URL, {
})

const db = mongoose.connection;
const dbPort = process.env.DB_PORT

const handleOpen = () => {
    console.log(`Connected to DB on port ${dbPort} ✅`);
}

// 여러 이벤트 실행 가능
db.on('error', (err) => console.log('❌ DB error: ' + err))
// 하나의 이벤트만 실행
db.once('open', handleOpen)