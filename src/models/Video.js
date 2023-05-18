import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {type:String, required: true, trim: true},
    fileUrl: {type: String, required: true},
    thumbUrl: {type:String, required: true},
    description: {type:String, required: true, trim: true},
    // Date.now를 schema에서 default 값으로 설정해 주면 controller에서 
    // createdAt을 따로 명시할 필요가 없음.
    createdAt: {type: Date, required: true, default: Date.now}, 
    hashtags: [{type: String, trim: true}],
    meta: {
        views: {type: Number, default: 0, require: true },
        rating: {type: Number, default: 0, require: true },
    },
    // ref means what kind of data refers from
    owner: {type: mongoose.Schema.Types.ObjectId, required: true, ref:'userModel'}
})

videoSchema.static('formatHashtags', function(hashtags) {
    return hashtags.split(',').map(word => word.startsWith('#') ? word : `#${word}`)
})


const videoModel = new mongoose.model('videoModel', videoSchema)
export default videoModel