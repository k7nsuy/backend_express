import userModel from '../models/User.js'
import bcrypt from 'bcrypt'

// Create a new user
export const getCreateUser = (req, res) => {
    res.render('User/createUser', {pageTitle: 'Join'});
};

export const postCreateUser = async (req, res) => {
    const {name,username,email,password,password2,location} = req.body
    const pageTitle = 'Create User'

    // Confirm password
    if(password !== password2) {
        return res.status(400).render('User/createUser', {
            pageTitle,
            errorMessage: 'Password does not match'
        })
    }

    // Check if user already exists, use $or method to check if they exist 
    const userNameExists = await userModel.exists({ $or: [{username}, {email}]}) 
    if(userNameExists) {
        return res.status(400).render('User/createUser', {
            pageTitle,
            errorMessage: 'User already exists'});
    }
    
    try {
        await userModel.create({
            name,
            username,
            email,
            password,
            location})
        return res.redirect('login')
    } catch (error) {
        return res.status(400).render('User/createUser', {
            pageTitle,
            errorMessage: error._message
        })
    }
}

// Login user
export const getLoginUser = (req, res) => {
    res.render('User/loginUser', {pageTitle: 'Login'});
};

export const postLoginUser = async (req, res) => {
    // check if username exists
    const {username, password} = req.body
    const pageTitle = 'Login'
    const user = await userModel.findOne({username})
    if (!user) {
        return res.status(400).render('User/loginUser', {
            pageTitle, 
            errorMessage: 'The username does not exist'
        })
    }
    // check if the password is correct
    const verifyPassword = await bcrypt.compare(password, user.password)
    if(!verifyPassword) {
        return res.status(400).render('User/loginUser', {
            pageTitle, 
            errorMessage: 'The password is not correct'
        })
    }
    // session
    req.session.loggedIn = true
    req.session.user = user
    return res.redirect('/')
}

// Logout user
export const logoutUser = (req, res) => {
    res.send('Welcome');
}

// Edit profile
export const editUser = (req, res) => {
    res.send('Welcome');
}

// Withdraw the user
export const removeUser = (req, res) => {
    res.send('Welcome');
}

// login with github 
export const getGithubLogin = (req, res) => {
    const baseUrl = 'https://github.com/login/oauth/authorize'
    const config = {
        client_id: process.env.GITHUB_CLIENT_ID,
        allow_signup: false,
        scope: 'read:user user:email'
    }
    // // to merge with cofig values by using URLSearchParams
    const params = new URLSearchParams(config).toString() 
    const returnUrl = `${baseUrl}?${params}`
    return res.redirect(returnUrl)
}

export const getGithubCallback = (req,res) => {

}
