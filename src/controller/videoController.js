import videoModel from "../models/Video.js";

  export const home = async(req, res) => {
    const videos = await videoModel.find({}) 
    return res.render('home', { pageTitle: 'Home', videos})
  };

  export const watchVideo = async (req, res) => {
    const {id} = req.params;
    const video = await videoModel.findById(id)
    console.log(video);
    return  res.render('watch', {pageTitle: `${video.title}`, video}); 
  };

  export const getEditVideo = (req, res) => {
    const {id} = req.params;
    res.render('edit', {pageTitle: `Edit `});
  };

  export const postEditVideo = (req,res) => {
    const {id} = req.params;
    res.redirect(`/videos/${id}`)
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
        hashtags: hashtags.split(',').map((word) => `#${word}`),
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