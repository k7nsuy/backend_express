import userModel from '../models/User.js'
import bcrypt from 'bcrypt'
import fetch from 'node-fetch';

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
    const user = await userModel.findOne({username, socialOnly: false})
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

export const getGithubCallback = async (req,res) => {
    const baseUrl = 'https://github.com/login/oauth/access_token'
    const config = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: req.query.code
    }
    const params = new URLSearchParams(config).toString() 
    const returnUrl = `${baseUrl}?${params}`
    const tokenRequest = await(
        await fetch(returnUrl, {
            method: 'POST',
            headers: {
                Accept: "application/json"
            }
        })
    ).json() // fetch를 통해 returnUrl로 받은 정보(token 등)를 json 형태로 저장
    
if('access_token' in tokenRequest) {
    // access api
    const {access_token} = tokenRequest
    const apiUrl = 'https://api.github.com'
    // get user data from github
    const userData = await(await fetch(`${apiUrl}/user`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }})
    ).json()
        
    // get email data from github
    const emailData = await(await fetch(`${apiUrl}/user/emails`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }})
    ).json()
    const emailObj = emailData.find(
        (email) => email.primary === true && email.verified === true
    )
    if(!emailObj) {
        return res.redirect('/users/login')
    }

    // check if the user already exists when trying to login with github
    // if the user does not exist, create a new one
    let user = await userModel.findOne({email: emailObj.email})
    if(!user) {
        user = await userModel.create({
            name: userData.name,
            avatarUrl: userData.avatar_url,
            username: userData.login,
            email: emailObj.email,
            password: "",
            socialOnly: true,
            location: userData.location
        })
    } else {
        // After creating a new account, And then login
        req.session.loggedIn = true,
        req.session.user = user
        return res.redirect('/')
    }
    
} else {
    return res.redirect('/users/login')
    }
}

// Logout user
export const getLogoutUser = (req, res) => {
    req.session.destroy()
    res.redirect('/');
}

// Edit profile
export const getEditUser = (req, res) => {
    return res.render('User/editUser', {pageTitle: 'Edit Profile'})
}

export const postEditUser = (req, res) => {
    return res.render('User/editUser', {pageTitle: 'Edit Profile'})
}

// Withdraw the user
export const removeUser = (req, res) => {
    res.send('Welcome');
}