const {registerUser, getUserByEmail, comparePass } = require('../services/authServices');
const { initializeWebSocket } = require('../websockets/websocket');

const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');

const authController = {
    registerUserController: [
        async (req, res) => {
            console.log('Enviando informacion de registro...');
            try {
                const { username, password, role } = req.body;
                console.log('Datos del body: ', req.body);
                console.log('Username: ', username);
                console.log('Password: ', password);
                console.log('Role: ', role);

                if (!username || !password || !role) {
                    console.log('Returning 400 Error...');
                    return res.status(400).json({ error: 'Required fields are missing (username, password, role)' });
                }
                
                const existingUser = await getUserByEmail(username);
                if (existingUser) {
                    return res.status(409).json({ error: 'User already exists' });
                }

                const data = await registerUser(username, password, role);
                res.status(201).json(data);
            } catch (error) {
                console.log('[ERROR] Error registering new user: ', error);
                res.status(500).json({ error: '[ERROR] Error registering new user. ' });
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
                        role: user.role,
                    },
                    CONFIG.SECRET_KEY,
                    { expiresIn: '1h'}
                );

                res.cookie('token', token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'Lax',
                    maxAge: 60*60*1000,
                });

                res.json({
                    message: 'Login success',
                    role: user.role,
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
    ]
};

module.exports = authController;