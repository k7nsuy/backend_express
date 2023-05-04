// to use local variables(global variables)
export const localsMiddleware = (req,res,next) => {
    res.locals.siteName = 'METUBE'
    // check if the user logged in
    res.locals.loggedIn = Boolean(req.session.loggedIn)
    // get user information
    res.locals.profile = req.session.user
    next()
}