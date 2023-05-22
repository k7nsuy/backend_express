import userModel from "../models/User.js";
import videoModel from "../models/Video.js";
import commentModel from "../models/Comment.js";

  // home
  export const home = async(req, res) => {
    const videos = await videoModel.find({})
        .sort({ createdAt: 'desc'})
        .populate('owner')
    return res.render('home', { pageTitle: 'Home', videos})
  };

  // watch video
  export const watchVideo = async (req, res) => {
    const {id} = req.params;
    // 'populate' helps to get user's profile
    const video = await videoModel.findById(id).populate('owner').populate('comments')
    if(!video) {
      return res.status(404).render('404_Error', {pageTitle: 'video not found',})
    }
    video.meta.views = video.meta.views + 1
    await video.save()
    return  res.render('./Video/watchVideo', {pageTitle: `${video.title}`, video}); 
  };

  // edit video
  export const getEditVideo = async (req, res) => {
    const {_id} = req.session.user
    const {id} = req.params;
    const video = await videoModel.findById(id)
    if(!video) {
      return res.status(404).render('404_Error', {pageTitle: 'video not found',})
    }
    if(String(video.owner) !== _id) {
      return res.status(403).redirect('/')
    }
    return res.render('./Video/editVideo', {pageTitle: `Edit ${video.title}`, video});
  };

  export const postEditVideo = async (req,res) => {
    const {id} = req.params;
    const {_id} = req.session.user
    const {title, description, hashtags} = req.body
    const video = await videoModel.findById(id)
    if(!video) {
      return res.status(404).render('404_Error', {pageTitle: 'video not found',})
    }
    if(String(video.owner) !== String(_id)) {
      return res.status(403).redirect('/')
    }
    await videoModel.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: videoModel.formatHashtags(hashtags)
  })
    req.flash('success', 'Edit video successfully')
    return res.redirect(`/videos/${id}`) 
  }
  
  // upload video
  export const getUploadVideo = (req, res) => {
    res.render('Video/uploadVideo', {pageTitle: `Upload Video`})
  }

  export const postUploadVideo = async (req, res) => {
    const {user: {_id}} = req.session
    const {title, description, hashtags} = req.body
    const {video, thumb} = req.files
    try {
      const newVideo = await videoModel.create({
        title,
        fileUrl: video[0].path,
        thumbUrl: thumb[0].path.replace(/[\\]/g, "/"),
        description,
        hashtags: videoModel.formatHashtags(hashtags),
        owner: _id
      }) 
      const user = await userModel.findById(_id)
      user.videos.push(newVideo._id)
      user.save()
      req.flash('success', 'uploaded video successfully')
      return res.redirect('/')

    } catch (error) {
      return res.status(400).render('Video/uploadVideo', {
        pageTitle: `Upload Video`,
        errorMessage: error._message
      })
    }
  }

  export const recordingVideo = (req,res) => {
    res.render('Video/recordingVideo', {pageTitle: `Recording Video`})
  }

// Delete a Video
  export const getDeleteVideo = async (req, res) => {
    const {_id} = req.session.user
    const {id} = req.params
    const video = await videoModel.findById(id)
    if(!video) {
      return res.status(404).render('404_Error', {pageTitle: 'video not found',})
    }
    if(String(video.owner) !== _id) {
      req.flash('error', "Not authorized")
      return res.status(403).redirect('/')
    }
    await videoModel.findByIdAndDelete(id)
    req.flash('success', "video deleted")
    return res.redirect('/')
  };

// Search Videos
  export const searchVideo = async (req, res) => {
    const {keyword} = req.query
    let videos = []
    if(keyword) {
      videos = await videoModel.find({
        title: {
          // search videos by using regular expression, i => no matter what the lowercase or the upper case
          $regex: new RegExp(`${keyword}`, 'i')
        }
      }).populate('owner')
    }
    return res.render('./Video/searchVideo', {pageTitle: "Search", videos})
  }

  export const registerView = async (req, res) => {
    const {id} = req.params
    const videos = await videoModel.findById(id)
    if(!videos) {
      return res.sendStatus(404);
    }
    videos.meta.views = videos.meta.views + 1
    await videos.save()
    return res.sendStatus(200)
  }

  // create comment
  export const createComment = async (req, res) => {
    const {
      session: {user},
      body: {text},
      params: {id}
    } = req;
    const video = await videoModel.findById(id)

    if(!video) {
      return res.sendStatus(404)
    }

    const comment = await commentModel.create({
      text,
      owner: user._id,
      video: id
    })

    // save comment to video
    video.comments.push(comment._id)
    video.save()
    return res.sendStatus(201)
  }
