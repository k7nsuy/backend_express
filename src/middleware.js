import multer from "multer"
import multerS3 from "multer-s3"
import { S3Client } from "@aws-sdk/client-s3"

const s3 = new S3Client({
    region: "ap-northeast-2",
     credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
     }
})

const isProduction = process.env.NODE_ENV === 'production'

const S3ImageUploader = multerS3({
     s3: s3,
     bucket: "s3-metube/images",
     acl: 'public-read',
})

const S3VideoUploader = multerS3({
    s3: s3,
     bucket: "s3-metube/videos",
     acl: 'public-read',
})

// to use local variables(global variables)
export const localsMiddleware = (req,res,next) => {
    res.locals.siteName = 'METUBE'
    // check if the user logged in
    res.locals.loggedIn = Boolean(req.session.loggedIn)
    // get user information
    res.locals.profile = req.session.user || {}
    res.locals.isProduction = isProduction
    next()
}

export const protectedMiddleware = (req,res,next) => {
    if(req.session.loggedIn) {
        next()
    } else {
        req.flash('error', "Not authorized")
        return res.redirect('/users/login')
    }
}

export const publicMiddleware = (req,res,next) => {
    if(!req.session.loggedIn) {
        return next()
    } else {
        req.flash('error', 'Not authorized')
        return res.redirect('/')
    }
}

// save uploaded files to local folder named uploads by using multer0
export const avatarMiddleware = multer({
     dest: 'uploads/avatars/',
     limits: {fileSize: 300000},
     storage: isProduction ? S3ImageUploader : undefined
})
export const videoMiddleware = multer({
     dest: 'uploads/videos/',
     limits: {fileSize: 10000000},
     storage: isProduction ? S3VideoUploader : undefined
})
