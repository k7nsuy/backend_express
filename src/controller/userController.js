import userModel from '../models/User.js'
import bcrypt from 'bcrypt'
import fetch from 'node-fetch';
import videoModel from '../models/Video.js';
import commentModel from '../models/Comment.js';

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
            req.flash('success', 'User created successfully')
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
        req.flash('error', 'The username does not exist')
        return res.status(400).render('User/loginUser', {
            pageTitle, 
        })
    }
    // check if the password is correct
    const verifyPassword = await bcrypt.compare(password, user.password)
    if(!verifyPassword) {
        req.flash('error', 'The password is not correct')
        return res.status(400).render('User/loginUser', {
            pageTitle, 
        })
    }
    // session
    req.session.loggedIn = true
    req.session.user = user
    req.flash('success', `Welcome 😊`)
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
    req.session.user = null;
    res.locals.profile = req.session.user;
    req.session.loggedIn = false;
    req.flash('info', "See you 🙌")
    res.redirect('/');
}

// Edit profile
export const getEditUser = (req, res) => {
    return res.render('User/editUser', {pageTitle: 'Edit Profile'})
}

export const postEditUser = async (req, res) => {
    const {
        body: { name, email, username, location },
        file,
        session: {
          user: { _id, avatarUrl}
        }
      } = req;

    const pageTitle = 'Edit Profile';
    const findUsername = await userModel.findOne({username})
    const findEmail = await userModel.findOne({email})

    if (findUsername === username) {
        req.flash('error', "Username already exists")
        return res.render("User/editUser", {
          pageTitle,
        });
    } else if (findEmail === email) {
        req.flash('error', "Email already exists")
        return res.render("User/editUser", {
            pageTitle,
          });
    } else if (findUsername === username && findEmail === email) {
        req.flash('error', "Username and Email already exists")
        return res.render("User/editUser", {
            pageTitle,
          });
    } else {
        const updatedUser = await userModel.findByIdAndUpdate(_id, {
            avatarUrl: file ? file.path : avatarUrl,
            name,
            email,
            username,
            location
        },{new: true})
        req.session.user = updatedUser
        req.flash('success', 'updated user data')
    }
    return res.redirect('/users/edit')
}

// Edit password
export const getEditPassword = (req, res) => {
    if(req.session.user.socialOnly === true) {
        req.flash('error', "Can't change password")
        return res.redirect('/')
    }
    return res.render('User/editPassword', {pageTitle: 'Edit Password'})
}

export const postEditPassword = async (req, res) => {
    const {
        session: {
            user: {_id}
        },
        body: {
            oldPassword,
            newPassword,
            newPassword2
        }
    } = req
    const user = await userModel.findById(_id)
    const checkPassword = await bcrypt.compare(oldPassword, user.password)
    if(!checkPassword) {
        return res.render('User/editPassword', {pageTitle: 'Edit Password', errorMessage: 'Old Password is not correct'})  
    }

    if(newPassword !== newPassword2) {
        return res.render('User/editPassword', {pageTitle: 'Edit Password', errorMessage: 'Password does not match'})  
    } 
    user.password = newPassword
    await user.save() // to apply middleware for hash password, use save function
    req.flash('info', "Passwords updated successfully")
    return res.redirect('logout')
}

// See user profile
export const getSeeProfile = async (req, res) => {
    const {id} = req.params
    // we can search for videos using 'populate' with userModel 
    const user = await userModel.findById(id).populate('videos')
    console.log();
    if(!user) {
        return res.status(404).render('404_Error', {pageTitle: 'User not found'})
    }
    return res.render('User/seeProfile', {pageTitle: `${user.name}'s Profile`, user} )
}

// Withdraw the user
export const deleteUser = async (req, res) => {
    const {_id} = req.session.user
    req.session.loggedIn = false;
    const user = await userModel.findById(_id).populate('videos')
    await userModel.findByIdAndDelete(_id)
    for(let video of user.videos) {
        await videoModel.findByIdAndDelete(String(video._id))
    }
    req.flash('success', "user and videos deleted successfully")
    return res.redirect('/')
}

// delete comment
export const deleteComment = async (req, res) => {
    const {
        session: {user},
        body,
        params: {id}
    } = req;
    console.log(user);
    console.log(body);
    await commentModel.findByIdAndDelete(id)
    req.flash('success', "comment deleted successfully")
    return  res.redirect(`/`); 
}