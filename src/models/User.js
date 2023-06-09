import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    avatarUrl: String,
    socialOnly: { type: Boolean, default: false},
    username: { type: String, required: true, unique: true},
    password: { type: String, required: false},
    name: { type: String, required: true},
    location: { type: String},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref:'commentModel'}],
    videos: [{type: mongoose.Schema.Types.ObjectId, ref:'videoModel'}]
});

userSchema.pre('save', async function() {
    // only update with password, apply hash it
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 5)
    }
})

const userModel = new mongoose.model('userModel',userSchema);
export default userModel