import videoModel from "../models/Video.js";

  export const home = async(req, res) => {
    const videos = await videoModel.find({}) 
    return res.render('home', { pageTitle: 'Home', videos})
  };

  export const watchVideo = async (req, res) => {
    const {id} = req.params;
    const video = await videoModel.findById(id)
    if(!video) {
      return res.render('404', {pageTitle: 'video not found',})
    }
    return  res.render('watch', {pageTitle: `${video.title}`, video}); 
  };

  export const getEditVideo = async (req, res) => {
    const {id} = req.params;
    const video = await videoModel.findById(id)
    if(!video) {
      return res.render('404', {pageTitle: 'video not found',})
    }
    return res.render('edit', {pageTitle: `Edit ${video.title}`, video});
  };

  export const postEditVideo = async (req,res) => {
    const {id} = req.params;
    const {title, description, hashtags} = req.body
    const video = await videoModel.exist({_id: id})
    if(!video) {
      return res.render('404', {pageTitle: 'video not found',})
    }
    // update video
    await videoModel.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: videoModel.formatHashtags(hashtags)
  })
    return res.redirect(`/videos/${id}`) 
  }
  
  export const getUploadVideo = (req, res) => {
    res.render('upload', {pageTitle: `Upload Video`})
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
      return res.render('upload', {
        pageTitle: `Upload Video`,
        errorMessage: error._message
      })
    }
  }

  export const deleteVideo = (req, res) => {
    res.send('Helloasdasdasdsadsadssssd!');
  };