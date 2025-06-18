/*const SECRET_KEY = 'la-clave-ultra-super-mega-secreta';

const config = {
  PORT: 3000,
  EMAIL_USER: 'miguelmjimenez98@gmail.com', // Reemplaza con tu correo Gmail
  EMAIL_PASS: 'ddlo rkro bfab bgcp', // Reemplaza con tu contraseña de aplicación
};*/

// Configuración de Nodemailer
const createTransporter = () => {
  const nodemailer = require('nodemailer');
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASS,
    },
  });
};

module.exports = {
    //SECRET_KEY,
    //port: process.env.PORT || 3000,
    wsOptions: {
        clientTracking: true
    },
    config,
    createTransporter,
}