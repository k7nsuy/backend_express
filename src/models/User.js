import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: { type: 'string', required: true, unique: true},
    username: { type: 'string', required: true, unique: true},
    password: { type: 'string', required: true},
    name: { type: 'string', required: true},
    location: { type: 'string'}
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 5)
})

const userModel = new mongoose.model('userModel',userSchema);
export default userModel