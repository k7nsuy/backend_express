import videoModel from "../models/Video.js";

  // home
  export const home = async(req, res) => {
    const videos = await videoModel.find({}).sort({}) 
    return res.render('home', { pageTitle: 'Home', videos})
  };

  // watch video
  export const watchVideo = async (req, res) => {
    const {id} = req.params;
    const video = await videoModel.findById(id)
    if(!video) {
      return res.status(404).render('404_Error', {pageTitle: 'video not found',})
    }
    return  res.render('./Video/watchVideo', {pageTitle: `${video.title}`, video}); 
  };

  // edit video
  export const getEditVideo = async (req, res) => {
    const {id} = req.params;
    const video = await videoModel.findById(id)
    if(!video) {
      return res.status(404).render('404_Error', {pageTitle: 'video not found',})
    }
    return res.render('./Video/editVideo', {pageTitle: `Edit ${video.title}`, video});
  };

  export const postEditVideo = async (req,res) => {
    const {id} = req.params;
    const {title, description, hashtags} = req.body
    const video = await videoModel.exist({_id: id})
    if(!video) {
      return res.status(404).render('404_Error', {pageTitle: 'video not found',})
    }
    await videoModel.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: videoModel.formatHashtags(hashtags)
  })
    return res.redirect(`/videos/${id}`) 
  }
  
  // upload video
  export const getUploadVideo = (req, res) => {
    res.render('./Video/uploadVideo', {pageTitle: `Upload Video`})
  }

  export const postUploadVideo = async (req, res) => {
    const {title, description, hashtags} = req.body
    try {
      await videoModel.create({
        title,
        description,
        hashtags: videoModel.formatHashtags(hashtags)
      }) 
      return res.redirect('/')

    } catch (error) {
      return res.status(400).render('./Video/uploadVideo', {
        pageTitle: `Upload Video`,
        errorMessage: error._message
      })
    }
  }

// Delete a Video
  export const getDeleteVideo = async (req, res) => {
    const {id} = req.params
    await videoModel.findByIdAndDelete({_id: id})
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
      })
    }
    return res.render('./Video/searchVideo', {pageTitle: "Search", videos})
  }
