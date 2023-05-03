import User from '../models/User.js'

export const getCreateUser = (req, res) => {
    res.render('User/createUser', {pageTitle: 'Create User'});
};

export const postCreateUser = async (req, res) => {
    const {name,username,email,password,location} = req.body
    await User.create({
        name,
        username,
        email,
        password,
        location})
    return res.redirect('User/loginUser')
}

export const getLoginUser = (req, res) => {
    res.render('User/loginUser', {pageTitle: 'Login User'});
};

export const logoutUser = (req, res) => {
    res.send('Welcome');
}

export const editUser = (req, res) => {
    res.send('Welcome');
}

export const removeUser = (req, res) => {
    res.send('Welcome');
}

export const seeUser = (req, res) => {
    res.send('Welcome');
}