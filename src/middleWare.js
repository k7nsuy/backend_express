import multer from "multer"

// to use local variables(global variables)
export const localsMiddleware = (req,res,next) => {
    res.locals.siteName = 'METUBE'
    // check if the user logged in
    res.locals.loggedIn = Boolean(req.session.loggedIn)
    // get user information
    res.locals.profile = req.session.user || {}
    next()
}

export const protectedMiddleware = (req,res,next) => {
    if(req.session.loggedIn) {
        next()
    } else {
        return res.redirect('/users/login')
    }
}

export const publicMiddleware = (req,res,next) => {
    if(!req.session.loggedIn) {
        return next()
    } else {
        return res.redirect('/')
    }
}

// save uploaded files to local folder named uploads by using multer0
export const avatarMiddleware = multer({dest: 'uploads/avatars/', limits: {fileSize: 300}})
export const videoMiddleware = multer({dest: 'uploads/videos/', limits: {fileSize: 10000000}})