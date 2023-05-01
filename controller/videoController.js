const videos = [{
  title: "title",
  rating: 1,
  comments: "comments",
  createdAt:  "created",
  views: 1,
  id: 1
},
{
  title: "title2",
  rating: 2,
  comments: "comments",
  createdAt:  "created",
  views: 12,
  id: 2
},
{
  title: "title",
  rating: 3,
  comments: "comments",
  createdAt:  "created",
  views: 13,
  id: 3

}]

export const trendingVideo = (req, res) => {
    res.render('home', {pageTitle: 'Home', videos})
  };

  export const watchVideo = (req, res) => {
    const {id} = req.params;
    const video = videos[id - 1]
    res.render('watch', {pageTitle: `Watch ${video.title}`, video}); 
  };

  export const uploadVideo = (req, res) => {
    res.send('Helloasdasdasdsadsadssssd!');
  };

  export const getEditVideo = (req, res) => {
    const {id} = req.params;
    const video = videos[id - 1]
    res.render('edit', {pageTitle: `Edit ${video.title}`, video});
  };

  export const postEditVideo = (req,res) => {
    const {id} = req.params;
    let {title} = req.body;
    videos[id - 1].title = title
    res.redirect(`/videos/${id}`)
  }
  
  export const getUploadVideo = (req, res) => {
    res.render('upload', {pageTitle: `Upload Video`})
  }

  export const postUploadVideo = (req, res) => {
    
  }


  export const deleteVideo = (req, res) => {
    res.send('Helloasdasdasdsadsadssssd!');
  };