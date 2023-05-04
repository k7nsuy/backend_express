import userModel from '../models/User.js'

// Create a new user
export const getCreateUser = (req, res) => {
    res.render('User/createUser', {pageTitle: 'Create User'});
};

export const postCreateUser = async (req, res) => {
    const {name,username,email,password,location} = req.body
    const pageTitle = 'Create User'

    // Check if user already exists
    const userNameExists = await userModel.exists({username})
    if(userNameExists) {
        return res.render('User/createUser', {
            pageTitle,
            errorMessage: 'User already exists'});
    }

    // Check if email already exists
    const emailExists = await userModel.exists({email})
    if(emailExists) {
        return res.render('User/createUser', {
            pageTitle,
            errorMessage: 'Email already exists'});
    }

    await userModel.create({
        name,
        username,
        email,
        password,
        location})
    return res.redirect('login')
}

// Login user
export const getLoginUser = (req, res) => {
    res.render('User/loginUser', {pageTitle: 'Login User'});
};


// Logout user
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