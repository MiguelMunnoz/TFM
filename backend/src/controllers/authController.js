const {registerUser, updateUser, getUserByEmail, comparePass } = require('../services/authServices');
const { initializeWebSocket } = require('../websockets/websocket');

const jwt = require('jsonwebtoken');
const config = require('../../config');
const { request } = require('express');

const authController = {
    registerUserController: [
        async (req, res) => {
            try {
                const { username, password } = req.body;

                if (!username || !password) {
                    return res.status(400).json({ error: 'Required fields are missing (username, password)' });
                }
                
                const existingUser = await getUserByEmail(username);
                if (existingUser) {
                    return res.status(409).json({ error: 'User already exists' });
                }

                const data = await registerUser(username, password);
                res.status(201).json(data);
            } catch (error) {
                console.log('[ERROR] Error registering new user: ', error);
                res.status(500).json({ error: '[ERROR] Error registering new user. ' });
            }
        }
    ],

    updateUserController: [
        async (req, res) => {
            try {
                const { id } = req.params;
                const updatedFields = req.body;
                
                const updatedUser = await updateUser(id, updatedFields);
                return res.status(200).json(updatedUser);
            } catch (error) {
                console.log('[ERROR] Error updating user. ', error);
                res.status(500).json({ error: '[ERROR] Error updating user.' });
            }
        }
    ],

    loginUserController: [
        async (req, res) => {
            try {
                const { username, password } = req.body;
                const user = await getUserByEmail(username);

                if(!user) {
                    return res.status(401).json({ error: 'User not found' });
                }

                const isMatch = await comparePass(user, password);
                if(!isMatch) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }
                
                const token = jwt.sign(
                    {
                        userId: user._id,
                        username: user.email,
                    },
                    config.SECRET_KEY,
                    { expiresIn: '1h'}
                );

                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,               // 🔐 obligatorio con SameSite: 'None'
                    sameSite: 'None',
                    maxAge: 3 * 60 * 60 * 1000
                });

                res.json({
                    message: 'Login success',
                    userId: user._id,
                    userMail: user.email,
                    profilePic: user.profilePic,
                    jwt: token
                });
            } catch (error) {
                console.log('[ERROR] Error in login: ', error);
                res.status(500).json({ error: '[ERROR] Error in login ' });
            }
        }
    ],

    logoutController: [
        async (req, res) => {
            try {
                res.clearCookie('token');
                res.json({message: 'Logout success'});
            } catch (error) {
                console.log('[ERROR] Error logging out: ', error);
                res.status(500).json({ error: '[ERROR] Error logging out ' });
            }
        }
    ],
};

module.exports = authController;