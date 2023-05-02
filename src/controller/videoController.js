import videoModel from "../models/Video.js";

  export const home = async(req, res) => {
    const videos = await videoModel.find({}) 
    return res.render('home', { pageTitle: 'Home', videos})
  };

  export const watchVideo = (req, res) => {
    const {id} = req.params;
    res.render('watch', {pageTitle: `Watch `,}); 
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
    const video = new videoModel({
      title,
      description,
      createdAt: Date.now(),
      hashtags: hashtags.split(',').map((word) => `#${word}`),
      meta: {
        views: 0,
        rating: 0,
      }
    }) 
    console.log(video);
    await video.save()
    
    res.redirect('/')
  }

  export const deleteVideo = (req, res) => {
    res.send('Helloasdasdasdsadsadssssd!');
  };