const User = require('../models/User');

async function getUserByEmail(email) {
    try {
        const user = await User.findOne({email});

        if(!user || user.length === 0) {
            return null;
        }

        return user;
    } catch (error) {
        console.log('[ERROR] Error getting user by name: ', error);
        throw error;
    }
}

async function registerUser(username, pass, role) {
    try {
        const newUser = new User({
            email: username, 
            password: pass, 
            role
        });
        const res = await newUser.save();
        return res;
    } catch (error) {
        console.log('[ERROR] Error registering user: ', error);
        throw error;
    }
}

const comparePass = async (user, actualPass) => {
    
    try {
        const match = await user.comparePassword(actualPass);

        if(!match){
            return false;
        }
        return true;
    } catch (error) {
        console.log('[ERROR] Error validating password: ', error);
        throw error;
    }
}

module.exports = {
    getUserByEmail,
    registerUser,
    comparePass,
}