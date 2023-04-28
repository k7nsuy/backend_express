  export const home = (req, res) => {
    res.render('home',{ pageTitle: 'Home', potato: 'potato'});
  };

  export const search = (req, res) => {
    res.send('Hello Worlsssssd!');
  };
