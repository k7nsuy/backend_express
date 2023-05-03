import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: 'string', required: true, unique: true},
    username: { type: 'string', required: true, unique: true},
    password: { type: 'string', required: true},
    name: { type: 'string', required: true},
    location: { type: 'string'}
});

const userModel = new mongoose.model('userModel',userSchema);
export default userModel