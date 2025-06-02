const User = require('../models/User');
const bcrypt = require('bcrypt');


async function createUser(userData) {
    try {
        const user = new User(userData);
        const res = await user.save();
        return res;
    } catch (error) {
        console.log('[ERROR] Error creating user:', error);
        throw error;
    }
}

async function getUsers() {
    try {
        const users = await User.find({}, 'email rol');
        return users;
    } catch (error) {
        console.log('[ERROR] Error getting users:', error);
        throw error;
    }
}

async function deleteUser(id) {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        console.log(`[ERROR] Error deleting user with ID=${id}:`, error);
        throw error;
    }
}

async function updateUser(id, userData) {
    try {
        
        const user = await User.findByIdAndUpdate(
            id,
            userData,
            { 
                new: true,
                runValidators: true // Ejecuta las validaciones del esquema
            }
        );

        if (!user) {
            throw new Error('[Error] User not found.');
        }

        return user;
    } catch (error) {
        console.log('[ERROR] Error updating user:', error);
        throw error;
    }
}

async function deleteUser(id) {
    try {
        const user = await User.findByIdAndDelete(id);
        
        if (!user) {
            throw new Error('[Error] User not found.');
        }
        return user;
    } catch (error) {
        console.log('[ERROR] Error deleting user:', error);
        throw error;
    }
}

module.exports = { 
    createUser, 
    getUsers, 
    updateUser, 
    deleteUser,
};